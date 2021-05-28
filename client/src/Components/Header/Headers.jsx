import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

import './Header.css'
/**
* @author
* @function Headers
**/

const Headers = (props) => {

	const User = useSelector(state =>state.Auth_Root_Reducer)
	const {user, isLogged} = User

	
    const UserDetail = useSelector(state =>state.User_Detail_Root_Reducer.userData)


	const userLink = () => {
		return <li>
			<Link to="/">
				<img src={UserDetail.avatar} alt=""/>
				{UserDetail.firstName}
			</Link>
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