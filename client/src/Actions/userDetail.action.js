import {authConstants, userDetailConstants} from '../Constants/Constants'
import axios from 'axios';

let getUserDetail_action = (token) => {
    return async (dispatch) => {
        try{                    
                dispatch({ type : userDetailConstants.GET_USER_DETAIL_REQUEST })
                const res = await axios.get('/users/getUserInfo', {
                    headers: {Authorization: token}
                })
                console.log("resreseres", res.data)
                if(res.status == 200)
                {
                    dispatch(
                        {
                            type : userDetailConstants.GET_USER_DETAIL_SUCCESS, 
                            payload: {
                                user: res.data.user,
                            }
                        }
                    )
                    dispatch(
                        {
                            type: authConstants.LOGIN_SUCCESS,
                            payload: {
                                isAdmin: res.data.user.role === "admin" ? true : false
                            }
                        }
                    )
                }
                
                
            
        }catch(error){
            // console.log("errorerror", error.response.data)
            if(error.response)
            {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: error.response.data.message
                })
            }
           
        }
    } 
}

export {getUserDetail_action};