const UserModel = require("../models/users");

const register = async(req,res)=>{
    try{
        const {firstname,lastname,emailId,password} = req.body;
        const isEmailExists = await UserModel.find({emailId});
        if(isEmailExists.length!==0){
            return res.status(401).json({"message":"Email ID already exists"})
        }
        const userId  = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000
        const User =new UserModel({
            firstname,
            lastname,
            emailId,
            password,
            userId
        });
        await User.save();
        return res.status(200).json({"message":"User created sucessfully",userId,lastname,firstname});
    }catch(error){
        console.log(error);
        return res.status(500).json({"message":"Something went wrong"})
    }
}

const login = async(req,res,next)=>{
    try{
        const {emailId,password} = req.body;
        const user = await UserModel.findOne({emailId});
        if(!user){
            return res.status(401).json({"message":"User Not Found"})
        }
        if (user.password !== password){
            return res.status(401).json({"message":"Invalid Credentials"});
        }
        return res.status(200).json({
            userId:user.userId,
            lastname:user.lastname,
            firstname:user.firstname
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({"message":"Something went wrong"})
    }
}

module.exports.register = register;
module.exports.login = login;