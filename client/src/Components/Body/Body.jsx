import React from 'react'
import './Body.css'

/**
* @author
* @function Body
**/

const Body = (props) => {
  return(
		<div className="home_page">
			<h2>Hello everyone!</h2>
			<p>
				This site is about user authentication, 
				so there won't be any other pages here. 
				If people want to see more about how to 
				create other websites. You can click on 
				the link below, visit my youtube channel. 
				And if you find it useful, please subscribe 
				for us. Thank you very much!
			</p>
			<a href="https://www.youtube.com/c/DevATHTML" target="_blank" 
			rel="noopener noreferrer">Verfied this Youtube</a>

		</div>
   )
  }


export default Body