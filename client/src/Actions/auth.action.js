import {authConstants} from '../Constants/Constants'
import axios from 'axios';

let login_action = (payload, history) => {
    return async (dispatch) => {
        
        try{
                       
            dispatch({type : authConstants.LOGIN_REQUEST})
            const res = await axios.post('/users/signin',payload)
            if(res.status === 200){
                const {message} = res.data;
                
                //below put token it causes error
                localStorage.setItem('firstlogin', true)
                // localStorage.setItem('result', JSON.stringify(result))
                dispatch(
                    {
                        type : authConstants.LOGIN_SUCCESS, 
                        payload:{
                            message
                        }
                    }
                )
                history.push('/')
            }
            
        }catch(error){
            // console.log("errorerror", error)
            if(error)
            {
                dispatch({
                    type : authConstants.LOGIN_FAILURE, 
                    payload:{
                        error : error.response.data.message
                    }
                })
            }
           
        }
    } 
}

let signup_action = (userdata) => {
    
    return async (dispatch) => {
           
        try{
            
            dispatch({type : authConstants.SIGNUP_REQUEST})
            const res = await axios.post('/users/signup',userdata)
            const {message} = res.data
            if(res.status === 200){
                // const {message, token, result} = res.data;

                //below put token it causes error
                // localStorage.setItem('token', token)
                // localStorage.setItem('result', JSON.stringify(result))
                dispatch(
                    {
                        type : authConstants.SIGNUP_SUCCESS, 
                        payload:{message}
                    }
                )
                // history.push('/')
            }
            else{
               
            }

        }catch(error){
            if(error)
            {
                dispatch({
                    type : authConstants.SIGNUP_FAILURE, 
                    payload:{
                        error : error.response.data.message
                    }
                }
            )
            }
        }
    } 
}

export {login_action, signup_action};