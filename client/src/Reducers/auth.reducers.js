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
                isLogged: false,
            }
        case authConstants.GET_TOKEN_SUCCESS_AFTER_LOGIN :           
            return {
                ...state,
                isLogged: true
            }
          
        case authConstants.IS_ADMIN :           
            return {
                ...state,
                isAdmin: action.payload.isAdmin
            }

        case authConstants.LOGIN_SUCCESS :    
                           
            return {
                ...state,
                authenticate: true,
                authenticating: false,
                success:action.payload.message,
                error: null,
                isLogged: true,
                isAdmin: action.payload.isAdmin
            }
        case authConstants.LOGIN_FAILURE :    
                           
            return {
                ...state,
                error: action.payload.error ? action.payload.error : null ,
                success:'',
                isLogged: false,
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

        case authConstants.GOOGLE_LOGIN :           
            return {
                ...state,
                isLogged: true
            }
       
        default:
            return state;
    }
}

export {auth_reducer};