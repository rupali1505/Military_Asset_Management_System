const express = require("express");
const env = require("dotenv");
env.config();
const cors = require("cors");
const mongoose = require("mongoose");



const server = express();
server.use(cors());
server.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to mongodb database")
}).catch((error)=>{console.log(error)})

const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log("server is listening on Port", PORT);
})