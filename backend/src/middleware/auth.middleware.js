import jwt from "jsonwebtoken";
export const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader){
        return res.status(401).json({ message: "No token provided" });
    }
    const parts  = authHeader.split(" ");
    if(parts[0]!== "Bearer"||!parts[1])
    {
        return res.status(401).json(
            {
                message:"Unathorized"
            }
        )
    }
    const token = parts[1];
    try 
    {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error)
    {
        return res.status(401).json(
            {
                message: "Unauthorized"
            }
        )
    }
};