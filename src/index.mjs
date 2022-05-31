const basePath = process.cwd();
import { setupDir, generate } from './art_engine.mjs';
import { setupMint, storeNFT } from './mint_engine.mjs';

(async () => {
    await setupDir();
    await generate();
    await storeNFT();
    await setupMint();
})();