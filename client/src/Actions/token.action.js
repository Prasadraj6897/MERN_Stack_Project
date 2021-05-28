import {tokenConstants} from '../Constants/Constants'

let getToken_action = (payload) => {
    return async (dispatch) => {
        try{                    
            dispatch({ type : tokenConstants.GET_TOKEN_REQUEST })
                dispatch(
                    {
                        type : tokenConstants.GET_TOKEN_SUCCESS, 
                         payload
                    }
                )
            
        }catch(error){
            // console.log("errorerror", error)
            if(error)
            {
                dispatch({
                    type : tokenConstants.GET_TOKEN_FAILURE, 
                    payload:{
                        error : error.response.data.message
                    }
                })
            }
           
        }
    } 
}

export {getToken_action};