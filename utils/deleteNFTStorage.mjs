// Paths
const basePath = process.cwd();
const outPath = `${basePath}/output`

// Imports
import { NFTStorage } from 'nft.storage'
import fs from 'fs'
import { config } from '../src/config.mjs'
import 'dotenv/config'

export async function deleteAllNFTs(receipt) {
    const rawReceipt = await fs.promises.readFile(`${outPath}/receipt.json`)
    const tokenReceipt = JSON.parse(rawReceipt)
    const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY })

    await client.delete(tokenReceipt.imageCID).then(() => {
        config.debug ? console.log(`Successfully deleted image directory at: ${tokenReceipt.imageCID}`) : null
    }).catch((err) => {
        config.debug ? console.log(`token: ${tokenReceipt.imageCID}`) : null
        config.debug ? console.log(err) : null
    })
    await client.delete(tokenReceipt.metadataCID).then(() => {
        config.debug ? console.log(`Successfully deleted metadata directory at: ${tokenReceipt.metadataCID}`) : null
    }).catch((err) => {
        config.debug ? console.log(`token: ${tokenReceipt.metadataCID}`) : null
        config.debug ? console.log(err) : null
    })
}

deleteAllNFTs()