
// Paths
const basePath = process.cwd();
const outPath = `${basePath}/output`

// Imports
import { NFTStorage, File } from 'nft.storage'
import mime from 'mime'
import fs from 'fs'
import path from 'path'
import hre from 'hardhat'
const ethers = hre.ethers

// Global Variables
const CONTRACT_ADDRESS = "0x557cAC4284Bb1cd6F6B314f6D4dB6C0214e08124"
const META_DATA_URL = "ipfs://bafyreicicbswlyvyywfqkgmclswrn5x7cufqiujimcwtihye3ngedqvf3e/metadata.json"
const NFT_STORAGE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDljNWU5ZDg1NTA2ZGQyNmNkZGY4RkZEMERERGQ0Njk0MTZlRGM3ZjkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MzU1Mzg0MTk4OCwibmFtZSI6InBvbHlnb25ORlQifQ.NIXxlJtqh5okJK62pc8xkrkFRKfPV3M2EwdrtYRUrkc"
const CONTRACT = "MyERC721"
process.env.HARDHAT_NETWORK = "PolygonMumbai"
let receipt = {
    tokens: [],
}

async function storeNFT(imagePath, metadataPath) {
    const image = await fileFromPath(imagePath)
    const rawMetadata = await fs.promises.readFile(metadataPath)
    const metadata = JSON.parse(rawMetadata)
    const client = new NFTStorage({ token: NFT_STORAGE_KEY })

    receipt.tokens.push(await client.store({
        image,
        ... metadata,
    }))
}

async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)

    return new File([content], path.basename(filePath), { type })
}

export async function storeNFTDir() {
    const rawConfig = await fs.promises.readFile(`${outPath}/config.json`)
    const config = JSON.parse(rawConfig)
    const client = new NFTStorage({ token: NFT_STORAGE_KEY })
    let imageList = []
    let metadataList = []

    for (let i = 0; i < config.generatedEditions; i++) {
        imageList.push(await fileFromPath(`${outPath}/images/${i + config.startingEdition}.png`))
        config.debug ? console.log(`Uploading ${i+config.startingEdition}.png to NFT.Storage`) : null
    }
    
    let imgBaseUri = await client.storeDirectory(imageList)
    receipt.tokens.push(imgBaseUri)

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

    receipt.tokens.push(await client.storeDirectory(metadataList))

    fs.writeFileSync(`${outPath}/receipt.json`, JSON.stringify(receipt, null, 2))
}

export async function storeNFTSingle() {
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

export async function deployContract() {
    const contract_pre = await ethers.getContractFactory(CONTRACT)
    const contract_post = await contract_pre.deploy()
    await contract_post.deployed()
    // This solves the bug in Mumbai network where the contract address is not the real one
    const txHash = contract_post.deployTransaction.hash
    const txReceipt = await ethers.provider.waitForTransaction(txHash)
    const contractAddress = txReceipt.contractAddress
    console.log("Contract deployed to address:", contractAddress)
}

export async function mintNFT(contractAddress, metaDataURL) {
   const contract_pre = await ethers.getContractFactory(CONTRACT)
   const [owner] = await ethers.getSigners()
   await contract_pre.attach(contractAddress).mintNFT(owner.address, metaDataURL)
   console.log("NFT minted to: ", owner.address)
}

async function setNetwork(network = 'PolygonMumbai') {
    process.env.HARDHAT_NETWORK = network
}