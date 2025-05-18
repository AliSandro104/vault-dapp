const { expect } = require("chai");

describe("Vault", function () {
  let Vault, vault, owner, addr1;

  beforeEach(async function () {
    Vault = await ethers.getContractFactory("Vault");
    [owner, addr1] = await ethers.getSigners();
    vault = await Vault.deploy();
    await vault.waitForDeployment();
  });

  it("should allow deposit and track balance", async function () {
    const depositAmount = ethers.parseEther("1");
    await vault.connect(addr1).deposit({ value: depositAmount });
    const balance = await vault.balances(addr1.address);
    expect(balance).to.equal(depositAmount);
  });

  it("should allow withdrawal of deposited funds", async function () {
    const depositAmount = ethers.parseEther("2");
    await vault.connect(addr1).deposit({ value: depositAmount });
    await vault.connect(addr1).withdraw();
    const balanceAfter = await vault.balances(addr1.address);
    expect(balanceAfter).to.equal(0n);
  });
});
