
const express = require('express');
const { ethers } = require('hardhat');
const bodyParser = require('body-parser');
const cron = require('node-cron');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Contract Address and ABI
const contractAddress = '0x23f3aeD41962E2Abe29fEA40D7478D0f2f09E6be';
const contractABI = [/* ABI array */];  // Your ABI stays the same

// Helper to get contract instance
async function getContract() {
    const provider = new ethers.JsonRpcProvider(process.env.INFURA_SEPOLIA_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
}

// API to assign a task
app.post('/assign-task', async (req, res) => {
    const { description, reward, spacecraftAddress, priority } = req.body;

    if (!description || !reward || !spacecraftAddress) {
        return res.status(400).send("Missing required fields");
    }

    const contract = await getContract();

    try {
        const tx = await contract.assignTask(description, reward, spacecraftAddress, priority);
        await tx.wait();
        res.send('Task Assigned!');
    } catch (error) {
        res.status(500).send('Error assigning task: ' + error.message);
    }
});

// API to update task status
app.post('/update-task-status', async (req, res) => {
    const { taskId, status } = req.body;

    if (!taskId || status === undefined) {
        return res.status(400).send('Task ID or status not provided.');
    }

    const contract = await getContract();

    try {
        const tx = await contract.completeTask(taskId);
        await tx.wait();
        res.send('Task status updated!');
    } catch (error) {
        res.status(500).send('Error updating task status: ' + error.message);
    }
});

// Cron job to monitor tasks
cron.schedule('*/10 * * * *', async () => {
    const contract = await getContract();
    const taskCount = await contract.taskCount();

    for (let i = 1; i <= taskCount; i++) {
        const task = await contract.tasks(i);

        if (task.completed === false) {
            console.log(`Reminder: Task #${i} "${task.description}" is still pending.`);
        }
    }
});

// Exporting the app directly for serverless
module.exports = app;  // Vercel will handle it as a serverless function


