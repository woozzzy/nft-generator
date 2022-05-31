const basePath = process.cwd();
import { setupDir, generate } from './art_engine.mjs';
import { deployContract, mintAllNFT, setupMint, storeNFT } from './mint_engine.mjs';
import { deleteAllNFTs } from '../utils/deleteNFTStorage.mjs';

(async () => {
    await setupDir();
    await generate();
    await storeNFT();
    await setupMint();
    await deployContract();
    await mintAllNFT();
})();