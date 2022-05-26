const basePath = process.cwd();
import { setupDir, generate } from './art_engine.js';

(() => {
    setupDir();
    generate();
})();