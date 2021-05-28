import React, {useState} from 'react'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../Utils/Notification/Notification'
import { isEmail } from '../Utils/Validation/Validation'
import './forgotpassword.css'
/**
* @author
* @function Forgot_Password
**/

const initialData = {
    email:'',
    err:'',
    success:''
}

const Forgot_Password = (props) => {
    const [data, setData] = useState(initialData)

    const {email, err, success} = data

    const handleChangeInput = (e) =>{
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success:''})
    }
    const handleverifyBtn = async () => {
        if(!isEmail(email))
        {
            return setData({...data,  err:'Invalid email', success:''})
        }
        try{
            const res = await axios.post('/users/forget', {email})
            return setData({...data,  err:'', success:res.data.message})
        }
        catch(error)
        {
            error.response.data.message && setData({...data,  err:error.response.data.message, success:''})
        }
    }
  return(
    <div className="fg_pass">
        <h2>Forgot Your Password?</h2>
        <div style={{width:"25%", marginLeft:"450px"}}>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        </div>
        <div className="row">
            <br />
            <label htmlFor="email">Enter Your Email</label>
            <input type="email" name="email" id="email" value={email} onChange={handleChangeInput}/>
            <button onClick={handleverifyBtn}>Verify Your Email</button>
        </div>
    </div>
   )
  }


export default Forgot_Password;