const express = require("express");
const app = express();
const signupRoute = require("./Routes/user");
const connectMongdb = require("./db/db");
require('dotenv').config();
const PORT = process.env.PORT;
const forgotPassword = require("./Routes/forgotpassword");

app.get("/",(res,req)=>{
    return req.send("Hello world");
})
connectMongdb();
app.use(express.json());
app.use("/api",signupRoute);
app.use("/api",forgotPassword);

app.listen(PORT,()=>{
    console.log(`Server Started at PORT: ${PORT}`);
})

