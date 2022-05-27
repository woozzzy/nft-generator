// Paths
const basePath = process.cwd();
const outPath = `${basePath}/output`

// Imports
import { NFTStorage, File } from 'nft.storage'
import mime from 'mime'
import fs from 'fs'
import path from 'path'

// Global Variables
const NFT_STORAGE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDljNWU5ZDg1NTA2ZGQyNmNkZGY4RkZEMERERGQ0Njk0MTZlRGM3ZjkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MzU1Mzg0MTk4OCwibmFtZSI6InBvbHlnb25ORlQifQ.NIXxlJtqh5okJK62pc8xkrkFRKfPV3M2EwdrtYRUrkc"
let receipt = {
    tokens: [],
}

export async function storeNFT(imagePath, metadataPath) {
    const image = await imgFileFromPath(imagePath)
    const rawMetadata = await fs.promises.readFile(metadataPath)
    const metadata = JSON.parse(rawMetadata)
    const client = new NFTStorage({ token: NFT_STORAGE_KEY })

    receipt.tokens.push(await client.store({
        image,
        ... metadata,
    }))
}

async function imgFileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)

    return new File([content], path.basename(filePath), { type })
}

export async function storeAllNFT() {
    const rawConfig = await fs.promises.readFile(`${outPath}/config.json`)
    const config = JSON.parse(rawConfig)

    for (let i = 0; i < config.generatedEditions; i++) {
        let imagePath = `${outPath}/images/${i + config.startingEdition}.png`
        let metadataPath = `${outPath}/json/${i + config.startingEdition}.json`
        config.debug ? console.log(`Uploading ${i+config.startingEdition}.png and ${i+config.startingEdition}.json to NFT.Storage`) : null
        await storeNFT(imagePath, metadataPath)
    }

    fs.writeFileSync(`${outPath}/receipt.json`, JSON.stringify(receipt, null, 2))
}