const basePath = process.cwd();
import fetch from 'node-fetch';
import { setupDir, generate } from './art_engine.mjs';
import { deployContract, estimateMintCost, mintAllNFT, setupMint, storeNFT } from './mint_engine.mjs';

(async () => {
    await setupDir();
    await generate();
    await storeNFT();
    await setupMint();
    await deployContract();
    await mintAllNFT();
})();