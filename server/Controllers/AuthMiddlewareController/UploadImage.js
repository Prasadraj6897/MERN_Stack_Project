import fs from 'fs'

export const UploadImage = async (req, res, next)=>{
        
    try{

       if(!req.files || Object.keys(req.files).length === 0)
       {
        return res.status(500).json({message : "No file were uploaded"})
       }
        const file = req.files.file

        // console.log(file)

        if(file.size > 1024 * 1024)//1 mb
        {
            removeTmp(file.tempFilePath)
            return res.status(500).json({message : "Size too large"})
        }

        if(file.mimetype !=='image/jpeg' && file.mimetype !=='image/png')//for image vaerification
        {
            removeTmp(file.tempFilePath)
            return res.status(500).json({message : "File Format is inCorrect"})
        }

        next()
       
    }
    catch(error){
       
       return res.status(500).json({message : "Something went wrong"})
    }
}

const removeTmp = (path) =>{
    fs.unlink(path, err =>{
        if(err)
        {
            throw err
        }
    })
}