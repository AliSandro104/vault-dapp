const hre = require("hardhat");
const { execSync } = require("child_process");

async function main() {
  const Vault = await hre.ethers.getContractFactory("Vault");
  const vault = await Vault.deploy();

  await vault.waitForDeployment();

  console.log(`Vault deployed to: ${vault.target}`);

  execSync("npm run copy-abi", { stdio: "inherit" });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
