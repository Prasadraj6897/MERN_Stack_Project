import React, { useState,useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import './style.css'
import { showErrMsg, showSuccessMsg } from '../../Utils/Notification/Notification'

import DatePicker from "react-datepicker";
import { getMonth, getYear } from 'date-fns';
import range from "lodash/range";
import "react-datepicker/dist/react-datepicker.css";

import ReactPhoneInput, { formatPhoneNumberIntl} from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { isEmail, isEmpty, isLength, isMatch } from '../../Utils/Validation/Validation'
import { signup_action } from '../../../Actions/auth.action'
/**
* @author
* @function Login
**/

const Register = (props) => {

    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [gender, setgender] = useState('')
    const [DOBirth, setDOB] = useState(new Date())
	const years = range(1990, getYear(new Date()) + 1, 1);
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
    const [Location, setLocation] = useState('')
    const [contactNum, setcontactNumber] = useState('')
    const [err, seterr] = useState('')
    const [success, setsuccess] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    const User = useSelector(state =>state.Auth_Root_Reducer)
    
	useEffect(()=>{
		const err = User.error ? User.error : null;
		const succ = User.success ? User.success : null;
		seterr(err)
		setsuccess(succ) 
	},[User])
    const handleSubmit = (e) =>{
        e.preventDefault()
		
		let contactNumber = contactNum && formatPhoneNumberIntl(contactNum)
		let DOB = DOBirth && DOBirth.toString()

		if(isEmpty(firstName) || isEmpty(lastName))
		{
			return seterr('Please Fill all the fields')
		}
		if(!isEmail(email) )
		{
			return seterr('Invalid Email Address')
		}
		
		if(isLength(password))
		{
			return seterr('Password must be 6 characters')
		}
		
		if(!isMatch(password, ConfirmPassword))
		{
			return seterr('Password Must be match')
		}
		
		
        const payload = {
			firstName,
			lastName,
            email,
            password,
			ConfirmPassword,
			gender,
			DOB,
			Location,
			contactNumber
        }
		console.log(payload)
		dispatch(signup_action(payload))
		return seterr('')
        // 
        
        
    }
  return(
       <div className='loginPage'>
           {/* {JSON.stringify(User)} */}
          
           <h4>Register</h4>
           
           {err ? showErrMsg(err) : null }
           {success ? showSuccessMsg(success) : null}

           <form onSubmit={handleSubmit}>

                <div>
                   <label html="firstName">First Name</label>
                   <input type="text" placeholder="Enter First Name" id="firstName" value={firstName} name="firstName" onChange={(e) =>{setFirstname(e.target.value)}}/>
               </div>

               <div>
                   <label html="lastName">Last Name</label>
                   <input type="text" placeholder="Enter Last Name" id="lastName" value={lastName} name="lastName" onChange={(e) =>{setLastname(e.target.value)}}/>
               </div>            

               <div>
                   <label html="email">Email Address</label>
                   <input type="text" placeholder="Enter Email Address" id="email" value={email} name="email" onChange={(e) =>{setEmail(e.target.value)}}/>
               </div>
               
               <div>
                   <label html="password">Password</label>
                   <input type="password" placeholder="Enter Password" id="password" value={password} name="password" onChange={(e) =>{setPassword(e.target.value)}}/>
               </div>

               <div>
                   <label html="password">ConfirmPassword</label>
                   <input type="text" placeholder="Enter ConfirmPassword" id="ConfirmPassword" value={ConfirmPassword} name="ConfirmPassword" onChange={(e) =>{setConfirmPassword(e.target.value)}}/>
               </div>

                <div className="container">
                	<div className="radio">
                		<input type="radio" value="Male" name='gender' id='male' onClick={(e) => setgender(e.target.value)}/>
                		<label htmlFor="male"></label>
                	</div>
               
                	<div className="right">Male</div>
                
                
                	<div className="radio">
                		<input type="radio" value="Female" name='gender' id='female' onClick={(e) => setgender(e.target.value)}/>
                		<label htmlFor="female"></label>
                	</div>
					
					<div className="right">Female</div>
                </div>
				<br />
				<div >
					<div>
						<label>Date Of Birth</label>
					</div>
					<div style={{float:"right",marginTop:"-31px",marginRight:"165px"}}>
						<label>Location</label>
					</div>
					</div>	
				<div style={{width:"100%", display:"flex"}}>
					
					<DatePicker selected={DOBirth} onChange={date => setDOB(date)} isClearable
						placeholderText="Please Select the date"
						renderCustomHeader={({
							date,
							changeYear,
							changeMonth,
							decreaseMonth,
							increaseMonth,
							prevMonthButtonDisabled,
							nextMonthButtonDisabled
						  }) => (
							<div
							  style={{
								margin: 10,
								display: "flex",
								justifyContent: "center"
							  }}
							>
							  <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
								{"<"}
							  </button>
							  <select
								value={getYear(date)}
								onChange={({ target: { value } }) => changeYear(value)}
							  >
								{years.map(option => (
								  <option key={option} value={option}>
									{option}
								  </option>
								))}
							  </select>
					
							  <select
								value={months[getMonth(date)]}
								onChange={({ target: { value } }) =>
								  changeMonth(months.indexOf(value))
								}
							  >
								{months.map(option => (
								  <option key={option} value={option}>
									{option}
								  </option>
								))}
							  </select>
					
							  <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
								{">"}
							  </button>
							</div>
						  )}
					/>
					<div  style={{
									boxSizing: "border-box",
									padding:"0 50px",
									paddingTop:"20px",
									maxWidth:"220px",
									paddingTop:"7px"
									}}>
						<select style={{width:"220px", height:"50px", paddingBottom:"15px"}} value={Location} onChange={(e) => setLocation(e.target.value)}>
								<option value={""}>Select Location</option>
								<option value={"America"}>America</option>
								<option value={"England"}>England</option>
								<option value={"India"}>India</option>
							</select>
						</div> 
				</div>

				<label>PhoneNumber</label>
				<div>
					<ReactPhoneInput
						international
						displayInitialValueAsLocalNumber
						defaultCountry="IN"
						value={contactNum}
						onChange={(e)=>setcontactNumber(e)}
						
					/>
					
				</div>

				<div className="row" style={{marginBottom:"60px"}}>
                    <button type="submit">Register</button> 
					<Link to="/signin">Already Have an Account, SignIn</Link>                  
               </div>

              
           </form>
       </div>
   )
  }


export default Register