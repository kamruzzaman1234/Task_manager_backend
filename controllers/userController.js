const Task = require('../models/Task');
const User = require('../models/Users');
const bcrypt = require('bcryptjs');

const getUsers = async(req,res)=>{
    try{
        const user = await User.find({ role : "member" }).select("-password")

        // Add task count to each each user
        const userWithTaskCounts = await Promise.all(user.map(async(user)=>{
            const pendingTasks = await Task.countDocuments({assignedTo: user._id, status: "Pending"});
            const inProgressTasks = await Task.countDocuments({assignedTo: user._id, status: "In Progress"});
            const inCompletedTasks = await Task.countDocuments({assignedTo: user._id, status: "Completed"});

            return{
            ...user._doc,
            pendingTasks,
            inProgressTasks,
            inCompletedTasks
            
        }
        })) 
        res.json(userWithTaskCounts) 

    }catch(error){
        res.status(500).json({message: "server error", error: error.message})
    }
}

const getUserById = async (req, res)=>{
    try{
        const user = await findById(req.params.id).select("-password")
        if(!user)return res.status(404).json({message: "User not found"})
        res.json(user)

    }catch(error){
        res.status(500).json({message: "server error", error: error.message})
    }
}

const deleteUser = async(req,res)=>{
    try{

    }catch(error){
        res.status(500).json({message: "server error", error: error.message})
    }
}

module.exports = {getUsers, getUserById, deleteUser}