import type { RequestHandler } from "express";
import User from "../models/userSchema.js";

const adminAuth: RequestHandler = async (req,res,next) => {
    try {
        let user = await User.findById(req.user?.id).select("isAdmin")
        if(!user) return res.status(400).json({errors : [{msg: "Invalid Credentials"}]});

        if(user.isAdmin){
            next()
        }else{
            throw new Error("You shall not pass!!!")
        }
        
    } catch (error:any) {
        console.error(error.message)
        res.status(403).json({errors : [{errors : "Admin Auth Denied"}]})
    }
}

export default adminAuth