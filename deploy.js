
const { ethers } = require("hardhat");

async function main() {
  
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  
  const AutonomousSpaceFleet = await ethers.getContractFactory("AutonomousSpaceFleet");

  
  const fleet = await AutonomousSpaceFleet.deploy();  
  console.log("AutonomousSpaceFleet contract deployed to:", fleet.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
