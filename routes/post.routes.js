const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../Model/user.model");
const { PostModel } = require("../Model/post.model");

const postRouter = express.Router();

postRouter.post("/", async (req,res)=>{
   const payload = req.body;
    try{
        const post = new PostModel(payload);
        await post.save();
        res.send("Data updated")
    }
    catch(err){
        res.send({"msg":"Something went wrong","Error":err})
    }
});

postRouter.get("/top", async (req,res)=>{
    const query = req.query;
    try{
        const post = await PostModel.find(query)
        res.send(post)
    }
    catch(err){
        res.send({"msg":"Something went wrong","Error":err})
    }
});

postRouter.put("/update/:id", async (req,res)=>{
    const payload = req.body;
    const id = req.params.id
    try{
              const user = await PostModel.findByIdAndUpdate({_id:id},payload);
              res.send("Post updated")
    }
    catch(err){
              res.send({"msg":"Something went wrong","Error":err})
    }
})


postRouter.delete("/delete/:id", async (req,res)=>{
    const id = req.params.id
        try{
              const user = await PostModel.findOneAndDelete({_id:id});
               res.send("Post has been deleted");
    }
    catch(err){
        res.send({"msg":"Something went wrong","Error":err})
    }
})




module.exports = {
    postRouter
}