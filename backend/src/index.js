import express from "express"
import cookieparser from "cookie-parser"
import problemRoutes from "./routes/problem.routes.js"
import authRoutes from "./routes/auth.routes.js";
import executionRoutes from "./routes/executeCode.route.js";     
import dotenv from "dotenv"
dotenv.config();    
const app=express();

app.use(express.json());
app.use(cookieparser());
app.get("/",(req,res)=>{
    res.send("welcome to leetlab");
})

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/problems",problemRoutes);
app.use("/api/v1/execute-code", executionRoutes);
app.listen(process.env.PORT,()=>console.log("server started at port",process.env.PORT));


