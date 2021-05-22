import React, {lazy, useEffect} from 'react';
import {Link, Redirect, Route, Switch, useHistory} from "react-router-dom";
import {prolongSession} from "../redux/User/userMiddlewares";
import {useDispatch} from "react-redux";
import {outUser} from "../redux/Admin/adminActions";
import BurgerMenu from "../Helpers/components/BurgerMenu/BurgerMenu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {Fade, Menu, MenuItem} from "@material-ui/core";
import DraftsOutlinedIcon from "@material-ui/icons/DraftsOutlined";
import AdjustIcon from "@material-ui/icons/Adjust";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import AdminHeader from "./AdminHeader/AdminHeader";

const Overview = lazy(() => import("./Overview/Overview"));
const GoalList = lazy(() => import("./Goals/GoalList"));


const Admin = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        setInterval(() => {
            dispatch(prolongSession());
        }, 1000 * 60 * 90);
    })

    return (
        <div style={{backgroundColor: '#F7F8FC'}}>
            <AdminHeader/>
            <button onClick={() => dispatch(outUser())}>Sign Out</button>
            <Switch>
                <Route exact path='/admin' component={() => {
                    return <Redirect to='/admin/overview'/>
                }}/>
                <Route exact path='/admin/overview' component={Overview}/>
                <Route exact path='/admin/goals' component={GoalList}/>
            </Switch>
        </div>
    );
};

export default Admin;
