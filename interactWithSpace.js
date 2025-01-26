
const { ethers } = require('hardhat');  // Importing ethers library
const contractAddress = "0x728aC1b14774f5e141167C5c516c88296A5d8b9C"; // Replace with your contract address
const spacecraftAddress = "0x27eFb3387cdF5525FbCD63D1dDE98a144039746e";  // Replace with your spacecraft address

// Contract ABI (from your deployed contract)
const contractABI = [
  "function assignTask(string memory _description, uint256 _reward, address _spacecraftAddress, uint256 _priority) public"
];

// Function to connect to the deployed contract on Sepolia
const connectToContract = async () => {
  // Get signer (your Ethereum account)
  const [deployer] = await ethers.getSigners();
  console.log("Interacting with the contract using the account:", deployer.address);

  // Create an instance of the contract using ABI and contract address
  const contract = new ethers.Contract(contractAddress, contractABI, deployer);
  return contract;
};

// Function to assign tasks to spacecraft
const assignTask = async (description, reward, priority) => {
  const contract = await connectToContract();

  // Call the assignTask function from your deployed contract
  await contract.assignTask(description, reward, spacecraftAddress, priority);
  console.log(`Task assigned: ${description} with reward: ${reward} and priority: ${priority}`);
};

// Main function to assign multiple tasks to your fleet
const main = async () => {
  try {
    // Example: Assign "Explore New Planetary System"
    await assignTask("Explore New Planetary System", 5000, 7);

    // Example: Assign "Asteroid Mining Expedition"
    await assignTask("Asteroid Mining Expedition", 10000, 8);

    // Example: Assign "Satellite Network Deployment"
    await assignTask("Satellite Network Deployment", 1500, 6);

    // Add additional tasks as necessary...
    console.log("All tasks assigned successfully!");
  } catch (error) {
    console.error("Error interacting with contract:", error);
    process.exit(1);
  }
};

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
