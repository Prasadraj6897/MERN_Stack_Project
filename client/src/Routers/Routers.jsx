import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ActivationEmail from "../Components/Auth/ActivationEmail/ActivationEmail";
import Login from "../Components/Auth/Login/Login";
import Register from "../Components/Auth/SignUp/SignUp";
// import Body from "../Components/Body/Body";
import Headers from "../Components/Header/Headers";
import axios from 'axios';
import { getToken_action } from "../Actions/token.action";
import { login_action } from "../Actions/auth.action";
import { authConstants } from "../Constants/Constants";
import { getUserDetail_action } from "../Actions/userDetail.action";
let Routers = () => {

    const dispatch = useDispatch();
    const token = useSelector(state => state.Token_Root_Reducer.token)
    const User = useSelector(state =>state.Auth_Root_Reducer)
    
    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstlogin')
        if(firstLogin)
        {
            const getToken = async () => {
                const res = await axios.post('/users/refresh_token', null)
                dispatch(getToken_action(res.data.access_token))
            }
            getToken()
        }
    },[User.isLogged, dispatch])

    useEffect(()=>{
        const getUser = () => {
            dispatch({
                type : authConstants.GET_TOKEN_SUCCESS_AFTER_LOGIN })
            dispatch(getUserDetail_action(token))
        }
        getUser()
    },[token, dispatch])

    return(
        <div>
            <Router>
                <Headers />
                <Switch>
                    <Route exact path='/signin' component={Login} />
                    <Route exact path='/signup' component={Register} />
                    <Route exact path="/user/activate/:activation_token" component={ActivationEmail} />
                </Switch>
            </Router>
        </div>
        

    )
}

export default Routers;