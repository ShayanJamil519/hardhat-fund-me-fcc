const { ethers, getNamedAccounts, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { assert } = require("chai")

// =============
developmentChains.includes(network.name) ?
    describe.skip :
    describe("FundMe", async function() {
        // ============================
        let fundMe, deployer
        const sendValue = ethers.utils.parseEther("1") // parseEther utils converts 1 into 1 with 18 zeros
            // ============================
        beforeEach(async function() {
                deployer = (await getNamedAccounts()).deployer // which account we want to connect with FundMe
                    // Connecting our deployer to FundMe
                fundMe = await ethers.getContract("FundMe", deployer) // hardhat deploys wraps ethers with getContract() . getContract() get the most recent deployment of whatever the contract we tell it
            })
            // ========
        it("allows people to fund and withdraw", async function() {
            await fundMe.fund({ value: sendValue })
            await fundMe.withdraw()

            const endingBalance = await fundMe.provider.getBalance(
                fundMe.address
            )
            assert.equal(endingBalance.toString(), "0")
        })
    })