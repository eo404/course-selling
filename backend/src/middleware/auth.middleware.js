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
                message:"Unauthorized"
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

export const requireRole = (role) => {
    return (req,res,next)=>{

        if(!req.user)
        {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const userRole  = req.user.role
        if(userRole !== role)
        {
            return res.status(403).json({
                message: "Forbidden"
            })
        }

        next();

    };
};