import { ethers } from "ethers";
import { vaultAbi } from "./contracts/Vault.js";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

export async function getVaultContract() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, vaultAbi, signer);
}