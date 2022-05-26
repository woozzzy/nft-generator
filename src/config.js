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
    editions: 10,
    height: 512,
    width: 512,
    layerOrder: layerOrder,
}

module.exports = {
    config,
}