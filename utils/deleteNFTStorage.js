// Paths
const basePath = process.cwd();
const outPath = `${basePath}/output`

// Imports
import { NFTStorage } from 'nft.storage'
import fs from 'fs'

const NFT_STORAGE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDljNWU5ZDg1NTA2ZGQyNmNkZGY4RkZEMERERGQ0Njk0MTZlRGM3ZjkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MzU1Mzg0MTk4OCwibmFtZSI6InBvbHlnb25ORlQifQ.NIXxlJtqh5okJK62pc8xkrkFRKfPV3M2EwdrtYRUrkc"


export async function deleteAllNFTs(receipt) {
    const rawReceipt = await fs.promises.readFile(`${outPath}/receipt.json`)
    const tokenReceipt = JSON.parse(rawReceipt)

    const client = new NFTStorage({ token: NFT_STORAGE_KEY })

    tokenReceipt.tokens.forEach(async (token) => {
        await client.delete(token.ipnft)
    });

}

deleteAllNFTs()