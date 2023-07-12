import User from "../models/user.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signup = async (req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.json({error:"Please enter all the fileds"});
    }
    try{
    const savedUser = await User.findOne({email:email})
        if(savedUser){
        return res.json({error:"User already exist"})

        }
    }
    catch(err){
        console.log(err)
    }
   const hashedPassword = bcrypt.hashSync(password,process.env.HASH)
    const user = new User({
        name,
        email,
        password:hashedPassword
    })
    user.save()
    .then(()=>{
        res.json({message:"User saved successfully"});
        res.redirect('/dashboard');
    })
    .catch((err)=>{
        console.log(err);
    })

}


export const login = async (req,res)=>{
    const {name,email,password} = req.body;
    if(  !email || !password){
        res.json({error:"Please enter all the fileds"});
    }
    
    try{
       const loginUser = await User.findOne({email:email});
       if(!loginUser){
        return res.json({error:"User doesnt exist"})
       }
       const passwordCheck = loginUser.password;
       const match = bcrypt.compareSync(password,passwordCheck);
       if(match){
        const token = jwt.sign({_id:loginUser._id},process.env.TOKEN_SECRET)
        res.json(token); 
       }
       else{
        res.json({error:"Invalid password"});

       }
    }catch(err){
        console.log(err);
    }
}