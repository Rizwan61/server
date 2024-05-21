const express = require("express");
const app = express();
const cors = require("cors")
const path = require("path");

const mongoose = require("mongoose")

const PostRoutes = require("./routes/Routes")




// middel weare 
app.use(express.json())
app.use(cors());
app.use(express.static(path.join(__dirname, "uploads")));



app.get('/',(req,res)=>{

    res.send("server is live")

}),


app.use("/api", PostRoutes)



mongoose.connect('mongodb://127.0.0.1:27017/testing')
  .then(() =>{
    app.listen("4002"),()=>{
        console.log("Server is working")
    }
  })