import { useState } from "react";
import { getVaultContract } from "./contract";
import { ethers } from "ethers";

function App() {
    const [account, setAccount] = useState(null);
    const [amount, setAmount] = useState("0.001");

    async function connectWallet() {
        const [addr] = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(addr);
    }

    async function deposit() {
        const contract = await getVaultContract();
        const unlockTime = Math.floor(Date.now() / 1000) + 60; // 60 seconds from now
        const tx = await contract.deposit(unlockTime, {
            value: ethers.parseEther(amount)
        });
        await tx.wait();
        alert("Deposit successful!");
    }

    return (
        <div className="min-h-screen p-4 bg-gray-100">
            {!account ? (
                <button onClick={connectWallet} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Connect Wallet
                </button>
            ) : (
                <div>
                    <div className="mb-4">
                        <input
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="p-2 border rounded mr-2"
                        />
                        <button onClick={deposit} className="px-4 py-2 bg-green-500 text-white rounded">
                            Deposit
                        </button>
                    </div>
                    <p>Connected: {account}</p>
                </div>
            )}
        </div>
    );
}

export default App;
