import React, {lazy} from 'react';
import './Auth.scss';
import {Switch, Route, Redirect} from "react-router-dom";

const Login = lazy(() => import("./Login/Login"));
const Register = lazy(() => import("./Registr/Register"));
const Reset = lazy(() => import("./Reset/Reset"));
const NewPassword = lazy(() => import("./NewPassword/NewPassword"));
const Confirmation = lazy(() => import("./Confirmation/Confirmation"));


const Auth = () => {
    return (
        <div className='auth_container'>
            <div className='auth_header'>
                Fundraising
            </div>
            <div className='auth_main_content'>
                <Switch>
                    <Route exact path='/auth' component={() => {return <Redirect to="/auth/login" />}}/>
                    <Route exact path='/auth/login' component={Login}/>
                    <Route exact path='/auth/signup' component={Register}/>
                    <Route exact path='/auth/reset' component={Reset}/>
                    <Route exact path='/auth/new_password' component={NewPassword}/>
                    <Route exact path='/auth/confirmation' component={Confirmation}/>
                </Switch>
            </div>
        </div>
    );
};

export default Auth;
