import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const loginRequired =  (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json("you must be logged in");
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,"ameya",async (err,payload)=>{
        if(err){
        return res.status(401).json("you must be logged in");
        }

        const {_id} = payload;
        
        const userData = await User.findOne({_id:_id})
        if (!userData) {
            return res.status(401).json("User not found");
          }
        req.user = userData;
        next(); 
    })

}