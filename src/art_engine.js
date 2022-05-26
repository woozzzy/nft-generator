// Paths
const basePath = process.cwd();
const outDir = `${basePath}/output`

//Imports
const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
const { config } = require(`${basePath}/src/config.js`)

// Import Configuration Data
const editionCount = config.editionCount
const generateAll = config.generateAll
const height = config.height
const width = config.width
const layerOrder = config.layerOrder.map((layer) => layer.name)

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

function setupDir() {
    if (fs.existsSync(outDir)) {
        fs.rmSync(outDir, {recursive: true})
    }
    fs.mkdirSync(outDir)
    fs.mkdirSync(`${outDir}/json`)
    fs.mkdirSync(`${outDir}/images`)
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

    layerOrder.forEach((layer) => {
        let trait = chooseTrait(layer)
        rarity *= trait.weight / traitMap.get(layer).totalWeight
        uuid += trait.index
        traitList.push(trait)
    })
    let ret = {
        uuid: uuid,
        edition: edition,
        rarity: rarity,
        traitList: traitList,
    }
    if (!uuidSet.has(ret)) {
        uuidSet.add(ret)
        edition++
    }

    return ret
}

// Image Generation Functions
function drawAllUUID() {
    layerList = []

    for (let layer of layerOrder) {
        layerList.push(traitMap.get(layer))
    }

    cartesian(layerList).forEach(async (uue) => {
        let uuid = ''
        let rarity = 1
        let traitList = []

        uue.forEach((trait) => {
            rarity *= trait.weight / traitMap.get(trait.layer).totalWeight
            uuid += trait.index
            traitList.push(trait)
        })

        let ret = {
            uuid: uuid,
            edition: edition,
            rarity: rarity,
            traitList: traitList,
        }
        edition++
        await drawUUID(ret)
        saveImage(ret)
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
    fs.writeFileSync(`${outDir}/images/${uuid.edition}_test_${uuid.uuid}.png`, buffer)
    console.log(`Created ${uuid.edition}_test_${uuid.uuid}.png`)
}

// Metadata Generation Functions
function createMetadata() {
    
}

async function generate() {
    buildTraitMap()
    if (generateAll || editionCount >= maxEditions) { 
        console.log("Generating all ")
        drawAllUUID()
    } else {
        while (edition < (editionCount > maxEditions ? maxEditions : editionCount)) {
            uuid = buildUUID(edition)
            await drawUUID(uuid)
            saveImage(uuid)
        } 
    }

    if (!generateAll && edition <= config.editionCount - 1) {
        console.log(`You need more layers/variations to generate ${config.editionCount} editions.`)
    }
}

module.exports = { setupDir, generate, }