// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract AutonomousSpaceFleet {

    // Define task status enum
    enum TaskStatus { NotStarted, InProgress, Completed }

    struct Task {
        string description;
        uint256 reward;
        address spacecraftAddress;
        TaskStatus status;
        uint256 priority; // Priority level (1-10)
    }

    mapping(uint => Task) public tasks;  // Mapping to track tasks by ID
    uint public taskCount;  // Task counter

    // Log task completion
    event TaskCompleted(uint taskId, address spacecraftAddress);

    // Assign a task to a spacecraft with priority
    function assignTask(string memory _description, uint256 _reward, address _spacecraftAddress, uint256 _priority) public {
        require(_priority >= 1 && _priority <= 10, "Priority must be between 1 and 10");

        taskCount++;
        tasks[taskCount] = Task({
            description: _description,
            reward: _reward,
            spacecraftAddress: _spacecraftAddress,
            status: TaskStatus.NotStarted,  // Initially, the task is not started
            priority: _priority
        });
    }

    // Complete a task (autonomously)
    function completeTask(uint _taskId) public {
        Task storage task = tasks[_taskId];
        require(msg.sender == task.spacecraftAddress, "Only assigned spacecraft can complete the task");
        require(task.status != TaskStatus.Completed, "Task already completed");

        task.status = TaskStatus.Completed;

        // Log the completion on the blockchain
        emit TaskCompleted(_taskId, msg.sender);
    }

    // Update the task status (e.g., mark as in progress)
    function updateTaskStatus(uint _taskId, TaskStatus _status) public {
        Task storage task = tasks[_taskId];
        require(msg.sender == task.spacecraftAddress, "Only assigned spacecraft can update the status");
        require(task.status != TaskStatus.Completed, "Task already completed");
        
        task.status = _status;  // Update the task status
    }

    // Get task status
    function getTaskStatus(uint _taskId) public view returns (string memory, TaskStatus) {
        Task memory task = tasks[_taskId];
        return (task.description, task.status);
    }

    // Get the count of tasks
    function getTaskCount() public view returns (uint) {
        return taskCount;
    }

    // Get task details
    function getTaskDetails(uint _taskId) public view returns (string memory, uint256, address, TaskStatus, uint256) {
        Task memory task = tasks[_taskId];
        return (task.description, task.reward, task.spacecraftAddress, task.status, task.priority);
    }
}
