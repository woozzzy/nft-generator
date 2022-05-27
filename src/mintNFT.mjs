// Polygon
// const CONTRACT_ADDRESS = "0x557cAC4284Bb1cd6F6B314f6D4dB6C0214e08124"
// Klaytn
const CONTRACT_ADDRESS = "0x557cAC4284Bb1cd6F6B314f6D4dB6C0214e08124"
const META_DATA_URL = "ipfs://bafyreicicbswlyvyywfqkgmclswrn5x7cufqiujimcwtihye3ngedqvf3e/metadata.json"

async function mintNFT(contractAddress, metaDataURL) {
   const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
   const [owner] = await ethers.getSigners()
   await ExampleNFT.attach(contractAddress).mintNFT(owner.address, metaDataURL)
   console.log("NFT minted to: ", owner.address)
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });