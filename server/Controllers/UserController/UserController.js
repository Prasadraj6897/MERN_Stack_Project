import Users from "../../Models/Users/UserModels.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {sendMail} from '../../UserMail/UserMail.js'

import dotenv from 'dotenv'
dotenv.config();



const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRECT, {expiresIn: "15m"})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRECT, {expiresIn: "7h"})
}


const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRECT, {expiresIn: "1d"})
}


export const signUpController = async (req, res)=>{
    //, role, contactNumber, profilePicture
    // console.log(req.body)
    const { firstName, lastName, gender, DOB, Location, email, password, ConfirmPassword} = req.body

    try{
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
            email: email, firstName: firstName, password: hashedPassword, lastName: lastName, gender:gender, DOB:DOB,Location: Location, ConfirmPassword: ConfirmPassword
        }

        const activation_token =  createActivationToken(newUser)
        
        const url = `${process.env.CLIENT_URL}/user/activate/${activation_token}`
        
        // console.log("1")
        sendMail(email, url, "verify your Email Address")

        res.json({msg: "Register Success! Please activate your email to start"})

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

        const {firstName, email, password, lastName, gender, DOB, Location, ConfirmPassword} = user

        const check = await Users.findOne({email})

        if(check)
        {
            return res.status(400).json({message : "This mail already exists"})
        }

        const newUser = new Users({
            firstName, email, password, lastName, gender, DOB, Location, email, password, ConfirmPassword
        })

        await newUser.save()

        res.json({msg : "Account has been activated"})
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
            return res.status(404).json({message : "User doesn't Exist"})
        }

        const isPasswordcorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordcorrect){
            return res.status(400).json({message : "Password doesn't Match"})
        }
        
        if(existingUser.role != 'user'){
            return res.status(400).json({message : "You have no access"})
        }

        const token = jwt.sign({email: existingUser.email, id: existingUser._id, role: existingUser.role}, 'test', {expiresIn: "1d"})

        //created cookie
        res.cookie('token', token, {expiresIn: "1d"})

        return res.status(200).json({result:existingUser, token})

    }
    catch(error){
       
       return res.status(500).json({message : "Something went wrong"})
    }
}