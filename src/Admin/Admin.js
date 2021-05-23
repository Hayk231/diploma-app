import React, {lazy, useEffect} from 'react';
import { Redirect, Route, Switch} from "react-router-dom";
import {prolongSession} from "../redux/User/userMiddlewares";
import {useDispatch} from "react-redux";
import AdminHeader from "./AdminHeader/AdminHeader";

const Overview = lazy(() => import("./Overview/Overview"));
const GoalList = lazy(() => import("./Goals/GoalList"));
const UserList = lazy(() => import("./Users/UserList"));

const Admin = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        setInterval(() => {
            dispatch(prolongSession());
        }, 1000 * 60 * 90);
    })

    return (
        <div style={{backgroundColor: '#F7F8FC', minHeight: '100vh'}}>
            <AdminHeader/>
            <Switch>
                <Route exact path='/admin' component={() => {
                    return <Redirect to='/admin/overview'/>
                }}/>
                <Route exact path='/admin/overview' component={Overview}/>
                <Route exact path='/admin/goals' component={GoalList}/>
                <Route exact path='/admin/users' component={UserList}/>
            </Switch>
        </div>
    );
};

export default Admin;
