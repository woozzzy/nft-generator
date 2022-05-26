const layerOrder = [
    { name: "Background" },
    { name: "Eyeball" },
    { name: "Eye color" },
    { name: "Iris" },
    { name: "Shine" },
    { name: "Bottom lid" },
    { name: "Top lid" },
]

const config = {
    collectionName: "test",
    description: "descriptiongoeshere",
    baseURI: "ipfs://urigoeshere",
    editionCount: 10,
    generateAll: false,
    height: 512,
    width: 512,
    layerOrder: layerOrder,
}

module.exports = {
    config,
}