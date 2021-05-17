import React, {lazy, useEffect} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {prolongSession} from "../redux/User/userMiddlewares";
import {useDispatch} from "react-redux";
import {outUser} from "../redux/Admin/adminActions";

const Overview = lazy(() => import("./Overview/Overview"));
const GoalList = lazy(() => import("./Goals/GoalList"));

const Admin = () => {

    // const history = useHistory();
    const dispatch = useDispatch()

    useEffect(() => {
        setInterval(() => {
            dispatch(prolongSession());
        }, 1000 * 60 * 90);
    })

    return (
        <>
            <button onClick={() => dispatch(outUser())}>Sign Out</button>
            <Switch>
                <Route exact path='/admin' component={() => {
                    return <Redirect to='/admin/overview'/>
                }}/>
                <Route exact path='/admin/overview' component={Overview}/>
                <Route exact path='/admin/goals' component={GoalList}/>
            </Switch>
        </>
    );
};

export default Admin;
