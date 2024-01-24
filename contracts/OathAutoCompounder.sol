// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract OathAutoCompounder {
    address public rewardToken;
    address public stakingContract;
    address public compounder;

    constructor(address _rewardToken, address _stakingContract) {
        rewardToken = _rewardToken;
        stakingContract = _stakingContract;
        compounder = msg.sender;
    }

    function compoundRewards() external {
        require(msg.sender == compounder, "Only compounder can call this function");

        uint256 rewardBalance = IERC20(rewardToken).balanceOf(address(this));
        require(rewardBalance > 0, "No rewards to compound");

        IERC20(rewardToken).approve(stakingContract, rewardBalance);
        // Call the compound function in the staking contract
        // stakingContract.compound(rewardBalance);

        // Emit an event or perform any other necessary actions
    }
}
