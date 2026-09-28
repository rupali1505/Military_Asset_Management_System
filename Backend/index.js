const express = require("express");
const env = require("dotenv");
env.config();
const cors = require("cors");
const mongoose = require("mongoose");
const userAuthRoutes = require("./Router/userAuth.routes");
const purchaseRoutes = require("./Router/purchase.routes");
const baseRoutes = require("./Router/base.routes");
const equipmentTypeRoutes = require("./Router/equipmentType.routes")
const transferRoutes = require("./Router/transfer.routes");
const assignmentRoutes = require("./Router/assignment.routes");
const expenditureRoutes = require("./Router/expenditure.routes");
const dashboardRoutes = require("./Router/dashboard.routes");
const transactionLogRoutes = require("./Router/transaction.routes")



const server = express();
server.use(cors());
server.use(express.json())

server.use("/api/auth" ,userAuthRoutes);
server.use("/api/purchases",purchaseRoutes);
server.use("/api/base",baseRoutes);
server.use("/api/equipmentType", equipmentTypeRoutes);
server.use("/api/transfers", transferRoutes);
server.use("/api/assignments", assignmentRoutes);
server.use("/api/expenditures", expenditureRoutes);
server.use("/api/dashboard", dashboardRoutes);
server.use("/api/logs", transactionLogRoutes);

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to mongodb database")
}).catch((error)=>{console.log(error)})

const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log("server is listening on Port", PORT);
})