import {authConstants} from '../Constants/Constants'

let initial_state  = {
    token: null,
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    success: '',  
}

let auth_reducer = (state = initial_state, action) =>{
    // console.log("action_Reducers", action)
    switch(action.type){
        case authConstants.LOGIN_REQUEST :           
            return {
                ...state,
                authenticating: true,
            }
          
        case authConstants.LOGIN_SUCCESS :    
                           
            return {
                ...state,
                authenticate: true,
                authenticating: false,
                success:action.payload.message,
                error: null,
            }
        case authConstants.LOGIN_FAILURE :    
                           
            return {
                ...state,
                error: action.payload.error,
                success:''
            }
        
        default:
            return state;
    }
}

export {auth_reducer};