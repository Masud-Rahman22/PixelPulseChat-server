const asyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken')
const User = require('../models/userModel')
const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password,pic} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please Enter All The Fields")
    }

    const userExits = await User.findOne({email})

    if(userExits){
        res.status(400)
        throw new Error("User Already Exits");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        })
    }
    else{
        res.status(400)
        throw new Error("Failed to create user");
    }
})


const authUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        })
    }else{
        res.status(401)
        throw new Error("Invalid email or password")
    }
})

const allUsers = asyncHandler(async(req,res)=>{
    const keyword = req.query
    console.log(keyword)
})

module.exports = {registerUser, authUser, allUsers}