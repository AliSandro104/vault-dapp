// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Vault {
    struct Deposit {
        uint256 amount;
        uint256 unlockTime;
    }

    mapping(address => Deposit[]) public deposits;

    event Deposited(address indexed user, uint256 amount, uint256 unlockTime);
    event Withdrawn(address indexed user, uint256 amount);

    function deposit(uint256 _unlockTime) external payable {
        require(msg.value > 0, "Must send ETH");
        require(_unlockTime > block.timestamp, "Unlock time must be in future");

        deposits[msg.sender].push(Deposit({
            amount: msg.value,
            unlockTime: _unlockTime
        }));

        emit Deposited(msg.sender, msg.value, _unlockTime);
    }

    function withdraw(uint256 index) external {
        Deposit memory userDeposit = deposits[msg.sender][index];
        require(userDeposit.amount > 0, "Nothing to withdraw");
        require(block.timestamp >= userDeposit.unlockTime, "Locked");

        deposits[msg.sender][index].amount = 0;
        payable(msg.sender).transfer(userDeposit.amount);

        emit Withdrawn(msg.sender, userDeposit.amount);
    }

    function getDeposits(address user) external view returns (Deposit[] memory) {
        return deposits[user];
    }
}
