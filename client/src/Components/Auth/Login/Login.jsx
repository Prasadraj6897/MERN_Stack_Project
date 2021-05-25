import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
/**
* @author
* @function Login
**/

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, seterr] = useState('')
    const [success, setsuccess] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        const payload = {
            email,
            password
        }
        try{
            console.log({payload})
        }
        catch(error)
        {
            console.log(error)
        }
        
        
    }
  return(
       <div className='loginPage'>
           <h4>Login</h4>
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
                    <Link to="/forget_password">Forget Your Password</Link>
               </div>
           </form>
       </div>
   )
  }


export default Login