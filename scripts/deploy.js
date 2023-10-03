//imports
const { ethers, run, network } = require("hardhat")

//define main
async function main() {
    // Deploying contract Code
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    console.log("Deploying Contract. . .")
    const simpleStorage = await SimpleStorageFactory.deploy()
    console.log(`Deployed contract to: ${simpleStorage.target}`)

    // If we are in testnet and have etherscan api key then it verifies our contract
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for Block Confirmation. . .")
        await simpleStorage.deploymentTransaction().wait(6)
        await verify(simpleStorage.target, [])
    }

    // Interacting with contract
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is: ${currentValue}`)

    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)

    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value is: ${updatedValue}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying Contract. . .")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

//main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
