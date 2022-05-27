const basePath = process.cwd();
import { setupDir, generate } from './art_engine.js';
import { storeAllNFT } from './upload.js';

(async () => {
    await setupDir();
    await generate();
    // await storeAllNFT();
})();