import {userDetailConstants} from '../Constants/Constants'

let initial_state  = {
    error: '',
    userData: ""
}

let UserDetail_reducer = (state = initial_state, action) =>{
    // console.log("action_Reducers", action)
    switch(action.type){
        case userDetailConstants.GET_USER_DETAIL_REQUEST :    
                           
            return {
                ...state,
                error: ""
            }
        case userDetailConstants.GET_USER_DETAIL_SUCCESS :    
                           
            return {
                ...state,
                userData: action.payload.user,
                error: ""
            }
        case userDetailConstants.GET_USER_DETAIL_FAILURE :    
                           
            return {
                ...state,
                error:action.payload.error,
            }
        
        default:
            return state;
    }
}

export {UserDetail_reducer};