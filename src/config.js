const layerOrder = [
    { name: "Background" },
    { name: "Eyeball" },
    { name: "Eye color" },
    { name: "Iris" },
    { name: "Shine" },
    { name: "Bottom lid" },
    { name: "Top lid" },
]

export const config = {
    collectionName: "test",
    description: "descriptiongoeshere",
    baseURI: "ipfs://urigoeshere",
    startingEdition: 0,
    editionCount: 2,
    generateAll: false,
    height: 512,
    width: 512,
    layerOrder: layerOrder,
    saveConfig: true,
    debug: true,
}