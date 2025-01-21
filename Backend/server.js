const express = require("express");
const app = express();
const PORT = 3000;



app.get("/",(res,req)=>{
    return req.send("Hello world");
})

app.listen(PORT,()=>{
    console.log(`Server Started at PORT: ${PORT}`);
})