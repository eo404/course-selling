import express from "express";
import adminRouter from "./routes/admin.routes.js"

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({
        message:"Backend is running"
    })
});

app.use("/api/admin",adminRouter);
app.use("/api/courses",courseRouter);

export default app;

