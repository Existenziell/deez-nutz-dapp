describe("DeezNutzNFT", function () {
  it("Should create and execute market sales", async function () {
    const DeezNutz = await ethers.getContractFactory("DeezNutzNFT")
    const nutz = await DeezNutz.deploy()
    await nutz.deployed()
    const deeznutzAddress = nutz.address
    console.log(deeznutzAddress);
  })
})
