import {Routes} from "express";
import userSchema from "../validations/user.validation.js"

const router = Router();


router.post("/api/userSignUp",async(req,res)=>{
    try
    {
        const result  = userSchema.safeParse(req.body);
        if(!result.success)
        {
            return res.status(404).json(
                {
                    message:"Validation Failed",
                    error: result.error.issues
                }
            );
        };
        const {username,email,password} = result.data;
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});