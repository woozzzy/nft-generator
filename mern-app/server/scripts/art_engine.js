//Imports
import { promises as fs } from "fs";
import pkg from "canvas";
const { createCanvas, loadImage } = pkg;

// Paths
const basePath = "./public";
const outPath = basePath + "/output";


// let uuidSet = new Set();
// let edition = 0;
// let maxEditions = 1;

export const setupDir = async () => {
    try {
        await fs.access(outPath);
        await fs.rm(outPath, { recursive: true, force: true });
    } finally {
        await fs.mkdir(outPath);
        await fs.mkdir(`${outPath}/json`);
        await fs.mkdir(`${outPath}/images`);
    }
};

export const buildTraitMap = async () => {
    let maxEditions = 1;
    const layers = await fs.readdir(`${basePath}/layers`);
    const result = await Promise.all(layers
        .filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
        .map(async (layer, index) => {
            let totalWeight = 0
            const traits = await fs.readdir(`${basePath}/layers/${layer}`)
            let traitList = traits
                .filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
                .map((trait, index) => {
                    let splitName = trait.split('_')
                    totalWeight += parseInt(splitName[1].split('.')[0])
                    return {
                        index: index,
                        name: splitName[0],
                        layer: layer,
                        weight: splitName[1].split('.')[0],
                        filename: trait,
                        path: `${basePath}/layers/${layer}/${trait}`,
                    }
                })
            maxEditions *= traitList.length
            return [layer, {
                name: layer,
                totalWeight: totalWeight,
                traitList: traitList,
                path: `${basePath}/layers/${layer}`,
            }]
        }))
    return { traitMap: new Map(result), maxEditions, };
};

const chooseTrait = (layer, traitMap) => {
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

const buildUUID = (traitMap, edition, layerOrder) => {
    let uuid = ''
    let rarity = 1
    let traitList = []
    let attributes = []

    layerOrder.forEach((layer) => {
        let trait = chooseTrait(layer, traitMap)
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

    return ret
}

const drawUUID = async (uuid, context, config) => {
    uuid.traitList.forEach(async (trait) => {
        let img = await loadImage(`${trait.path}`)
        context.drawImage(img, 0, 0, config.width, config.height)
    })
}

const saveImage = async (uuid, canvas, config) => {
    const buffer = canvas.toBuffer('image/png');
    const path = `${outPath}/images/${uuid.edition + config.startingEdition}.png`;
    await fs.writeFile(path, buffer);
    config.debug ? console.log(`Created ${uuid.edition + config.startingEdition}.png`) : null;
    return path;
}

const createMetadata = async (uuid, config) => {
    let metadata = {
        name: `${config.nftName}#${uuid.edition}`,
        description: `${config.nftDescription}`,
        edition: uuid.edition + config.startingEdition,
        uuid: parseInt(uuid.uuid),
        date: Date.now(),
        attributes: uuid.attributes,
    };
    const path = `${outPath}/json/${uuid.edition + config.startingEdition}.json`
    await fs.writeFile(path, JSON.stringify(metadata, null, 2));
    config.debug ? console.log(`Created ${uuid.edition + config.startingEdition}.json`) : null;
    return path;
}

const contractMetadata = async (config) => {
    let metadata = {
        name: config.collectionName,
        description: config.collectionDescription,
        image: config.collectionImage,
        external_link: config.collectionLink,
        seller_fee_basis_points: config.fee,
        fee_recipient: config.feeRecipient
    };
    const path = `${outPath}/json/collectionMetadata.json`
    await fs.writeFile(path, JSON.stringify(metadata, null, 2));
    config.debug ? console.log(`Created collectionMetadata.json`) : null;
    return path;
}

const saveConfiguration = async (edition) => {
    await fs.writeFile(`${outPath}/config.json`, JSON.stringify({ ...config, generatedEditions: edition }, null, 2))
}

export const generate = async (config, getTraitMap) => {
    const { traitMap, maxEditions } = getTraitMap;
    const canvas = createCanvas(config.width, config.height);
    const context = canvas.getContext('2d');
    let edition = 0;
    let uuidSet = new Set();
    let images = [];
    let metadata = [];

    while (edition < (config.editionCount > maxEditions ? maxEditions : config.editionCount)) {
        const uuid = buildUUID(traitMap, edition, config.layerOrder);
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
    config.saveConfig ? await saveConfiguration(edition) : null

    return {
        images,
        metadata,
        contract,
    }
}



