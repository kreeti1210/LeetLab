import express from "express"
import cookieparser from "cookie-parser"
import problemRoutes from "./routes/problem.routes.js"
import authRoutes from "./routes/auth.routes.js";
import executionRoutes from "./routes/executeCode.route.js";   
import submissionRoutes from "./routes/submission.routes.js";
import playlistRoutes from "./routes/playlist.routes.js"
import cors from "cors"
import dotenv from "dotenv"

import healthcheckRoutes from "./routes/healthcheck.route.js";
dotenv.config();    
const app=express();


app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: process.env.VERCEL_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    exposedHeaders: ["Set-Cookie", "*"],
  })
);
app.get("/",(req,res)=>{
    res.send("welcome to leetlab");
})

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/problems",problemRoutes);
app.use("/api/v1/execute-code", executionRoutes);
app.use("/api/v1/submission", submissionRoutes);
app.use("/api/v1/playlist", playlistRoutes);
app.use("/api/v1/health-check", healthcheckRoutes);
app.listen(process.env.PORT,()=>console.log("server started at port for leetlab",process.env.PORT));


// const keepAlive = () => {
//   setInterval(async () => {
//     try {
//       const res = await axios.get(
//         '${import.meta.env.VITE_BACKEND_URL}/api/v1/health-check',
//         {
//           timeout: 4000,
//         }
//       );
//       console.log("✅ Ping successful:", res.status);
//     } catch (error) {
//       console.warn("⚠️ Ping failed:", error.message);
//     }
//   }, 1000 * 60 * 10); // every 10 minutes
// };

// keepAlive();


