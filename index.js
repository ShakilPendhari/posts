const express = require("express");

const app = express();

const cors = require("cors");
const { connection } = require("./Config/db");
const { userRouter } = require("./routes/user.routes");
const { authentication } = require("./Middleware/authentication.middleware");
const { postRouter } = require("./routes/post.routes");
const { duplicate } = require("./Middleware/duplicateuser");
app.use(express.json())
require("dotenv").config();

app.use(cors());

app.use("/users",userRouter);

app.get("/",(req,res)=>{
    res.end("Welcome to home page")
})

app.use(authentication);

app.use("/posts",postRouter);

app.listen(process.env.PORT, async ()=>{
    try{
        await connection;
        console.log("DB is connected to the server");
    }
    catch(err){
        console.log("DB is cannot connet to the server",err)
    }
    console.log(`Server is running at the port ${process.env.PORT}`)
})



