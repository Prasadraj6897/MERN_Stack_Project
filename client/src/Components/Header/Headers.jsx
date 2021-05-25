import React from 'react'
import {Link} from 'react-router-dom'

import './Header.css'
/**
* @author
* @function Headers
**/

const Headers = (props) => {
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
			<Link to='/signin'>
				<i className="fas fa-user">
					Login
				</i>	
			</Link>
			</li>
		</ul>
    </header>
   )
  }


export default Headers