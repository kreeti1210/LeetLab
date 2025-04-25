import express from "express"
import cookieparser from "cookie-parser"

import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv"
dotenv.config();    
const app=express();

app.use(express.json());
app.use(cookieparser());
app.get("/",(req,res)=>{
    res.send("welcome to leetlab");
})

app.use("/api/v1/auth",authRoutes);
app.listen(process.env.PORT,()=>console.log("server started at port",process.env.PORT));


