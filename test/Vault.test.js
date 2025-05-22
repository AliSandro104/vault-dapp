const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault", function () {
  let Vault, vault, owner, addr1;

  beforeEach(async function () {
    Vault = await ethers.getContractFactory("Vault");
    [owner, addr1] = await ethers.getSigners();
    vault = await Vault.deploy();
    await vault.waitForDeployment();
  });

  it("should allow deposit and track balance", async function () {
    const depositAmount = ethers.parseEther("0.1");
    const unlockTime = Math.floor(Date.now() / 1000) + 60; // 1 minute in the future

    await vault.connect(addr1).deposit(unlockTime, { value: depositAmount });

    const deposits = await vault.getDeposits(addr1.address);
    expect(deposits.length).to.equal(1);
    expect(deposits[0].amount).to.equal(depositAmount);
  });

  it("should allow withdrawal of deposited funds", async function () {
    const depositAmount = ethers.parseEther("0.2");
    const unlockTime = Math.floor(Date.now() / 1000) + 10; // 10 seconds in the future

    await vault.connect(addr1).deposit(unlockTime, { value: depositAmount });

    // Increase time by 11 seconds to go past unlockTime
    await network.provider.send("evm_increaseTime", [11]);
    await network.provider.send("evm_mine"); // mine a block to apply the time change

    await vault.connect(addr1).withdraw(0);

    const deposits = await vault.getDeposits(addr1.address);
    expect(deposits[0].amount).to.equal(0);
  });

});
