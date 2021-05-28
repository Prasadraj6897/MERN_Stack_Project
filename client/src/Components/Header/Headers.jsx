import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Header.css'
/**
* @author
* @function Headers
**/

const Headers = (props) => {

	const User = useSelector(state =>state.Auth_Root_Reducer)
	const { isLogged} = User

	
    const UserDetail = useSelector(state =>state.User_Detail_Root_Reducer.userData)

	const handleLogout = async () =>{
		try{
			await axios.get('/users/logout')
			localStorage.removeItem('firstlogin')
			window.location.href="/"
		}
		catch(error){
			window.location.href="/"
		}
	}

	const userLink = () => {
		return <li className="drop-nav">
			<Link to="/" className="avatar">
				<img src={UserDetail.avatar} alt="" />
					{UserDetail.firstName}
				<i className="fas fa-angle-down"></i>
			</Link>
			<ul className="dropdown">
				<li>
					<Link to="/profile">Profile</Link>
				</li>
				<li>
					<Link to="/" onClick={handleLogout}>Logout</Link>
				</li>
			</ul>
		</li>
	}
  return(
    <header>
        <div className="logo">
		   <h1 >
				<Link className="link_" to='/'>
					Home
				</Link>
		   </h1>
		</div>
		<ul>
			<li>
			<Link to='/cart'>
				<i className="fas fa-shopping-cart">
					cart
				</i>	
			</Link>
			</li>
			<li>
				{
					isLogged 
					?
					userLink()
					:
					<Link to='/signin'>
						<i className="fas fa-user">
							Login
						</i>	
					</Link>
				}
			
			</li>
		</ul>
    </header>
   )
  }


export default Headers