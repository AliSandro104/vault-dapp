import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getVaultContract } from "./contract";

function App() {
    const [account, setAccount] = useState(null);
    const [amount, setAmount] = useState("0.1");
    const [unlockSeconds, setUnlockSeconds] = useState(60);
    const [deposits, setDeposits] = useState([]);

    async function connectWallet() {
        const [addr] = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(addr);
    }

    async function loadDeposits() {
        if (!account) return;
        const contract = await getVaultContract();
        const userDeposits = await contract.getDeposits(account);
        setDeposits(userDeposits);
    }

    async function deposit() {
        const contract = await getVaultContract();
        const unlockTime = Math.floor(Date.now() / 1000) + parseInt(unlockSeconds);

        const tx = await contract.deposit(unlockTime, {
            value: ethers.parseEther(amount),
        });
        await tx.wait();

        await loadDeposits();
        alert("Deposit successful!");
    }

    async function withdraw(index) {
        const contract = await getVaultContract();
        const tx = await contract.withdraw(index);
        await tx.wait();
        await loadDeposits();
    }

    useEffect(() => {
        if (account) loadDeposits();
    }, [account]);

    return (
        <div className="container py-5">
            <h1 className="mb-4 text-center">Vault DApp</h1>

            {!account ? (
                <div className="text-center">
                    <button onClick={connectWallet} className="btn btn-primary">Connect Wallet</button>
                </div>
            ) : (
                <>
                    <div className="mb-4">
                        <div className="row g-2">
                            <div className="col-md-3">
                                <input
                                    type="number"
                                    step="0.01"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="form-control"
                                    placeholder="Amount (ETH)"
                                />
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="number"
                                    value={unlockSeconds}
                                    onChange={(e) => setUnlockSeconds(e.target.value)}
                                    className="form-control"
                                    placeholder="Lock time (seconds)"
                                />
                            </div>
                            <div className="col-md-3">
                                <button onClick={deposit} className="btn btn-success w-100">Deposit</button>
                            </div>
                        </div>
                    </div>

                    <h4>My Deposits</h4>
                    {deposits.length === 0 ? (
                        <p>No deposits found.</p>
                    ) : (
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Amount (ETH)</th>
                                <th>Unlock Time</th>
                                <th>Status</th>
                                <th>Withdraw</th>
                            </tr>
                            </thead>
                            <tbody>
                            {deposits.map((d, i) => {
                                const now = Math.floor(Date.now() / 1000);
                                const unlocked = now >= Number(d.unlockTime);
                                const ethAmount = ethers.formatEther(d.amount);

                                return (
                                    <tr key={i}>
                                        <td>{i}</td>
                                        <td>{ethAmount}</td>
                                        <td>{new Date(Number(d.unlockTime) * 1000).toLocaleString()}</td>
                                        <td>{unlocked ? "Unlocked" : "Locked"}</td>
                                        <td>
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => withdraw(i)}
                                                disabled={Number(d.amount) === 0n}
                                            >
                                                Withdraw
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
