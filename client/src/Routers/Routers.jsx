import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Body from "../Components/Body/Body";
import Headers from "../Components/Header/Headers";
import HomePage from "../Components/HomePage";


let Routers = () => {

    return(
        <>
            <Router>
                <Headers />
                <Body />
                {/* <Switch>
                    <Route exact path='/' component={HomePage} />    
                </Switch> */}
            </Router>
        </>
        

    )
}

export default Routers;