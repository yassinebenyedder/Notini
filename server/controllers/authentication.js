const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try{
          const {username,email,password}=req.body;
       if(!username||!email|| !password || password.length<8 || username.length<4){
        return res.status(400).json({message:"username email and password are missing or too short"});
       }
    const user=await userModel.findOne({email});
    if(user){
        return res.status(400).json({message:"user already exist"});
    }else{
        const hashedpassword=bcrypt.hashSync(password,10);
        const newuser=new userModel({username,email,password:hashedpassword });
        await newuser.save();
        return res.status(201).json({message:"user created"});
    }
    }catch(error){
        console.error(error);   
        return res.status(500).json({ message: "Server error" });
    }
  };

  exports.login = async (req,res)=>{
    try{
           const {email,password}=req.body;
     const user=await userModel.findOne({email});
     if(!user){
        return res.status(400).json({message:"email or password incorrect"});
     }else{
        const ispasswordvalid=await bcrypt.compare(password,user.password);
        if(!ispasswordvalid){
            return res.status(400).json({message:"email or password incorrect"});
        }else{
            const token=jwt.sign({id:user._id,username:user.username},process.env.JwtSecret,{
                expiresIn:"1h"
            });
            return res.status(201).json({token,username:user.username,id:user._id});
        }
     }
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
  }