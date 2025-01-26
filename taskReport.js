const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Interacting with the contract using the account:", deployer.address);

  // Replace with your contract address
  const contractAddress = "0xbA782bfA7fCf807DBCbCf5D53494e607af1fe680";  // Your contract address
  const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "taskId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "spacecraftAddress",
          "type": "address"
        }
      ],
      "name": "TaskCompleted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_reward",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_spacecraftAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_priority",
          "type": "uint256"
        }
      ],
      "name": "assignTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_taskId",
          "type": "uint256"
        }
      ],
      "name": "completeTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTaskCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_taskId",
          "type": "uint256"
        }
      ],
      "name": "getTaskDetails",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "enum AutonomousSpaceFleet.TaskStatus",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_taskId",
          "type": "uint256"
        }
      ],
      "name": "getTaskStatus",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "enum AutonomousSpaceFleet.TaskStatus",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "taskCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tasks",
      "outputs": [
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "reward",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "spacecraftAddress",
          "type": "address"
        },
        {
          "internalType": "enum AutonomousSpaceFleet.TaskStatus",
          "name": "status",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "priority",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_taskId",
          "type": "uint256"
        },
        {
          "internalType": "enum AutonomousSpaceFleet.TaskStatus",
          "name": "_status",
          "type": "uint8"
        }
      ],
      "name": "updateTaskStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];


  const contract = new ethers.Contract(contractAddress, contractABI, deployer);

  // Get the total number of tasks from the contract
  const taskCount = await contract.getTaskCount();
  console.log(`Total number of tasks: ${taskCount}`);

  // Loop through all task IDs and fetch details for each task
  for (let taskId = 1; taskId <= taskCount; taskId++) {
    const [description, reward, spacecraftAddress, status, priority] = await contract.getTaskDetails(taskId);
    const statusString = (status === 0) ? "Not Started" : (status === 1) ? "In Progress" : "Completed";

    // Generate a report based on the task description
    let taskReport = "";

    switch (taskId) {
      case 1:
        taskReport = "Asteroid dust was quite coarse and opaque, but valuable for future research.";
        break;
      case 2:
        taskReport = "The communication relay was damaged beyond repair, requiring a full system replacement.";
        break;
      case 3:
        taskReport = "The space dust samples contained unusual metallic properties, potentially from an asteroid.";
        break;
      case 4:
        taskReport = "Exploring the gas giant revealed surprising signs of life, potentially microbial in nature.";
        break;
      default:
        taskReport = "No detailed report available for this task.";
    }

    // Output the task details
    console.log(`\nTask ID ${taskId}:`);
    console.log(`Description: ${description}`);
    console.log(`Reward: ${ethers.formatEther(reward)} ETH`);
    console.log(`Spacecraft Address: ${spacecraftAddress}`);
    console.log(`Status: ${statusString}`);
    console.log(`Priority: ${priority}`);
    console.log(`Task Report: ${taskReport}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
