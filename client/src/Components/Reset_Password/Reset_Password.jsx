import React, {useState} from 'react'
import axios from 'axios';
import {
    useParams
  } from "react-router-dom";
import './resetpassword.css'

import { showErrMsg, showSuccessMsg } from '../Utils/Notification/Notification'
import {  isLength, isMatch } from '../Utils/Validation/Validation'
/**
* @author
* @function ResetPassword
**/
const initialState = {
    password: '',
    cf_password:'',
    err:'',
    success:''
}
const ResetPassword = (props) => {
    const {token} = useParams();
    // console.log(token)
    const [data, setData] = useState(initialState)

    const {password, cf_password, err, success} = data
    const handleChangeInput = (e) =>{
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success:''})
    }

    const handleverifyBtn = async () => {
        if(isLength(password))
        {
            return setData({...data,  err:'Password Must be 6 Characters', success:''})
        }
		if(!isMatch(password, cf_password))
        {
            return setData({...data,  err:'Password Must be be Match', success:''})
        }
        try{
            const res = await axios.post('/users/resetpassword', {password},{
				headers: {Authorization: token}
			})
            return setData({...data,  err:'', success:res.data.message})
        }
        catch(error)
        {
            error.response.data.message && setData({...data,  err:error.response.data.message, success:''})
        }
    }
  return(
	<div className="fg_pass">
		<h2>Reset Your Password?</h2>
		<div style={{width:"25%", marginLeft:"450px"}}>
			{err && showErrMsg(err)}
			{success && showSuccessMsg(success)}
		</div>
		<div className="row">
			<br />
			<label htmlFor="password">Password</label>
			<input type="password" name="password" id="password" value={password} onChange={handleChangeInput}/>

			<label htmlFor="cf_password">Confirm Password</label>
			<input type="password" name="cf_password" id="cf_password" value={cf_password} onChange={handleChangeInput}/>
			
			<button onClick={handleverifyBtn}>Verify Your Password</button>
		</div>
	</div>
   )
  }


export default ResetPassword