import React, { useState,useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import './style.css'
import { login_action } from '../../../Actions/auth.action'
import { showErrMsg, showSuccessMsg } from '../../Utils/Notification/Notification'

/**
* @author
* @function Login
**/

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, seterr] = useState('')
    const [success, setsuccess] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    const User = useSelector(state =>state.Auth_Root_Reducer)
    
    
    const handleSubmit = (e) =>{
        e.preventDefault()

        const payload = {
            email,
            password
        }

        dispatch(login_action(payload, history))
        
        
    }
  return(
       <div className='loginPage'>
           {/* {JSON.stringify(User)} */}
          
           <h4>Login</h4>
           
           {User.error ? showErrMsg(User.error) : null }
           {User.success ? showSuccessMsg(User.success) : null}

           <form onSubmit={handleSubmit}>
               <div>
                   <label html="email">Email Address</label>
                   <input type="text" placeholder="Enter Email Address" id="email" value={email} name="email" onChange={(e) =>{setEmail(e.target.value)}}/>
               </div>
               
               <div>
                   <label html="password">Password</label>
                   <input type="password" placeholder="Enter Password" id="password" value={password} name="password" onChange={(e) =>{setPassword(e.target.value)}}/>
               </div>

               <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/forgot_password">Forget Your Password</Link>
               </div>
                <br />
               <div className="row" style={{marginLeft:"60px"}}>
                    <Link to="/signup">Dont't Have an account, Signup Now</Link>
               </div>
           </form>
       </div>
   )
  }


export default Login