import {authConstants} from '../Constants/Constants'

let initial_state  = {
    token: null,
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    success: null,
    isLogged: false,
    isAdmin: false,
    user:[],
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
                isLogged: true
            }
        case authConstants.LOGIN_FAILURE :    
                           
            return {
                ...state,
                error: action.payload.error,
                success:''
            }

        case authConstants.SIGNUP_REQUEST:           
            return {
                ...state,
                authenticating: true,
            }
        case authConstants.SIGNUP_SUCCESS :           
            return {
                ...state,
                success: action.payload.message,
                // token: action.payload.token,
                authenticating: false,
                authenticate: true,
                error:null
            }
        case authConstants.SIGNUP_FAILURE :           
            return {
                ...state,
                authenticating: false,
                error: action.payload.error,
                success:''
            }
        
        default:
            return state;
    }
}

export {auth_reducer};