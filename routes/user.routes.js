const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../Model/user.model");
const jwt = require("jsonwebtoken");
const app = express();

const userRouter = express.Router();


userRouter.post("/login", async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await UserModel.find({email});
              if(user.length>0)
              {
                bcrypt.compare(password, user[0].password, async (err, result)=> {
                    if(result){
                        const token = jwt.sign({userID:user[0]._id}, 'evalution04');
                        res.send({"msg":"Login Successful","token":token});
                    }
                    else{
                        res.send({"msg":"Something went wrong"})
                      }
                 });
               
              }
              else{
                res.send({"msg":"Wrong Credentials"})
              }
      
    }
    catch(err){
        res.send({"msg":"Something went wrong","Error":err})
    }
})

userRouter.post("/register", async (req,res,next)=>{

     


    const { name,email,gender,password,age,city } = req.body;

    try{
        const user = await UserModel.find({email});
              if(user.length>0)
              {
               res.send("User already exist")
              }
              else{

                bcrypt.hash(password, 5, async (err, hash)=> {
                    if(err){
                        res.send({"msg":"Something went wrong","Error":err})
                    }
                    else{
                          const user = new UserModel({name,email,gender,password:hash,age,city});
                          await user.save();
                          res.send("Your Details has been registered");
                    }
                });
               
              }
      
    }
    catch(err){
        res.send({"msg":"Something went wrong","Error":err})
    }
});




module.exports = {
    userRouter
}