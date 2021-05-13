import React, {lazy} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

const Overview = lazy(() => import("./Overview/Overview"));
const GoalList = lazy(() => import("./GoalList/GoalList"));


const Admin = () => {
    return (
        <Switch>
            <Route exact path='/admin' component={() => {
                return <Redirect to='/admin/overview'/>
            }}/>
            <Route exact path='/admin/overview' component={Overview}/>
            <Route exact path='/admin/goals' component={GoalList}/>
        </Switch>
    );
};

export default Admin;
