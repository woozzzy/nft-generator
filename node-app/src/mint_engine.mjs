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

// Global Variables
let receipt = {
    imageCID: '',
    metadataCID: '',
    images: [],
    metadata: [],
}

export async function setupMint() {
    process.env.HARDHAT_NETWORK = config.network
    const rawReceipt = await fs.promises.readFile(`${outPath}/receipt.json`)
    receipt = JSON.parse(rawReceipt)
    await generateContract()
    await new Promise(r => setTimeout(r, 1000));
    await hre.run("compile")
}

async function generateContract() {
    fs.readFile(`${basePath}/contracts/My${config.contractType}_Template.sol`, 'utf-8', (err, data) => {
        if (err) throw err
        
        let newValue = data
            .replace('replacenameofcontract', config.contractName)
            .replace('replaceuriofcontractmetadata', `ipfs://${receipt.metadataCID}/collectionMetadata.json`)
        if (config.contractType == 'ERC721') {
            newValue = newValue
                .replace('replacenameoftoken', config.token)
                .replace('replacenameofsymbol',  config.symbol)
        }    
        fs.writeFile(`${basePath}/contracts/${config.contractName}.sol`, newValue, 'utf-8', function (err) {
            if (err) throw err
            config.debug ? console.log(`Generated Contract: ${config.contractName}.sol`) : null
        })
    })
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
        receipt.images.push(`${i + config.startingEdition}.png`)
        config.debug ? console.log(`Uploading ${i + config.startingEdition}.png to NFT.Storage`) : null
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
        receipt.metadata.push(`${i + config.startingEdition}.json`)
        config.debug ? console.log(`Uploading ${i+config.startingEdition}.json to NFT.Storage`) : null
    }
    
    config.debug ? console.log(`Uploading collectionMetadata.json to NFT.Storage`) : null
    metadataList.push(fileFromPath(`${outPath}/json/collectionMetadata.json`))
    receipt.imageCID = imgBaseUri
    receipt.metadataCID = await client.storeDirectory(metadataList)
    fs.writeFileSync(`${outPath}/receipt.json`, JSON.stringify(receipt, null, 2))
}

export async function deployContract() {
    config.debug ? console.log("Getting Contract Factory"): null
    const token = await hre.ethers.getContractFactory(config.contractName)
    config.debug ? console.log("Deploying Contract"): null
    const hardhatToken = await token.deploy()
    config.debug ? console.log("Waiting for Deploy Confirmation"): null
    await hardhatToken.deployed()
    // This solves the bug in Mumbai network where the contract address is not the real one
    config.debug ? console.log("Getting Contract Address"): null
    const txHash = hardhatToken.deployTransaction.hash
    const txReceipt = await hre.ethers.provider.waitForTransaction(txHash)
    const contractAddress = txReceipt.contractAddress
    process.env.CONTRACT_ADDRESS = contractAddress
    config.debug ? console.log("Contract deployed to address:", contractAddress) : null
}

async function mintNFT(metaDataURL) {
   const token = await hre.ethers.getContractFactory(config.contractName)
   const [owner] = await hre.ethers.getSigners()
   await token.attach(process.env.CONTRACT_ADDRESS).safeMint(owner.address, metaDataURL)
   return owner.address
}

export async function mintAllNFT() {
    const rawReceipt = await fs.promises.readFile(`${outPath}/receipt.json`)
    receipt = JSON.parse(rawReceipt)

    const token = await hre.ethers.getContractFactory(config.contractName)
    const [owner] = await hre.ethers.getSigners()
    process.env.CONTRACT_ADDRESS = '0x3959F19Ff9353Ca724043f355EFB6f01A050c5C0'
    const hardhatToken = token.attach(process.env.CONTRACT_ADDRESS)
    let uriList = []
    for (let metadata of receipt.metadata) {
        let metaDataURL = `ipfs://${receipt.metadataCID}/${metadata}`
        uriList.push(metaDataURL)
    }
    // console.log(`Estimated Gas Cost: `, await hardhatToken.estimateGas.batchMint(owner.address, uriList))
    config.debug ? console.log("Minting NFTS to: ", owner.address) : null
    console.log(await hardhatToken.batchMint(owner.address, uriList))
}

export async function estimateMintCost() {
    const rawReceipt = await fs.promises.readFile(`${outPath}/receipt.json`)
    receipt = JSON.parse(rawReceipt)

    const token = await hre.ethers.getContractFactory(config.contractName)
    const [owner] = await hre.ethers.getSigners()
    const hardhatToken = token.attach('0xd7faaf723e2e60cc6cc37102e95180e918c9a35a')

    // let uriList = Array.from(Array(10).keys()) 
    let uriList = []
    for (let metadata of receipt.metadata) {
        let metaDataURL = `ipfs://${receipt.metadataCID}/${metadata}`
        uriList.push(metaDataURL)
    }
    return await hardhatToken.estimateGas.batchMint(owner.address, uriList.slice(0, 40))
}
