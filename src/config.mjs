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
    // Collection Level
    collectionName: "collection",
    collectionDescription: "thisislongerdescription",
    startingEdition: 0,
    editionCount: 2,
    generateAll: false,
    height: 512,
    width: 512,
    layerOrder: layerOrder,
    // Single NFT
    nftName: "test",
    nftDescription: "descriptiongoeshere",
    // Minting 
    contract: "MyERC721",
    network: "PolygonMumbai",
    // Debugging
    saveConfig: true,
    debug: true,
}