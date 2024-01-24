const hre = require("hardhat");
const { ethers } = require("ethers");
const { BigNumber } = require("ethers");
const { formatEther, parseEther } = require("@ethersproject/units");
const abi = require('./abi.json');
const dotenv = require('dotenv');

dotenv.config();

// ABI
// const abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_activePoolAddress","type":"address"}],"name":"ActivePoolAddressSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_borrowerOperationsAddress","type":"address"}],"name":"BorrowerOperationsAddressSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_collateralConfigAddress","type":"address"}],"name":"CollateralConfigAddressSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_account","type":"address"},{"indexed":false,"internalType":"address","name":"_collateral","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"CollateralSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_collateral","type":"address"},{"indexed":false,"internalType":"uint256","name":"_F_Collateral","type":"uint256"}],"name":"F_CollateralUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_F_LUSD","type":"uint256"}],"name":"F_LUSDUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_lqtyTokenAddress","type":"address"}],"name":"LQTYTokenAddressSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_lusdTokenAddress","type":"address"}],"name":"LUSDTokenAddressSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_redemptionHelperAddress","type":"address"}],"name":"RedemptionHelperAddressSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"newStake","type":"uint256"}],"name":"StakeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_staker","type":"address"},{"indexed":false,"internalType":"address[]","name":"_assets","type":"address[]"},{"indexed":false,"internalType":"uint256[]","name":"_amounts","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"_F_LUSD","type":"uint256"}],"name":"StakerSnapshotsUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"LUSDGain","type":"uint256"},{"indexed":false,"internalType":"address[]","name":"_assets","type":"address[]"},{"indexed":false,"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"StakingGainsWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_totalLQTYStaked","type":"uint256"}],"name":"TotalLQTYStakedUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_troveManager","type":"address"}],"name":"TroveManagerAddressSet","type":"event"},{"inputs":[],"name":"DECIMAL_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"F_Collateral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"F_LUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NAME","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"activePoolAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowerOperationsAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"collateralConfig","outputs":[{"internalType":"contract ICollateralConfig","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getPendingCollateralGain","outputs":[{"internalType":"address[]","name":"","type":"address[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getPendingLUSDGain","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_collateral","type":"address"},{"internalType":"uint256","name":"_collFee","type":"uint256"}],"name":"increaseF_Collateral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_LUSDFee","type":"uint256"}],"name":"increaseF_LUSD","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastF_CollateralError","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lqtyToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lusdToken","outputs":[{"internalType":"contract ILUSDToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"redemptionHelperAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lqtyTokenAddress","type":"address"},{"internalType":"address","name":"_lusdTokenAddress","type":"address"},{"internalType":"address","name":"_troveManagerAddress","type":"address"},{"internalType":"address","name":"_redemptionHelperAddress","type":"address"},{"internalType":"address","name":"_borrowerOperationsAddress","type":"address"},{"internalType":"address","name":"_activePoolAddress","type":"address"},{"internalType":"address","name":"_collateralConfigAddress","type":"address"}],"name":"setAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"snapshots","outputs":[{"internalType":"uint256","name":"F_LUSD_Snapshot","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_LQTYamount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalLQTYStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"troveManagerAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_LQTYamount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const MIN_GAS_LIMIT = 1500000;
const WEI_PER_GWEI = 1000000000;

async function main() {

  const provider = new ethers.providers.JsonRpcProvider("https://optimism-mainnet.infura.io/v3/d586f648ae834bc3998785e95c3eef8c");
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const ERC20Abi = [
    "function balanceOf(address owner) view returns (uint256)",
  ];

  const poolAbi = [
    "function getPendingLUSDGain(address _user) view returns (uint256)",
  ]

  const stakingAbi = [
    "function stakes(address _user) view returns (uint256)",
  ]
  

  //bOATH smart contract info
  const bOATH_Staking_Pool = "0x7D6a62d496D42d5E978C4eDa0d367Ac1Ba70A200";
  const contractABI = abi;

  //bOATH BeethovenX info
  const bOATH_BeethovenX = "0xBA12222222228d8Ba445958a75a0704d566BF2C8";

  //OATH token info
  const OATH = "0x00e1724885473B63bCE08a9f0a52F35b0979e35A";
  const OATH_ABI = ERC20Abi;

  //ETH token info
  const ETH = "0x4200000000000000000000000000000000000006";
  const ETH_ABI = ERC20Abi;

  // Check bOATH balance
  const contract = new ethers.Contract(bOATH_BeethovenX, contractABI, signer);
  const address = await signer.getAddress();
  let balance = await contract.balanceOf(address);
  console.log("bOATH balance: ", balance.toString());

  // Harvest rewards
  const poolContract = new ethers.Contract(bOATH_Staking_Pool, poolAbi, signer);
  const signedPoolContract = poolContract.connect(signer);
  const harvestTX = await signedPoolContract.getPendingLUSDGain(address);
  console.log("harvesttX: ", harvestX.toString());
  await new Promise(r => setTimeout(r, 2000));

  // Check they arrived
  balance = await contract.balanceOf(address);
  console.log("bOATH balance: ", balance.toString());
  await new Promise(r => setTimeout(r, 2000));

  // Staking rewards
  const stakingContract = new ethers.Contract(bOATH_Staking_Pool, stakingAbi, signer);
  const signedStakingContract = stakingContract.connect(signer);
  const stakingTX = await signedStakingContract.stakes(address);
  console.log("stakingTX: ", stakingTX.toString());
  await new Promise(r => setTimeout(r, 2000));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
