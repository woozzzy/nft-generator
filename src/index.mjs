const basePath = process.cwd();
import fetch from 'node-fetch';
import { setupDir, generate } from './art_engine.mjs';
import { deployContract, mintAllNFT, setupMint, storeNFT } from './mint_engine.mjs';

(async () => {
    await setupDir();
    await generate();
    await storeNFT();
    await setupMint();
    await deployContract();
    await mintAllNFT();
})();

// console.log("MUMBAI:")
// await fetch('https://gasstation-mumbai.matic.today/v2')
//   .then(response => response.json())
//   .then(json => console.log(json))
// console.log("MAINNET:")
// await fetch('https://gasstation-mainnet.matic.network/v2')
//   .then(response => response.json())
//   .then(json => console.log(json))