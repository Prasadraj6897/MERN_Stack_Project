import cloudinary from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const removeTmp = (path) =>{
    fs.unlink(path, err =>{
        if(err)
        {
            throw err
        }
        
    })
}

export const UploadImageController = async (req, res)=>{
        
    try{
        const file = req.files.file
        cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: 'avatar', width: 150, height: 150, crop: "fill"
        }, async(err, result) => {
            if(err)
            {
                throw err
            }
            removeTmp(file.tempFilePath)
            
            res.json({url: result.secure_url})

        })
    }

    catch(error){
       
       return res.status(500).json({message : "Something went wrong"})
    }
}