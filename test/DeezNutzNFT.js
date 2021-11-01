// We import Chai to use its asserting functions here.
const { expect } = require("chai");
const { ethers } = require("hardhat");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("DeezNutzNFT contract", function () {
  // Mocha has four functions that let you hook into the the test runner's
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
  const base = "https://deez-nutz.vercel.app/api/"

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("DeezNutzNFT");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    hardhatToken = await Token.deploy("DeezNutz NFT", "DNN", "https://deez-nutz.vercel.app/api/");
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
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("mint", function () {
    it(`Should mint mintAmmount of tokens to the given address`, async function () {
      await hardhatToken.mint(addr2.address, 10)
      const supply = await hardhatToken.totalSupply();
      expect(supply).to.equal(15); // 5 to owner on deploy + 10 here 
    });

    it("Should fail if sender tries to mint more than maxMintAmount of tokens", async function () {
      // Try to mint 30 tokens to addr1 (0 tokens).
      // `require` will evaluate false and revert the transaction.
      await expect(
        hardhatToken.mint(addr1.address, 30)
      ).to.be.revertedWith("");
    });

    it("Owner balance shouldn't have changed", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

  });

  describe("baseURI", function () {
    it(`Should return the baseURI and be equal to ${base}`, async function () {
      const uri = await hardhatToken.baseURI()
      expect(uri).to.equal(base);
    });
  });

  describe("walletOfOwner", function () {
    const id = 2
    it(`Should return an array of tokenURIs owned by the owner`, async function () {
      const wallet = await hardhatToken.walletOfOwner(addr1.address)
      expect(wallet.length).to.equal(0)
    });
  });

  describe("tokenURI", function () {
    const id = 2
    it(`Should return the correct tokenURI for a given token id`, async function () {
      const tokenUri = await hardhatToken.tokenURI(id)
      expect(tokenUri).to.equal(base + id)
    });
  });

  describe("setCost", function () {
    it(`Should set the cost for minting a token to the new value`, async function () {
      await hardhatToken.setCost(ethers.utils.parseUnits("0.1"))
      expect(await hardhatToken.cost()).to.equal(ethers.utils.parseUnits("0.1"));
    });
  });

  describe("setmaxMintAmount", function () {
    it(`Should set the maxMintAmount to the new value`, async function () {
      await hardhatToken.setmaxMintAmount(10)
      expect(await hardhatToken.maxMintAmount()).to.equal(10);
    });
  });

  describe("setBaseURI", function () {
    it(`Should set the baseURI to the new value`, async function () {
      await hardhatToken.setBaseURI("http://hardhat.com/")
      expect(await hardhatToken.baseURI()).to.equal("http://hardhat.com/");
    });
  });

  describe("setBaseExtension", function () {
    it(`Should set the baseExtension to the new value`, async function () {
      await hardhatToken.setBaseExtension(".json")
      expect(await hardhatToken.baseExtension()).to.equal(".json");
    });
  });

  describe("pause", function () {
    it(`Should pause the contract`, async function () {
      await hardhatToken.pause(true)
      expect(await hardhatToken.paused()).to.equal(true);
    });
  });

  describe("whitelistUser", function () {
    it(`Should add the address to the array of whitelistedUsers`, async function () {
      await hardhatToken.whitelistUser("0xBBb0B2a32b6a4b95551B5c012a37763735307B77")
      expect(await hardhatToken.whitelisted("0xBBb0B2a32b6a4b95551B5c012a37763735307B77")).to.equal(true);
    });
  });


  describe("removeWhitelistUser", function () {
    it(`Should remove the address from the array of whitelistedUsers`, async function () {
      await hardhatToken.removeWhitelistUser("0xBBb0B2a32b6a4b95551B5c012a37763735307B77")
      expect(await hardhatToken.whitelisted("0xBBb0B2a32b6a4b95551B5c012a37763735307B77")).to.equal(false);
    });
  });

  describe("withdraw", function () {
    it("Should withdraw all funds to the owner's address", async function () {
      await hardhatToken.withdraw();
      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      // console.log(addr1Balance);
      // expect(addr1Balance).to.equal(50);

      // // Transfer 50 tokens from addr1 to addr2
      // // We use .connect(signer) to send a transaction from another account
      // await hardhatToken.connect(addr1).transfer(addr2.address, 50);
      // const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      // expect(addr2Balance).to.equal(50);
    });

    //   it("Should fail if sender doesn’t have enough tokens", async function () {
    //     const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

    //     // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
    //     // `require` will evaluate false and revert the transaction.
    //     await expect(
    //       hardhatToken.connect(addr1).transfer(owner.address, 1)
    //     ).to.be.revertedWith("Not enough tokens");

    //     // Owner balance shouldn't have changed.
    //     expect(await hardhatToken.balanceOf(owner.address)).to.equal(
    //       initialOwnerBalance
    //     );
    //   });

    //   it("Should update balances after transfers", async function () {
    //     const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

    //     // Transfer 100 tokens from owner to addr1.
    //     await hardhatToken.transfer(addr1.address, 100);

    //     // Transfer another 50 tokens from owner to addr2.
    //     await hardhatToken.transfer(addr2.address, 50);

    //     // Check balances.
    //     const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
    //     expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);

    //     const addr1Balance = await hardhatToken.balanceOf(addr1.address);
    //     expect(addr1Balance).to.equal(100);

    //     const addr2Balance = await hardhatToken.balanceOf(addr2.address);
    //     expect(addr2Balance).to.equal(50);
    //   });
  });
});

// describe("DeezNutzNFT contract", function () {
//   it("Deployment should assign the total supply of tokens to the owner", async function () {
//     const [owner] = await ethers.getSigners();

//     const Token = await ethers.getContractFactory("DeezNutzNFT");

//     const hardhatToken = await Token.deploy("DeezNutz NFT", "DNN", "https://deez-nutz.vercel.app/api/");

//     const ownerBalance = await hardhatToken.balanceOf(owner.address);
//     expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//   });
// });
