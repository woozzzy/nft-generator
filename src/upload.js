// Paths
const basePath = process.cwd();
const outPath = `${basePath}/output`

// Imports
import { NFTStorage, File } from 'nft.storage'
import mime from 'mime'
import fs from 'fs'
import path from 'path'
const NFT_STORAGE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDljNWU5ZDg1NTA2ZGQyNmNkZGY4RkZEMERERGQ0Njk0MTZlRGM3ZjkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MzU1Mzg0MTk4OCwibmFtZSI6InBvbHlnb25ORlQifQ.NIXxlJtqh5okJK62pc8xkrkFRKfPV3M2EwdrtYRUrkc"

export async function storeNFT(imagePath, metadataPath) {
    const image = await imgFileFromPath(imagePath)
    const rawMetadata = await fs.promises.readFile(metadataPath)
    const metadata = JSON.parse(rawMetadata)
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    return nftstorage.store({
        image,
        ... metadata,
    })
}

async function imgFileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    return new File([content], path.basename(filePath), { type })
}

export async function storeAllNFT() {
    const rawConfig = await fs.promises.readFile(metadataPath)
    const config = JSON.parse(rawConfig)
    for (let i = 0; i < config.generatedEditions; i++) {
        const element = array[i];
        
    }
}