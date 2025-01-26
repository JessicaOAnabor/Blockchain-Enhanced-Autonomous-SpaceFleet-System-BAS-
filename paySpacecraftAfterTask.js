const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Interacting with the contract using the account:", deployer.address);

  const contractAddress = "0xbA782bfA7fCf807DBCbCf5D53494e607af1fe680";
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

  const taskId = 1; // Example task ID to complete and pay

  const [description, reward, spacecraftAddress, status, priority] = await contract.getTaskDetails(taskId);
  const statusString = (status === 0) ? "Not Started" : (status === 1) ? "In Progress" : "Completed";

  if (status === 2) { // If task is completed
    console.log(`Task ${taskId} is complete. Transferring reward...`);
    const tx = await deployer.sendTransaction({
      to: spacecraftAddress,
      value: reward
    });
    await tx.wait();
    console.log(`Reward of ${ethers.utils.formatEther(reward)} ETH sent to spacecraft ${spacecraftAddress}`);
  } else {
    console.log(`Task ${taskId} is not completed yet.`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

