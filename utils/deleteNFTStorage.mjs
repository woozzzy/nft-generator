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

    tokenReceipt.images.forEach(async (token) => {
        await client.delete(token).then(() => {
            config.debug ? console.log(`Successfully deleted image directory at: ${token}`) : null
        }).catch((err) => {
            config.debug ? console.log(`token: ${token}`) : null
            config.debug ? console.log(err) : null
        })
    });
    tokenReceipt.metadata.forEach(async (token) => {
        await client.delete(token).then(() => {
            config.debug ? console.log(`Successfully deleted metadata directory at: ${token}`) : null
        }).catch((err) => {
            config.debug ? console.log(`token: ${token}`) : null
            config.debug ? console.log(err) : null
        })
    });

}

deleteAllNFTs()