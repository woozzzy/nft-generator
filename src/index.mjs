const basePath = process.cwd();
import { setupDir, generate } from './art_engine.mjs';
// import { storeAllNFT } from './upload.js';

(async () => {
    await setupDir();
    await generate();
    // await storeAllNFT()
})();