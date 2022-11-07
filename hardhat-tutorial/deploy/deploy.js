const { run, ethers, network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    console.log("deploying the contract")
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const arg = [8]
    const depol = await deploy("Whitelist", {
        from: deployer,
        log: true,
        args: arg,
    })
    console.log(`the address of the contract is ${depol.address}`)
    console.log("deployed-----------------------------------------------------")

    console.log("verfying the function ----------------------------")

    const verify = async (contractAddress, args) => {
        console.log("Verifying contract...")
        try {
            await run("verify:verify", {
                address: contractAddress,
                constructorArguments: args,
            })
        } catch (e) {
            if (e.message.toLowerCase().includes("already verified")) {
                console.log("Already verified!")
            } else {
                console.log(e)
            }
        }
    }
    await verify(depol.address, arg)
}

module.exports.tags = ["all", "BuyMe"]
// 0xB00496A05F749dC1a5a496B6ac9a66205c93Abf6 address of the contract
