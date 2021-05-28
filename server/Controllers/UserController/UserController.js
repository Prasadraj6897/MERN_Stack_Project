import Users from "../../Models/Users/UserModels.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {sendMail} from '../../UserMail/UserMail.js'

import dotenv from 'dotenv'
dotenv.config();


// for signup after mail verrify
const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRECT, {expiresIn: "15m"})
}

//after getting access token
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRECT, {expiresIn: "7h"})
}

//for login verify
const createRefreshToken = (payload) => {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRECT, {expiresIn: "1d"})

}


export const signUpController = async (req, res)=>{
    //, role, contactNumber, profilePicture
    // console.log(req.body)
    const { firstName, lastName, gender, DOB, Location, email, password, ConfirmPassword, contactNumber} = req.body

    try{
        if(!firstName || !lastName || !email || !password || !ConfirmPassword)
        {
            return res.status(400).json({msg: "Please fill in all fields."})
        }
        

        const existingUser = await Users.findOne({email})
        if(existingUser){
            return res.status(400).json({message : "User already Exist"})
        }
        if(password != ConfirmPassword)
        {
            return res.status(400).json({message : "Passwords Doesn't match"})
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // const result = await Users.create({ firstName, lastName, email, password: hashedPassword, ConfirmPassword, gender, DOB, Location, role:'user'})

        const newUser = {
            email: email, firstName: firstName, password: hashedPassword, lastName: lastName,
             gender:gender, DOB:DOB,Location: Location, ConfirmPassword: ConfirmPassword,
             contactNumber: contactNumber
        }

        const activation_token =  createActivationToken(newUser)
        
        const url = `${process.env.CLIENT_URL}/user/activate/${activation_token}`
        
        
        sendMail(email, url, "verify your Email Address")

        res.json({message: "Register Success! Please activate your email to start"})

        // return res.status(200).json({result, activation_token})
    }
    catch(error){
    
        return res.status(400).json({message:error.message})
    }
}

export const activateEmail = async(req, res) => {
    try{
        const {activation_token} = req.body;

        const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRECT)

        const {firstName, email, password, lastName, gender, DOB, Location, ConfirmPassword, contactNumber} = user

        const check = await Users.findOne({email})

        if(check)
        {
            return res.status(400).json({message : "This mail already exists"})
        }

        const newUser = new Users({
            firstName, email, password, lastName, gender, DOB, Location, email, password, ConfirmPassword, contactNumber
        })

        await newUser.save()

        res.json({message : "Account has been activated"})
    }
    catch(error)
    {

    }
}

export const signInController = async (req, res)=>{
    const {email, password} = req.body
    // console.log(email, password)
    try{
        const existingUser = await Users.findOne({email})
        if(!existingUser){
            return res.status(404).json({message : "This Email doesn't Exist"})
        }

        const isPasswordcorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordcorrect){
            return res.status(400).json({message : "Password doesn't Match"})
        }
        
       
        const refresh_token = createRefreshToken({id:existingUser._id, email:existingUser.email})
        // const token = jwt.sign({email: existingUser.email, id: existingUser._id, role: existingUser.role}, 'test', {expiresIn: "1d"})

        res.cookie('refresh_token', refresh_token,{
            httpOnly: true,
            path: '/users/refresh_token',
            maxAge: 7*24*60*60*1000, // 7 Days validity
        })
    
        
        

        res.status(200).json({message: "Login Successful"})

    }
    catch(error){
       
       return res.status(500).json({message : "Something went wrong"})
    }
}

export const getAccessTokenController = async (req, res)=>{

    try{
        const rf_token = req.cookies.refresh_token
        // console.log(rf_token)
        if(!rf_token){
            return res.status(500).json({message : "Please Login Now"})
        }
        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRECT, (err, user) => {
            if(err){
                return res.status(500).json({message : "Please Login Now"})
            }
            const access_token = createAccessToken({id:user.id})

            res.json({access_token})
        })
    }
    catch(error){
       
       return res.status(500).json({message : "Something went wrong"})
    }
}

export const ForgetPasswordController = async (req, res)=>{
    const {email} = req.body
    try{
        const existingUser = await Users.findOne({email})
        if(!existingUser){
            return res.status(404).json({message : "This Email doesn't Exist"})
        }
        const access_token = createAccessToken({id:existingUser._id})

        const url = `${process.env.CLIENT_URL}/user/activate/${access_token}`        
        
        sendMail(email, url, "Reset Password")

        res.json({message : "Please Check your mail"})
    }
    catch(error){
       
       return res.status(500).json({message : "Something went wrong"})
    }
}

export const ResetPasswordController = async (req, res)=>{
    const {password} = req.body
    try{
        
        const passwordHash = await bcrypt.hash(password, 12)

        await Users.findOneAndUpdate({_id: req.user.id},{
            password: passwordHash,
            ConfirmPassword: password
        })
        res.json({message : "Password Successfully changed"})
    }
    catch(error){
       
       return res.status(500).json({message : "Something went wrong"})
    }
}

export const getUserInfoController = async (req, res)=>{
        
        try{
            
            const user = await Users.findById(req.user.id).select('-password')
    
            
            res.status(200).json({user})
        }
        catch(error){
           
           return res.status(500).json({message : "Something went wrong"})
        }
}

export const getALLUserInfoController = async (req, res)=>{
        
    try{
        
        const users = await Users.find({})

        
        res.json({users})
    }
    catch(error){
       
       return res.status(500).json({message : "Something went wrong"})
    }
}

export const LogoutController = async (req, res)=>{
        
    try{
        
        res.clearCookie('refresh_token', {path: '/users/refresh_token'},)

        
        return res.json({message : "Logged Out"})
    }
    catch(error){
       
       return res.status(500).json({message : "Something went wrong"})
    }
}

export const UpdateUserInfoController = async (req, res)=>{
        
    try{
        
        const {firstName, lastName, avatar} = req.body

        await Users.findByIdAndUpdate({_id: req.user.id}, {
            firstName, lastName, avatar
        })

        
        res.json({message : "Updated SuccessFully"})
    }
    catch(error){
       
       return res.status(500).json({message : "Something went wrong"})
    }
}

export const UpdateUserRoleController = async (req, res)=>{
        
    try{
        
        const {role} = req.body

        await Users.findByIdAndUpdate({_id: req.params.id}, {
            role
        })

        
        res.json({message : "Role Updated SuccessFully"})
    }
    catch(error){
       
       return res.status(500).json({message : "Something went wrong"})
    }
}

export const DeleteUserController = async (req, res)=>{
        
    try{

        await Users.findByIdAndDelete(req.params.id)
        
        res.json({message : "Deleted SuccessFully"})
    }
    catch(error){
       
       return res.status(500).json({message : "Something went wrong"})
    }
}