const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Interacting with the contract using the account:", deployer.address);

  // Contract address and ABI (directly included)
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

  // Task data (multiple tasks to assign)
  const tasks = [
    {
      description: "Explore asteroid belt",
      reward: ethers.parseEther("1"),  // 1 ether
      spacecraftAddress: deployer.address,  // Use deployer's address or different address for spacecraft
      priority: 5
    },
    {
      description: "Repair communication relay",
      reward: ethers.parseEther("0.5"), // 0.5 ether
      spacecraftAddress: deployer.address,  // Use deployer's address or a different spacecraft address
      priority: 3
    },
    {
      description: "Collect space dust samples",
      reward: ethers.parseEther("2"),  // 2 ether
      spacecraftAddress: deployer.address,  // Use deployer's address or a different spacecraft address
      priority: 7
    },
    {
      description: "Map the surface of Mars",
      reward: ethers.parseEther("5"),  // 5 ether
      spacecraftAddress: deployer.address,  // Use deployer's address or a different spacecraft address
      priority: 10
    }
  ];

  // Loop over the tasks array and assign each task
  for (let task of tasks) {
    const { description, reward, spacecraftAddress, priority } = task;
    console.log(`Assigning task: ${description} with reward: ${reward.toString()} wei`);

    // Assign the task
    const tx = await contract.assignTask(description, reward, spacecraftAddress, priority);
    await tx.wait();
    console.log(`Task "${description}" assigned successfully!`);

    // Fetch the updated task count (task ID) after assignment
    const taskCount = await contract.taskCount();
    console.log(`The last assigned task ID is: ${taskCount.toString()}`);

    // Fetch task details using taskCount (task ID)
    const [taskDescription, taskReward, taskSpacecraftAddress, taskStatus, taskPriority] = await contract.getTaskDetails(taskCount);
    console.log(`Task ID ${taskCount} details - Description: ${taskDescription}, Status: ${taskStatus}, Spacecraft Address: ${taskSpacecraftAddress}, Reward: ${taskReward.toString()}, Priority: ${taskPriority}`);

    // Ensure the task is not already completed before updating its status
    if (taskStatus === 2) {  // 2 corresponds to TaskStatus.Completed
      console.log(`Task ID ${taskCount} is already completed. Skipping status update.`);
    } else {
      // Update the status to 'NotStarted' for each assigned task
      const statusNotStarted = 0; // TaskStatus.NotStarted = 0
      const updateTx = await contract.updateTaskStatus(taskCount, statusNotStarted);
      await updateTx.wait();
      console.log(`Task ID ${taskCount} status updated to 'NotStarted'!`);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
