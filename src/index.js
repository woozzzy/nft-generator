const basePath = process.cwd();
const { setupDir, generate } = require(`${basePath}/src/art_engine.js`);

(() => {
    setupDir();
    generate();
})();