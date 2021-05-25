import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


export const authMiddleware = (req, res, next) => {
    try{
        const token = req.header("Authorization")
        if(!token)
        {
            return res.status(500).json({message : "Invalid Authentication"})
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRECT, (err, user) => {
            if(err)
            {
                return res.status(500).json({message : "Invalid Authentication"})
            }
            req.user = user
            next()
        })
    }
    catch(error)
    {
        return res.status(500).json({message : "Something went wrong"})
    }
}