import { combineReducers } from 'redux';
import {auth_reducer}  from '../Reducers/auth.reducers'
import { token_reducer } from '../Reducers/token.reducer';
let RootReducers = combineReducers(
                                    {
                                        Auth_Root_Reducer : auth_reducer,
                                        Token_Root_Reducer: token_reducer
                                    }
                                    
                                )

export {RootReducers};