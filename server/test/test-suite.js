// Paths
const basePath = process.cwd();
const outPath = `${basePath}/output`
// Imports
const { expect } = require("chai");
const hre = require("hardhat");
const ethers = hre.ethers;
const fs = require('fs');

describe("Token contract", function () {
    // Mocha has four functions that let you hook into the test runner's
    // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

    // They're very useful to setup the environment for tests, and to clean it
    // up after they run.

    // A common pattern is to declare some variables, and assign them in the
    // `before` and `beforeEach` callbacks.

    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    // `beforeEach` will run before each test, re-deploying the contract every
    // time. It receives a callback, which can be async.
    before(async function () {
        // Get the ContractFactory and Signers here.
        Token = await ethers.getContractFactory("TestingContract");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        // To deploy our contract, we just have to call Token.deploy() and await
        // for it to be deployed(), which happens once its transaction has been
        // mined.
        hardhatToken = await Token.deploy();
    });

    // You can nest describe calls to create subsections.
    describe("Deployment", function () {
        // `it` is another Mocha function. This is the one you use to define your
        // tests. It receives the test name, and a callback function.

        // If the callback function is async, Mocha will `await` it.
        it("Should set the right owner", async function () {
            // Expect receives a value, and wraps it in an Assertion object. These
            // objects have a lot of utility methods to assert values.

            // This test expects the owner variable stored in the contract to be equal
            // to our Signer's owner.
            expect(await hardhatToken.owner()).to.equal(owner.address);
        });

        it("Should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            const totalSupply = await hardhatToken.totalSupply();
            expect(totalSupply).to.equal(ownerBalance);
        });
    });

    describe("Minting", function () {
        it("Should mint all NFTs in Receipt.json", async function () {
            const rawReceipt = await fs.promises.readFile(`${outPath}/receipt.json`)
            receipt = JSON.parse(rawReceipt)

            // let uriList = Array.from(Array(10).keys()) 
            let uriList = []
            for (let metadata of receipt.metadata) {
                let metaDataURL = `ipfs://${receipt.metadataCID}/${metadata}`
                uriList.push(metaDataURL)
            }
            await hardhatToken.batchMint(owner.address, uriList)
            expect(await hardhatToken.totalSupply()).to.equal(uriList.length)
        });
    });
});