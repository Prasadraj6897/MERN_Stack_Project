import {tokenConstants} from '../Constants/Constants'

let initial_state  = {
    token: null,
}

let token_reducer = (state = initial_state, action) =>{
    // console.log("action_Reducers", action)
    switch(action.type){
        case tokenConstants.GET_TOKEN :    
                           
            return {
                ...state,
                token:action.payload,
            }
        
        default:
            return state;
    }
}

export {token_reducer};