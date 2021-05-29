import {ALLuserDetailConstants} from '../Constants/Constants'
import axios from 'axios';

let All_User_Detail_action = (token) => {
    return async (dispatch) => {
        
        try{
                       
            dispatch({type : ALLuserDetailConstants.GET_ALL_USER_DETAIL_REQUEST})
            const res = await axios.get('/users/getALLUserInfo',{
                headers: {Authorization: token}
            })
            if(res.status === 200){
                const {users} = res.data;
                
                dispatch(
                    {
                        type : ALLuserDetailConstants.GET_ALL_USER_DETAIL_SUCCESS, 
                        payload:{
                            users
                        }
                    }
                )
            }
            
        }catch(error){
            // console.log("errorerror", error)
            if(error)
            {
                dispatch({
                    type : ALLuserDetailConstants.GET_ALL_USER_DETAIL_FAILURE, 
                    payload:{
                        error : error.response.data.message
                    }
                })
            }
           
        }
    } 
}
export {All_User_Detail_action};