const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const router = express.Router();

router.post("/signup", async function(req,res) {
  console.log(req.body);
  try {
    const {name,password,email,role } = req.body;

    // const existingUser = await userModel.findOne({email});
    // if(existingUser){
    //   return res.json({
    //     message:"user already exists",
    //     error: "User already exists"
    //   })
    // }
    let roleData;
    if (role) {
      roleData = await DB.ROLE.findOne({ role: role });
      if (!roleData) {
        return res.status(400).json({
          message: "Please provide valid role",
        });
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10); 
console.log("hashedPassword",hashedPassword);
    const response = await userModel.create({
      name,
      password:hashedPassword,
      email,
      role: roleData?._id,
    })
    console.log("response",response);
 const token = jwt.sign(
      { userId: response._id, role: role },
      process.env.JWT_SECRET
    );    console.log("token",token);
    return res.json({
      message:"user registered successfully",
      res:response,
    })
  } catch (error) {
    return res.json({
      message:"something went wrong",
      error:error,
    })
  } 
});

router.post("/signin", async function (req, res) {
  console.log("Signin request body:", req.body);
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.json({
        message: "Email and password are required"
      });
    }
    
    const user = await userModel.findOne({ email });
  
    if (!user) {
      return res.json({
        message: "user not found"
      });
    }
    
    console.log("Input password:", password);
    console.log("DB HASH:", user.password);    
    const isMatch = await bcrypt.compare(password,user.password);        
    if (!isMatch) {
      return res.json({
        message: "password is incorrect"
      })
    }
    const token = jwt.sign({ userId:user._id },process.env.JWT_SECRET)
    res.json({
      message: "signin successful",
      token: token
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.json({ 
      message: "something went wrong",
      error: error.message
    });
  }
});

module.exports = router;