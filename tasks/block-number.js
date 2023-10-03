const {task} = require("hardhat/config")

// task better for plugin
// scripts better for own local development environment
task("block-number", "Prints the current block number").setAction(
    //hre = hardhat runtime environment, can access same packages like hardhat can
    async(taskArgs, hre) =>{
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
    }
)

module.exports={}