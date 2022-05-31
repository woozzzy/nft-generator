
// Paths
const basePath = process.cwd();
const outPath = `${basePath}/output`

// Imports
import { NFTStorage, File } from 'nft.storage'
import mime from 'mime'
import fs from 'fs'
import path from 'path'
import hre from 'hardhat'
import 'dotenv/config'
import {config} from './config.mjs'
const ethers = hre.ethers

// Global Variables
const contract = config.contract
process.env.HARDHAT_NETWORK = config.network
let receipt = {
    images: [],
    metadata: [],
}

async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)

    return new File([content], path.basename(filePath), { type })
}

export async function storeNFT() {
    const rawConfig = await fs.promises.readFile(`${outPath}/config.json`)
    const config = JSON.parse(rawConfig)
    const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY })
    let imageList = []
    let metadataList = []

    for (let i = 0; i < config.generatedEditions; i++) {
        imageList.push(await fileFromPath(`${outPath}/images/${i + config.startingEdition}.png`))
        config.debug ? console.log(`Uploading ${i+config.startingEdition}.png to NFT.Storage`) : null
    }
    
    let imgBaseUri = await client.storeDirectory(imageList)
    
    for (let i = 0; i < config.generatedEditions; i++) {
        const rawMetadata = await fs.promises.readFile(`${outPath}/json/${i + config.startingEdition}.json`)
        metadataList.push(new File(     
            [JSON.stringify({
                image: `ipfs://${imgBaseUri}/${i + config.startingEdition}.png`,
                ... JSON.parse(rawMetadata)
            }, null, 2)], `${i + config.startingEdition}.json`
            ))
            config.debug ? console.log(`Uploading ${i+config.startingEdition}.json to NFT.Storage`) : null
    }
        
    receipt.images.push(imgBaseUri)
    receipt.metadata.push(await client.storeDirectory(metadataList))
    fs.writeFileSync(`${outPath}/receipt.json`, JSON.stringify(receipt, null, 2))
}

export async function deployContract() {
    const contract_pre = await ethers.getContractFactory(contract)
    const contract_post = await contract_pre.deploy()
    await contract_post.deployed()
    // This solves the bug in Mumbai network where the contract address is not the real one
    const txHash = contract_post.deployTransaction.hash
    const txReceipt = await ethers.provider.waitForTransaction(txHash)
    const contractAddress = txReceipt.contractAddress
    process.env.CONTRACT_ADDRESS = contractAddress
    console.log("Contract deployed to address:", contractAddress)
}

export async function mintNFT(metaDataURL) {
   const contract_pre = await ethers.getContractFactory(contract)
   const [owner] = await ethers.getSigners()
   await contract_pre.attach(process.env.CONTRACT_ADDRESS).safeMint(owner.address, metaDataURL)
   console.log("NFT minted to: ", owner.address)
}

async function setNetwork(network = 'PolygonMumbai') {
    process.env.HARDHAT_NETWORK = network
}