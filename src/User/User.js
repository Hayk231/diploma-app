import React, {lazy, useEffect} from 'react';
import './User.scss';
import {Link, Redirect, Route, Switch, useHistory} from "react-router-dom";
import DraftsOutlinedIcon from '@material-ui/icons/DraftsOutlined';
import AdjustIcon from '@material-ui/icons/Adjust';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "../redux/User/userMiddlewares";

const News = lazy(() => import("./News/News"));
const Goals = lazy(() => import("./Goals/Goals"));
const Notifications = lazy(() => import("./Notifications/Notifications"));
const Profile = lazy(() => import("./Profile/Profile"));

const navBarContents = [
    {label: 'News', icon: <DraftsOutlinedIcon/>, path: '/user/news'},
    {label: 'My Goals', icon: <AdjustIcon/>, path: '/user/goals'},
    {label: 'Notifications', icon: <NotificationsOutlinedIcon/>, path: '/user/notifications'},
    {label: '', icon: <AccountCircleIcon/>, path: '/user/profile'},
]

const User = () => {

    const {userData} = useSelector(state => state.user);

    const history = useHistory();
    console.log(history.location.pathname)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserData(localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')))
    }, [])

    return (
        <div className='user_container'>
            <div className='user_header'>
                <div>Logo</div>
                <div className='user_header_navbar'>
                    {
                        navBarContents.map(el => {
                            return (
                                <Link to={el.path} key={el.path}>
                                    {el.label}
                                    {el.icon}
                                    <div className={el.path === history.location.pathname ?
                                        'user_header_navbar_item_active' : ''}> </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            <Switch>
                <Route exact path='/user' component={() => {return <Redirect to="/user/news" />}}/>
                <Route exact path='/user/news' component={News}/>
                <Route exact path='/user/goals' component={Goals}/>
                <Route exact path='/user/notifications' component={Notifications}/>
                <Route exact path='/user/profile' component={Profile}/>
            </Switch>
            {/*<button onClick={() => {*/}
            {/*    localStorage.removeItem('auth_token');*/}
            {/*    sessionStorage.removeItem('auth_token');*/}
            {/*    history.push('/')*/}
            {/*}}>Log out</button>*/}
        </div>
    );
};

export default User;
