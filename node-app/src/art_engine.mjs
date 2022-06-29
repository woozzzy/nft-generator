// Paths
const basePath = process.cwd();
const outPath = `${basePath}/output`

//Imports
import fs from 'fs'
import pkg from 'canvas'
const { createCanvas, loadImage } = pkg
import { config } from './config.mjs'

// Import Configuration Data
const startingEdition = config.startingEdition
const editionCount = config.editionCount
const generateAll = config.generateAll
const height = config.height
const width = config.width
const layerOrder = config.layerOrder.map((layer) => layer.name)
const debug = config.debug
const saveConfig = config.saveConfig

// Global Variables
const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')
let uuidSet = new Set()
let traitMap = new Map()
let edition = 0
let maxEditions = 1

// Setup Functions
function buildTraitMap() {
    let layers = fs.readdirSync(`${basePath}/layers`)
        .filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
        .map((layer, index) => {
            let totalWeight = 0
            let traitList = fs.readdirSync(`${basePath}/layers/${layer}`)
            .filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
            .map((trait, index) => {
                let splitName = trait.split('#')
                totalWeight += parseInt(splitName[1].split('.')[0])
                return {
                    index: index,
                    name: splitName[0],
                    layer: layer,
                    weight: splitName[1].split('.')[0],
                    filename: trait,
                    path:  `${basePath}/layers/${layer}/${trait}`,
                }
            })
            maxEditions *= traitList.length
            return {
                name: layer,
                totalWeight: totalWeight,
                traitList: traitList,
                path:  `${basePath}/layers/${layer}`,
            }
        })
    layers.forEach(layer => {
        traitMap.set(layer.name, layer)
    });    
}

export async function setupDir() {
    if (fs.existsSync(outPath)) {
        fs.rmSync(outPath, {recursive: true})
    }
    fs.mkdirSync(outPath)
    fs.mkdirSync(`${outPath}/json`)
    fs.mkdirSync(`${outPath}/images`)
}

function chooseTrait(layer) {
    let layerObj = traitMap.get(layer)
    let traitList = layerObj.traitList
    let totalWeight = layerObj.totalWeight
    let rand = Math.floor(Math.random() * totalWeight)
    
    for (let i = 0; i < traitList.length; i++) {
        if (rand < traitList[i].weight) {
            return traitList[i]
        }
        rand -= traitList[i].weight
    }
}

function buildUUID() {
    let uuid = ''
    let rarity = 1
    let traitList = []
    let attributes = []

    layerOrder.forEach((layer) => {
        let trait = chooseTrait(layer)
        rarity *= trait.weight / traitMap.get(layer).totalWeight
        uuid += trait.index
        traitList.push(trait)
        attributes.push({
            trait_type: trait.layer,
            value: trait.name,
        })
    })
    let ret = {
        uuid: uuid,
        edition: edition,
        rarity: rarity,
        traitList: traitList,
        attributes: attributes,
    }
    if (!uuidSet.has(ret)) {
        uuidSet.add(ret)
        edition++
    }

    return ret
}

// Image Generation Functions
function drawAllUUID() {
    let layerList = []

    for (let layer of layerOrder) {
        layerList.push(traitMap.get(layer))
    }

    cartesian(layerList).forEach(async (uue) => {
        let uuid = ''
        let rarity = 1
        let traitList = []
        let attributes = []

        uue.forEach((trait) => {
            rarity *= trait.weight / traitMap.get(trait.layer).totalWeight
            uuid += trait.index
            traitList.push(trait)
            attributes.push({
                trait_type: trait.layer,
                value: trait.name,
            })
        })

        let tuuid = {
            uuid: uuid,
            edition: edition,
            rarity: rarity,
            traitList: traitList,
            attributes: attributes,
        }
        edition++
        await drawUUID(tuuid)
        saveImage(tuuid)
        createMetadata(tuuid)
    })
}

function cartesian(arrs) {
    let cartesianList = []
    let max = arrs.length - 1

    function helper(arr, i) {
        for (let j = 0, l = arrs[i].traitList.length; j < l; j++) {
            let a = arr.slice(0)
            a.push(arrs[i].traitList[j])
            if (i == max) {
                cartesianList.push(a)
            } else {
                helper(a, i+1)
            }
        }
    }

    helper([], 0)
    return cartesianList
}

async function drawUUID(uuid) {
    uuid.traitList.forEach(async (trait) => {
        let img = await loadImage(`${trait.path}`)
        context.drawImage(img, 0, 0, width, height)
    })
    
}

function saveImage(uuid) {
    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync(`${outPath}/images/${uuid.edition + startingEdition}.png`, buffer)
    debug ? console.log(`Created ${uuid.edition + startingEdition}.png`) : null
}

// Metadata Generation Functions
function createMetadata(uuid) {
    let metadata = {
        name: `${config.nftName}#${uuid.edition}`,
        description: `${config.nftDescription}`,
        // image: `${config.baseURI}/${uuid.filename}.png`,
        // image: new File(
        //     [fs.readFileSync(`${outPath}/images/${uuid.edition}.png`)],
        //     `${uuid.edition}.png`,
        //     { type: 'image/png' }
        // ),
        edition: uuid.edition + startingEdition,
        uuid: parseInt(uuid.uuid), 
        date: Date.now(),
        attributes: uuid.attributes,
    }
    fs.writeFileSync(`${outPath}/json/${uuid.edition + startingEdition}.json`, JSON.stringify(metadata, null, 2))
    debug ? console.log(`Created ${uuid.edition + startingEdition}.json`) : null

}

async function contractMetadata() {
    let metadata = {
        name: config.collectionName,
        description: config.collectionDescription,
        image: config.collectionImage,
        external_link: config.collectionLink,
        seller_fee_basis_points: config.fee, 
        fee_recipient: config.feeRecipient
      }
      fs.writeFileSync(`${outPath}/json/collectionMetadata.json`, JSON.stringify(metadata, null, 2))
      debug ? console.log(`Created collectionMetadata.json`) : null
}

function saveConfiguration() {
    fs.writeFileSync(`${outPath}/config.json`, JSON.stringify({...config, generatedEditions: edition}, null, 2))
}

export async function generate() {
    buildTraitMap()
    if (generateAll || editionCount >= maxEditions) { 
        debug ? console.log("Generating all ") : null
        drawAllUUID()
    } else {
        while (edition < (editionCount > maxEditions ? maxEditions : editionCount)) {
            let uuid = buildUUID(edition)
            await drawUUID(uuid)
            saveImage(uuid)
            createMetadata(uuid)
        } 
        if (editionCount > maxEditions) {
            debug ? console.log(`You need more layers/variations to generate ${config.editionCount} editions.`) : null
        }
    }

    await contractMetadata()
    saveConfig ? saveConfiguration() : null
}