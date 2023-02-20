const { UserModel } = require("../Model/user.model");


const duplicate = async (req,res,next)=>{
    console.log("hello")
    const { email } = req.body
    try{
        const duplicate = await UserModel.find({email});
        if(duplicate.length>0)
        {
            res.send("User already registered");
        }
        else{
            next();
        }
    }
    catch(err){
        res.send("Something went wrong")
    }
}


module.exports = {
    duplicate
}