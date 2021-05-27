import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ActivationEmail from "../Components/Auth/ActivationEmail/ActivationEmail";
import Login from "../Components/Auth/Login/Login";
import Register from "../Components/Auth/SignUp/SignUp";
// import Body from "../Components/Body/Body";
import Headers from "../Components/Header/Headers";
// import axiosInstance from "../Helpers/axiosInstance";
import axios from 'axios';
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
                console.log(res)
            }
            getToken()
        }
    },[User.isLogged])

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