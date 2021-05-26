import { combineReducers } from 'redux';
import {auth_reducer}  from '../Reducers/auth.reducers'
let RootReducers = combineReducers(
                                    {
                                        Auth_Root_Reducer : auth_reducer
                                    }
                                    
                                )

export {RootReducers};