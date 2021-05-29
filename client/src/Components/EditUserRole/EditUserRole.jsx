import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from '../Utils/Notification/Notification';
import './editrole.css'

import axios from 'axios';
/**
* @author
* @function EditUserRole
**/

const EditUserRole = (props) => {
    const {id} = useParams();
    const history = useHistory();

    const [editUser, setEditUser] = useState([])
    const AllUserDetails = useSelector(state =>state.All_user_root_Reducer.AlluserData)
    const token = useSelector(state => state.Token_Root_Reducer.token)

    const [checkAdmin, setCheckAdmin] = useState(false)
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const [userRole, setuserRole] = useState('user')

    useEffect(() => {
      if(AllUserDetails.length !== 0){
        AllUserDetails.forEach(user => {
              if(user._id === id){
                  setEditUser(user)
                  setCheckAdmin(user.role == 'admin' ? true : false)
              }
          })
      }else{
          history.push('/profile')
      }
  },[AllUserDetails, id, history])



const handleUpdate = async () => {
	try {
		
			const res = await axios.patch(`/users/update_role/${editUser._id}`, {
				role: userRole
			}, {
				headers: {Authorization: token}
			})

			setSuccess(res.data.message)
			setuserRole('user')
		
	} catch (err) {
		err.response.data.message && setErr(err.response.data.message)
	}
}

const handleCheck = () => {
	setSuccess('')
	setErr('')
	setCheckAdmin(!checkAdmin)
	console.log(checkAdmin)
	{
		!checkAdmin ? setuserRole("admin") : setuserRole("user")
	}
	
}

  return(
	  <div>
		  <div className="row">
			<button onClick={() => history.goBack()} className="go_back">
				<i className="fas fa-long-arrow-alt-left"></i> Go Back
			</button>
		</div>
	  
		<div className="edit_page edit_user">
			

			<div className= "col-left">
					<h2>Edit User</h2>
					<div className="form-group">
						<label html="firstName">First Name</label>
						<input type="text"  id="firstName" defaultValue={editUser.firstName} name="firstName" disabled/>
					</div>

					<div className="form-group"> 
						<label html="lastName">Last Name</label>
						<input type="text"  id="lastName" defaultValue={editUser.lastName} name="lastName"  disabled/>
					</div>            

					<div className="form-group">
						<label html="email">Email Address</label>
						<input type="text" id="email" defaultValue={editUser.email} name="email" disabled/>
					</div>

					<div className="form-group">
						<input type="checkbox" id="isAdmin"  name="role" onChange={handleCheck}/>
						<label htmlFor="isAdmin">isAdmin</label>
					</div>
				
					<button onClick={handleUpdate}>Update</button>
					{err && showErrMsg(err)}
                	{success && showSuccessMsg(success)}
			</div>
		</div>
	</div>
   )
  }


export default EditUserRole