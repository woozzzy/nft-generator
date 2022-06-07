// Paths
const basePath = process.cwd();
const outPath = `${basePath}/output`

// Imports
import { NFTStorage } from 'nft.storage'
import fs from 'fs'
import hre from 'hardhat'
import { config } from '../src/config.mjs'
import 'dotenv/config'

export async function deleteAllNFTs() {
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

async function burnAllNFTs() {
    const contract_pre = await hre.ethers.getContractFactory(config.contractName)
    const contract_post = await contract_pre.attach('0x3959F19Ff9353Ca724043f355EFB6f01A050c5C0')
    for (let i = await contract_post.totalSupply() - 1; i >= 0; i--) {
        console.log(`Burning Token ID ${i}`)
        await contract_post.burn(i).catch(() => {
            console.log(`Token ID ${i} does not exist`)
        })
    }
}

deleteAllNFTs()
burnAllNFTs()