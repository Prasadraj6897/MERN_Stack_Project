import React from 'react'
import {Link} from 'react-router-dom'
/**
* @author
* @function Headers
**/

const Headers = (props) => {
  return(
    <header>
        <div className="logo">
		   <h1>
				<Link to='/'>
					Home
				</Link>
		   </h1>
		   <ul>
			   <li>
			   <Link to='/cart'>
					cart
				</Link>
			   </li>
		   </ul>
	   </div>
    </header>
   )
  }


export default Headers