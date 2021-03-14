import React from 'react';
import Login from "./Login/Login";
import Register from "./Registr/Register";
import {Switch, Route, Redirect} from "react-router-dom";

const Auth = () => {
    return (
        <Switch>
            <Route exact path='/auth' component={() => {return <Redirect to="/auth/login" />}}/>
            <Route exact path='/auth/login' component={Login}/>
            <Route exact path='/auth/signup' component={Register}/>
        </Switch>
    );
};

export default Auth;
