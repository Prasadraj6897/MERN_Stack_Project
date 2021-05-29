import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {
    Link
  } from "react-router-dom";
import './profile.css'

import { showErrMsg, showSuccessMsg } from '../Utils/Notification/Notification'
import {  isLength, isMatch } from '../Utils/Validation/Validation'
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetail_action } from '../../Actions/userDetail.action';
import { All_User_Detail_action } from '../../Actions/AllUserdetail.action';
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
    const {firstName, lastName, password, cf_password, err, success} = data

    const UserDetail = useSelector(state =>state.User_Detail_Root_Reducer.userData)
    const token = useSelector(state => state.Token_Root_Reducer.token)
    const User = useSelector(state =>state.Auth_Root_Reducer)
    const AllUserDetails = useSelector(state =>state.All_user_root_Reducer.AlluserData)

    const {isAdmin} = User

    const handleChange = (e) => {
        const {name, value} = e.target
        setData({...data, [name]: value, err:'', success:''})
    }

    
    const ChangeAvatar = async (e) =>{
        e.preventDefault()

        try{
            const file = e.target.files[0]
            if(!file) 
            {
                return setData({...data, err: "No files were uploaded." , success: ''})
            }
            if(file.size > 1024 * 1024)
            {
                return setData({...data, err: "Size too large." , success: ''})
            }
            if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg')
            {
                return setData({...data, err: "File format is incorrect." , success: ''})
            }
            
            let formData =  new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/uploadAvatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            // console.log(res.data)
            setLoading(false)
            setAvatar(res.data.url)

       
        }
        catch(error)
        {
            return setData({...data, err: error.response.data.message, success: ''})
        }
    }

    const updateInfor = () => {
        try {
            axios.patch('/users/update', {
                firstName: firstName ? firstName : UserDetail.firstName,
                lastName: lastName ? lastName : UserDetail.lastName,
                avatar: avatar ? avatar : UserDetail.avatar
            },{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
            dispatch(getUserDetail_action(token))
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
       
    }

    const updatePassword = () => {
        if(isLength(password))
        {
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})
        }
           

        if(!isMatch(password, cf_password))
        {
            return setData({...data, err: "Password did not match.", success: ''})
        }
            

        try {
            axios.post('/users/resetpassword', {password},{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }
    const handleUpdate = () => {
        if(firstName || lastName || avatar)
        {
            updateInfor()
        } 
        if(password) 
        {
            updatePassword()
        }
    }

    useEffect(()=>{
        if(isAdmin)
        {
            dispatch(All_User_Detail_action(token))
        }
        dispatch(getUserDetail_action(token))
    },[token, isAdmin, dispatch, callback, UserDetail])


    const handleDelete = () => {

    }
    
  return(
        <div>
            <div>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                {loading && <h3>Loading.....</h3>}
            </div>

            <div className="profile">
                <div className= "col-left">
                    <h4>{isAdmin ? "Admin Profile" : "UserProfile"}</h4>

                    <div className="avatar">
                        <img src={avatar ? avatar : UserDetail.avatar} alt="" /> 
                        <span>
                            <i className="fas fa-camera"></i>
                            <p>Change</p>
                            <input type="file" name="file" id="file_up" onChange={ChangeAvatar}/>
                        </span>
                    </div>    
                        <div className="form-group">
                            <label html="firstName">First Name</label>
                            <input type="text" placeholder="Enter First Name" id="firstName" defaultValue={UserDetail.firstName} name="firstName" onChange={handleChange}/>
                        </div>

                        <div className="form-group"> 
                            <label html="lastName">Last Name</label>
                            <input type="text" placeholder="Enter Last Name" id="lastName" defaultValue={UserDetail.lastName} name="lastName"  onChange={handleChange}/>
                        </div>            

                        <div className="form-group">
                            <label html="email">Email Address</label>
                            <input type="text" placeholder="Enter Email Address" id="email" defaultValue={UserDetail.email} name="email" disabled/>
                        </div>
                    
                        <div className="form-group">
                            <label html="password">Password</label>
                            <input type="password" placeholder="Enter Password" id="password" defaultValue={password} name="password"  onChange={handleChange}/>
                        </div>

                        <div className="form-group">
                            <label html="password">ConfirmPassword</label>
                            <input type="text" placeholder="Enter ConfirmPassword" id="cf_password" defaultValue={cf_password} name="cf_password"  onChange={handleChange}/>
                        </div>
                        <div>
                            <em style={{color: "crimson"}}> 
                            * If you update your password here, you will not be able 
                                to login quickly using google and facebook.
                            </em>
                        </div>
                        <button onClick={handleUpdate}>Update</button>
                    
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
                                {
                                   AllUserDetails && AllUserDetails.map((users, index)=>(
                                        <tr key={users._id}>
                                            <td>{users._id}</td>
                                            <td>{users.firstName}</td>
                                            <td>{users.email}</td>
                                            <td>
                                            {
                                                users.role === "admin"
                                                ? <i className="fas fa-check" title="Admin"></i>
                                                : <i className="fas fa-times" title="User"></i>
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/edit_user/${users._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
                                            <i className="fas fa-trash-alt" title="Remove"
                                            onClick={() => handleDelete(users._id)} ></i>
                                        </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>

   )
  }


export default Profile;