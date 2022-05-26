// Paths
const basePath = process.cwd();
const outDir = `${basePath}/output`

//Imports
const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
const { config } = require(`${basePath}/src/config.js`)

// Import Configuration Data
const editions = config.editions
const height = config.height
const width = config.width
const layerOrder = config.layerOrder

// Global Variables
const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')
let uuidSet = new Set()
let traitMap = new Map()

// Functions
function setup() {
    if (fs.existsSync(outDir)) {
        fs.rmSync(outDir, {recursive: true})
    } else {
        fs.mkdirSync(outDir);
        fs.mkdirSync(`${outDir}/json`);
        fs.mkdirSync(`${outDir}/images`);
    }
}



function buildTraitMap() {
    let layers = fs.readdir(`${basepath}/layers`)
}

async function generate() {

}

module.exports = { setup, generate, }