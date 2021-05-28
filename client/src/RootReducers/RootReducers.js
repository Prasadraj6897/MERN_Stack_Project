import { combineReducers } from 'redux';
import {auth_reducer}  from '../Reducers/auth.reducers'
import { token_reducer } from '../Reducers/token.reducer';
import {UserDetail_reducer} from '../Reducers/userDetail.reducer'
let RootReducers = combineReducers(
                                    {
                                        Auth_Root_Reducer : auth_reducer,
                                        Token_Root_Reducer: token_reducer,
                                        User_Detail_Root_Reducer: UserDetail_reducer
                                    }
                                    
                                )

export {RootReducers};