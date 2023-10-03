// Hardhat runs with mocha framework which is js based framework to run test
const {ethers} = require("hardhat")
const {expect, assert} = require("chai")


describe("SimpleStorage", async()=>{
    //beforeEach() -> tells us what to do before each of the it
    // it() -> write code for test
    let SimpleStorageFactory, simpleStorage

    beforeEach(async()=>{
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
    })

    it("Should start with favorite number of 0", async()=>{
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        
        //use either Assert or Expect
        assert.equal(currentValue.toString(), expectedValue)
        // expect(currentValue.toString()).to.equal(expectedValue)
    })

    it("Should update when we call store", async()=>{
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()

        assert.equal(currentValue, expectedValue);
    })

    it("Should add person with their favorite number", async()=>{
        const expectedValue = "7"
        const person = "Unique"
        const transactionResponse = await simpleStorage.addPerson(person,expectedValue)
        await transactionResponse.wait(1)

        const {favoriteNumber, name} = await simpleStorage.people(0)

        assert.equal(favoriteNumber, expectedValue)
        assert.equal(name, person)
    })
})