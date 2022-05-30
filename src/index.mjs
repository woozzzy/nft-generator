const basePath = process.cwd();
import { setupDir, generate } from './art_engine.mjs';
import { storeNFTDir, storeNFTSingle, deployContract, mintNFT } from './mint_engine.mjs';

(async () => {
    await setupDir();
    await generate();
    await storeNFTDir()
})();