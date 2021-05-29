import React, { useState,useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import './style.css'
import { google_login_action, login_action } from '../../../Actions/auth.action'
import { showErrMsg, showSuccessMsg } from '../../Utils/Notification/Notification'

import {GoogleLogin} from 'react-google-login'
import FacebookLogin from 'react-facebook-login';

import axios from 'axios';
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

    const responseGoogle = async (response) =>{
        // console.log(response)
        try{
            const res = await axios.post('/users/google_login',{
                tokenId : response.tokenId
            })
            localStorage.setItem('firstlogin', true)

            setsuccess(res.data.message)
            seterr('')
            dispatch(google_login_action())
            history.push('/')
        }
        catch(err)
        {
            err.response.data.message && seterr(err.response.data.message)
            setsuccess('')
        }
    }

    const responseFacebook = async (response) => {
        try {
            console.log(response)
            const {accessToken, userID} = response
            const res = await axios.post('/users/facebook_login', {accessToken, userID})

           
            localStorage.setItem('firstlogin', true)

            setsuccess(res.data.message)
            seterr('')
            
            dispatch(google_login_action())

            history.push('/')

        } catch (err) {
             err.response.data.message && seterr(err.response.data.message)
            setsuccess('')
        }
    }

  return(
       <div className='loginPage'>
           {/* {JSON.stringify(User)} */}
          
           <h4>Login</h4>
           
           {User.error ? showErrMsg(User.error) : null }
           {User.success ? showSuccessMsg(User.success) : null}

           {err ? showErrMsg(err) : null }
           {success ? showSuccessMsg(success) : null}

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
                <div className="hr">Or Login With</div>

                <div className="social">
                    <GoogleLogin
                        clientId="413243986076-ul63eb87errvet4jnq7flsk7hr0n638c.apps.googleusercontent.com"
                        buttonText="Login with google"
                        onSuccess={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />

                    <FacebookLogin
                        appId="523259772429040"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook} 
                    />
                    
                </div>

               <div className="row" style={{marginLeft:"60px"}}>
                    <Link to="/signup">Dont't Have an account, Signup Now</Link>
               </div>
           </form>
       </div>
   )
  }


export default Login