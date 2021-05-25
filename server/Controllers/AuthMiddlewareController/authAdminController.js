import Users from '../../Models/Users/UserModels.js'


export const authAdmin = (req, res, next) => {
    try{
        const user = await Users.findOne({_id: req.user.id})

        if(user.role !== 'admin')
        {
            return res.status(500).json({message : "Admin Access Denied"})
        }
        next();
    }
    catch(error){
       
        return res.status(500).json({message : "Something went wrong"})
     }
}