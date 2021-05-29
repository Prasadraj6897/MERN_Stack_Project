import mongoose from 'mongoose'
// import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    firstName :{
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    lastName :{
        type: String,

        trim: true,
        min: 3,
        max: 20,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],

    },
    DOB: {
        type: String,

    },
    Location: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password : {
        type: String,
        required: true,

    },
    ConfirmPassword : {
        type: String,
 
    },
    role : {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    contactNumber: {
        type: String,
    },
    avatar: {
        type: String,
        default: "https://image.shutterstock.com/image-vector/default-avatar-profile-icon-social-600w-1677509740.jpg"
    },
    createdAt:{
        type:Date,
        default: new Date()
    }

}, {timestamps: true});


const Users = mongoose.model('Users', userSchema)

export default Users;