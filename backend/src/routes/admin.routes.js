import {Router} from "express";

const router = Router();

app.post("/Login",(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
});

export default app;