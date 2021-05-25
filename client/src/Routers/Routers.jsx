import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from "../Components/Auth/Login/Login";
import Body from "../Components/Body/Body";
import Headers from "../Components/Header/Headers";

let Routers = () => {

    return(
        <>
            <Router>
                <Headers />
                <Switch>
                    <Route exact path='/signin' component={Login} />    
                </Switch>
            </Router>
        </>
        

    )
}

export default Routers;