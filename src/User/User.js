import React, {lazy, useEffect} from 'react';
import './User.scss';
import {Link, Redirect, Route, Switch, useHistory} from "react-router-dom";
import DraftsOutlinedIcon from '@material-ui/icons/DraftsOutlined';
import AdjustIcon from '@material-ui/icons/Adjust';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useDispatch, useSelector} from "react-redux";
import {getGoals, getNotifications, getUserData, prolongSession} from "../redux/User/userMiddlewares";
import { Fade, Menu, MenuItem} from "@material-ui/core";
import BurgerMenu from "../Helpers/components/BurgerMenu/BurgerMenu";

const News = lazy(() => import("./News/News"));
const Goals = lazy(() => import("./MyGoals/MyGoals"));
const Notifications = lazy(() => import("./Notifications/Notifications"));
const Profile = lazy(() => import("./Profile/Profile"));
const Goal = lazy(() => import("./Goal/Goal"));
const Donate = lazy(() => import("./Donate/Donate"));

const navBarContents = [
    {label: 'News', icon: <DraftsOutlinedIcon/>, path: '/user/news'},
    {label: 'My Goals', icon: <AdjustIcon/>, path: '/user/my-goals'},
    {label: 'Notifications', icon: <NotificationsOutlinedIcon/>, path: '/user/notifications'},
]

const User = () => {

    const { notifications } = useSelector(state => state.user);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserData());
        dispatch(getGoals('DISCOVER'));
        dispatch(getNotifications());
        setInterval(() => {
            dispatch(prolongSession());
        }, 1000 * 60 * 90);
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goToProfile = () => {
        handleClose()
        history.push('/user/profile')
    }

    const handleSignOut = () => {
        handleClose()
        localStorage.removeItem('auth_token');
        sessionStorage.removeItem('auth_token');
        history.push('/')
    }

    const newNotifCount = notifications.filter(el => el.isNew).length;

    return (
        <div className='user_container'>
            <div className='user_header'>
                <Link to='/' style={{color: '#fff'}}>Logo</Link>
                <BurgerMenu defContents={[...navBarContents, {label: 'My profile', path: '/user/profile'}]}/>
                <div className='user_header_navbar'>
                    {
                        navBarContents.map(el => {
                            return (
                                <Link to={el.path} key={el.path} className={el.path === history.location.pathname ?
                                    'user_header_navbar_item_active' : ''}>
                                    {el.label}
                                    {el.icon}
                                    {
                                        el.label === 'Notifications' && newNotifCount > 0 &&
                                            <div className='new_notif_indicator'> </div>
                                    }
                                </Link>
                            )
                        })
                    }
                    <div className='user_header_navbar_popover'>
                        <AccountCircleIcon onClick={handleClick}/>
                        <Menu
                            id="fade-menu"
                            anchorEl={anchorEl}
                            anchorPosition={{left: 20, top: 40}}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                            classes={{paper: 'header_popover'}}
                            TransitionComponent={Fade}
                        >
                            <MenuItem onClick={goToProfile}>My profile</MenuItem>
                            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
            <Switch>
                <Route exact path='/user' component={() => {
                    return <Redirect to="/user/news"/>
                }}/>
                <Route exact path='/user/news' component={News}/>
                <Route exact path='/user/my-goals' component={Goals}/>
                <Route exact path='/user/notifications' component={Notifications}/>
                <Route exact path='/user/profile' component={Profile}/>
                <Route exact path='/user/goal/:goalId' component={Goal}/>
                <Route exact path='/user/donate/:goalId' component={Donate}/>
            </Switch>
        </div>
    );
}

export default User;
