import {tokenConstants} from '../Constants/Constants'

let initial_state  = {
    token: null,
    error: '',
}

let token_reducer = (state = initial_state, action) =>{
    // console.log("action_Reducers", action)
    switch(action.type){
        case tokenConstants.GET_TOKEN_REQUEST :    
                           
            return {
                ...state,
                error: ""
            }
        case tokenConstants.GET_TOKEN_SUCCESS :    
                           
            return {
                ...state,
                token:action.payload,
                error: ""
            }
        case tokenConstants.GET_TOKEN_FAILURE :    
                           
            return {
                ...state,
                error:action.payload.error,
            }
        
        default:
            return state;
    }
}

export {token_reducer};