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
    // Collection Level Metadata
    collectionName: "thisnamebetterbeuniquecollection12345",
    collectionDescription: "longerdescriptiongoeshere",
    collectionImage: "image-url",
    collectionLink: "external-link-url",
    fee: 100,
    feeRecipient: "0xA97F337c39cccE66adfeCB2BF99C1DdC54C2D721",
    // NFT Level Metadata
    nftName: "test",
    nftDescription: "descriptiongoeshere",
    // General Settings
    startingEdition: 0,
    editionCount: 10,
    generateAll: false,
    height: 512,
    width: 512,
    layerOrder: layerOrder,
    // Contract and Minting
    contractType: "ERC721",
    contractName: "TestingContract",
    token: "TestToken",
    symbol: "TTS",
    network: "PolygonMumbai",
    // Debugging
    saveConfig: true,
    debug: true,
}