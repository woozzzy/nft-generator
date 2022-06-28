export const networks = {
    // Main nets
    "0x1": "Ethereum", // 1
    "0x89": "Polygon", // 137
    // Test nets
    "0x5": "Goerli", // 5
    "0x13881": "Mumbai", // 80001
}
export const networkParams = {
    // Main nets
    "0x1": {
        chainId: "0x1",
        chainName: "Ethereum Mainnet",
        rpcUrls: ["https://rpc.ankr.com/eth"],
    }, // 1
    "0x89": {
        chainId: "0x89",
        chainName: "Polygon Mainnet",
        rpcUrls: ["https://polygon-rpc.com"],
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
        },
        blockExplorerUrls: ["https://polygonscan.com"]
    }, // 137
    // Test nets
    "0x5": {
        chainId: "0x5",
        chainName: "Goerli",
        rpcUrls: ["https://rpc.goerli.mudit.blog/"],
    }, // 5
    "0x13881": {
        chainId: "0x13881",
        chainName: "Mumbai",
        rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
    },// 80001
}


