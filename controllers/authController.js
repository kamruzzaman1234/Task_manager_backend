const User = require('../models/Users');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const generateToken = (userId) =>{
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: "7d"})
}

const registerUser = async(req, res)=>{
    try{
        const {name, email, password, profileImageUrl, adminInviteToken} = req.body
        const UserExit = await User.findOne({email});

        if(UserExit){
            return res.status(400).json({message: "User already exits"})
        }

        let role = "member";
        if(adminInviteToken && adminInviteToken == process.env.ADMIN_INVITE_TOKEN){
            role = "admin"
        }
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password, salt);

        // create user
        const user = await User.create({
            name, email, password:hasedPassword, profileImageUrl, role
        });

        res.status(201).json({
            _id:user._id,
            name: user.name,
            email:user.email,
            password: user.password,
            role:user.role,
            profileImageUrl:user.profileImageUrl,
            token:generateToken(user._id)
        });



    }catch(error){
        res.status(500).json({message: "Server error" , error: error.message})
    }
}

const loginUser = async (req, res)=>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email})
        // jodi user na thake tokhon
        if(!user){
            return res.status(401).json({message: "Invalid email or password"})
        }

        // jodi password match na hoy
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({message: "Invalied email or password"})
        }

        res.json({
            _id: user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            password:user.password,
            profileImageUrl:user.profileImageUrl,
            token:generateToken(user._id)
        })

    }catch(error){
        res.status(500).json({message: "Server error" , error: error.message})
    }
}   

const getProfileUser = async(req,res)=>{
    try{

    }catch(error){
        res.status(500).json({message: "Server error" , error: error.message})
    }
}

const updateProfileUser = async(req,res)=>{
    try{

    }catch(error){
        res.status(500).json({message: "Server error" , error: error.message})
    }
}

module.exports = {generateToken,registerUser, loginUser, getProfileUser, updateProfileUser }