import React, {useState} from 'react'
import axios from 'axios';
import {
    Link
  } from "react-router-dom";
import './profile.css'

import { showErrMsg, showSuccessMsg } from '../Utils/Notification/Notification'
import {  isLength, isMatch } from '../Utils/Validation/Validation'
import { useSelector, useDispatch } from 'react-redux';
/**
* @author
* @function Profile
**/
const initialState = {
    firstName:"",
    lastName:'',
    password: '',
    cf_password:'',
    err:'',
    success:''
}
const Profile = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState(initialState)
    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)
    const {password, cf_password, err, success} = data

    const UserDetail = useSelector(state =>state.User_Detail_Root_Reducer.userData)
    const token = useSelector(state => state.Token_Root_Reducer.token)
    const User = useSelector(state =>state.Auth_Root_Reducer)

    const {isAdmin} = User
  return(
	<div className="profile">
		<div className= "col-left">
            <h4>{isAdmin ? "Admin Profile" : "UserProfile"}</h4>

            <div className="avatar">
                <img src={avatar ? avatar : UserDetail.avatar} alt="" /> {/*style={{width:"150px", height:"150px"}} */}
                <span>
                    <i className="fas fa-camera"></i>
                    <p>Change</p>
                    <input type="file" name="file" id="file_up" />
                </span>
            </div>    
                <div className="form-group">
                    <label html="firstName">First Name</label>
                    <input type="text" placeholder="Enter First Name" id="firstName" value={UserDetail.firstName} name="firstName" />
                </div>

                <div className="form-group"> 
                    <label html="lastName">Last Name</label>
                    <input type="text" placeholder="Enter Last Name" id="lastName" value={UserDetail.lastName} name="lastName"/>
                </div>            

                <div className="form-group">
                    <label html="email">Email Address</label>
                    <input type="text" placeholder="Enter Email Address" id="email" value={UserDetail.email} name="email" disabled/>
                </div>
            
                <div className="form-group">
                    <label html="password">Password</label>
                    <input type="password" placeholder="Enter Password" id="password" value={password} name="password"/>
                </div>

                <div className="form-group">
                    <label html="password">ConfirmPassword</label>
                    <input type="text" placeholder="Enter ConfirmPassword" id="ConfirmPassword" value={cf_password} name="ConfirmPassword"/>
                </div>
                <button>Update</button>
            
        </div>
		<div className="col-right">
            <h2>{isAdmin ? "Users" : "MyOrders"}</h2>

            <div style={{overflowX: "auto"}}>
                <table className="customers">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First_Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>ID</td>
                        <td>First_Name</td>
                        <td>Email</td>
                        <td>Admin</td>
                        <td>Action</td>
                    </tbody>
                </table>
            </div>
        </div>
	</div>
   )
  }


export default Profile;