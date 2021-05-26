import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ActivationEmail from "../Components/Auth/ActivationEmail/ActivationEmail";
import Login from "../Components/Auth/Login/Login";
import Register from "../Components/Auth/SignUp/SignUp";
// import Body from "../Components/Body/Body";
import Headers from "../Components/Header/Headers";

let Routers = () => {

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