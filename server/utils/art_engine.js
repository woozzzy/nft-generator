//Imports
import { promises as fs } from "fs";
import pkg from "canvas";
import crypto from 'crypto';
import path from 'path'
import { NFTStorage, File } from 'nft.storage'
import mime from 'mime'

const { createCanvas, loadImage } = pkg;

// Paths
const basePath = "./public";
let outPath = basePath + "/output";

export const setupDir = async (proj) => {
    try {
        outPath = `${basePath}/${proj}/output`
        await fs.access(outPath);
        await fs.rm(outPath, { recursive: true, force: true });
    } catch (error) {

    } finally {
        await fs.mkdir(outPath);
        await fs.mkdir(`${outPath}/json`);
        await fs.mkdir(`${outPath}/images`);
    }
};

export const buildTraitMap = async (layerList) => {
    let maxEditions = 1;

    return {
        traitMap: new Map(layerList.map((layer) => {
            maxEditions *= layer.traitList.length;
            return [layer.name, layer]
        })), maxEditions,
    };
};

const chooseTrait = (layer, traitMap) => {
    let layerObj = traitMap.get(layer)
    let traitList = layerObj.traitList
    let totalWeight = layerObj.totalWeight
    let rand = Math.floor(Math.random() * totalWeight)

    for (let i = 0; i < traitList.length; i++) {
        if (rand < traitList[i].weight) {
            return traitList[i];
        }
        rand -= traitList[i].weight;
    }
}

const buildUUID = (traitMap, edition, layerList) => {
    let uuid = edition.toString();
    let rarity = 1
    let traitList = []
    let attributes = []

    layerList.forEach((layer) => {
        let trait = chooseTrait(layer.name, traitMap);
        rarity *= trait.weight / layer.totalWeight;
        uuid = uuid.concat("-", trait.name);
        traitList.push(trait);
        attributes.push({
            trait_type: layer.name,
            value: trait.name,
        });
    })

    uuid = crypto.createHash('md5').update(uuid).digest('hex');

    let ret = {
        uuid: uuid,
        edition: edition,
        rarity: rarity,
        traitList: traitList,
        attributes: attributes,
    }
    return ret
}

const drawUUID = async (uuid, context, config) => {
    uuid.traitList.forEach(async (trait) => {
        const match = trait.path.match(/\/public(?<=(\/public)).*/)
        let img = await loadImage('.' + decodeURI(match[0]));
        context.drawImage(img, 0, 0, config.width, config.height)
    })
}

const saveImage = async (uuid, canvas, config) => {
    const buffer = canvas.toBuffer('image/png');
    const path = `${outPath}/images/${uuid.edition + config.startingEdition}-${Date.now()}.png`;
    await fs.writeFile(path, buffer);
    config.debug ? console.log(`Created ${path}`) : null;
    return path;
}

const createMetadata = async (uuid, config) => {
    let metadata = {
        name: `${config.nftName}#${uuid.edition}`,
        description: `${config.nftDescription}`,
        edition: uuid.edition + config.startingEdition,
        uuid: uuid.uuid,
        date: Date.now(),
        attributes: uuid.attributes,
    };
    const path = `${outPath}/json/${uuid.edition + config.startingEdition}-${Date.now()}.json`
    await fs.writeFile(path, JSON.stringify(metadata, null, 2));
    config.debug ? console.log(`Created ${path}`) : null;
    return path;
}

const contractMetadata = async (config) => {
    let metadata = {
        name: config.nftName,
        description: config.nftDescription,
        image: '',
        external_link: '',
        seller_fee_basis_points: '',
        fee_recipient: ''
    };
    const path = `${outPath}/collectionMetadata.json`
    await fs.writeFile(path, JSON.stringify(metadata, null, 2));
    config.debug ? console.log(`Created collectionMetadata.json`) : null;
    return path;
}

export const generate = async (config, getTraitMap) => {
    const { traitMap, maxEditions } = getTraitMap;
    const canvas = await createCanvas(config.width, config.height);
    const context = canvas.getContext('2d');
    let edition = 0;
    let uuidSet = new Set();
    let images = [];
    let metadata = [];
    const sortedLayerList = config.layerList.sort((a, b) => (b.order - a.order))

    while (edition < (config.editionCount > maxEditions ? maxEditions : config.editionCount)) {
        const uuid = buildUUID(traitMap, edition, sortedLayerList);
        if (!uuidSet.has(uuid)) {
            uuidSet.add(uuid);
            edition++;
            await drawUUID(uuid, context, config);
            images.push(await saveImage(uuid, canvas, config));
            metadata.push(await createMetadata(uuid, config));
        }
    }
    if (config.editionCount > maxEditions) {
        config.debug ? console.log(`You need more layers/variations to generate ${config.editionCount} editions.`) : null;
    }

    const contract = await contractMetadata(config);

    return {
        images,
        metadata,
        contract,
    }
}

const fileFromPath = async (filePath) => {
    const content = await fs.readFile(filePath)
    const type = mime.getType(filePath)

    return new File([content], path.basename(filePath), { type })
}

export const storeNFT = async (proj, key) => {
    const outpath = `./public/${proj}/output`
    const client = new NFTStorage({ token: key })
    const images = (await fs.readdir(`${outpath}/images`)).filter(item => !(/(^|\/)\.[^\/\.]/g).test(item)).sort((a, b) => a.split('-')[0] - b.split('-')[0])
    const jsons = (await fs.readdir(`${outpath}/json`)).filter(item => !(/(^|\/)\.[^\/\.]/g).test(item)).sort((a, b) => a.split('-')[0] - b.split('-')[0])

    let imageList = []
    let metadataList = []

    for (const image of images) {
        imageList.push(await fileFromPath(`${outpath}/images/${image}`))
    }

    const imgBaseUri = await client.storeDirectory(imageList)

    for (const [i, json] of jsons.entries()) {
        const rawMetadata = await fs.readFile(`${outpath}/json/${json}`)
        metadataList.push(new File(
            [JSON.stringify({
                image: `ipfs://${imgBaseUri}/${images[i]}`,
                ...JSON.parse(rawMetadata)
            }, null, 2)], `${json}`
        ))

    }
    metadataList.push(fileFromPath(`${outpath}/collectionMetadata.json`))

    const metadataBaseUri = await client.storeDirectory(metadataList)
    return jsons.concat(`collectionMetadata.json`).map((json) => `ipfs://${metadataBaseUri}/${json}`)
}