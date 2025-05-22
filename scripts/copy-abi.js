const fs = require("fs");
const path = require("path");

const contractName = "Vault";
const artifactsPath = path.join(__dirname, "..", "artifacts", "contracts", `${contractName}.sol`, `${contractName}.json`);
const frontendPath = path.join(__dirname, "..", "frontend", "src", "contracts", `${contractName}.js`);

function exportAbi() {
    const artifact = JSON.parse(fs.readFileSync(artifactsPath, "utf8"));
    const abi = artifact.abi;

    const fileContent = `export const vaultAbi = ${JSON.stringify(abi, null, 2)};\n`;

    fs.writeFileSync(frontendPath, fileContent);
    console.log(`ABI for ${contractName} copied to frontend.`);
}

exportAbi();
