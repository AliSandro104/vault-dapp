# Vault DApp

A decentralized time-locked savings application built with Solidity, React, Hardhat, and Ethers.js.

## Prerequisites

- Node.js v22.15.1
- npm v11.4.0

## Commands

### 1. Install dependencies
```bash
npm install
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

### 2. Compile contract
```bash
npx hardhat compile
```

### 3. Run local node
Start the local Hardhat blockchain:
```bash
npx hardhat node
```

### 4. Deploy contract
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 5. Run Unit Tests
```bash
npx hardhat test
```

### 6. Setup frontend
```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install tailwindcss @tailwindcss/vite
npm install ethers
```