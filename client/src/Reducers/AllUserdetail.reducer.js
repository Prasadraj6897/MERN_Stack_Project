import {ALLuserDetailConstants} from '../Constants/Constants'

let initial_state  = {
    error: '',
    AlluserData: ""
}

let All_UserDetail_reducer = (state = initial_state, action) =>{
    // console.log("action_Reducers", action)
    switch(action.type){
        case ALLuserDetailConstants.GET_ALL_USER_DETAIL_REQUEST :    
                           
            return {
                ...state,
                error: ""
            }
        case ALLuserDetailConstants.GET_ALL_USER_DETAIL_SUCCESS :    
                           
            return {
                ...state,
                AlluserData: action.payload.users,
                error: ""
            }
        case ALLuserDetailConstants.GET_ALL_USER_DETAIL_FAILURE :    
                           
            return {
                ...state,
                error:action.payload.error,
            }
        
        default:
            return state;
    }
}

export {All_UserDetail_reducer};