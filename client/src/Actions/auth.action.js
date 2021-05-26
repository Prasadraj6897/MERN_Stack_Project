import {authConstants} from '../Constants/Constants'
import axiosInstance from '../Helpers/axios'

let login_action = (payload, history) => {
    return async (dispatch) => {
        
        try{
                       
            dispatch({type : authConstants.LOGIN_REQUEST})
            const res = await axiosInstance.post('/users/signin',payload)
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
            // console.log("errorerror", error.response.data.message)
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

export {login_action};