import React, {useState} from 'react';
import './Profile.scss';
import {Link} from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CustomInput from "../../Helpers/components/customInput";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import CustomRadio from "../../Helpers/components/customRadio";
import WcOutlinedIcon from "@material-ui/icons/WcOutlined";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import CustomSelect from "../../Helpers/components/customSelect";
import PublicIcon from "@material-ui/icons/Public";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const defaultState = {
    fullName: '',
    birthday: new Date().toISOString().split('T')[0],
    country: 'Armenia',
    email: '',
}

const defaultMessage = {name: '', text: ''};

const Profile = () => {

    const [userState, setUserState] = useState(defaultState);
    const [errorMessage, setErrorMessage] = useState(defaultMessage);

    const changeFunction = (event) => {
        let changeData = {...userState};
        let value = event.target.value;
        console.log(value)
        if (event.target.name === 'birthday' && new Date(value) > new Date()) {
            value = new Date().toISOString().split('T')[0]
        }
        changeData[event.target.name] = value;
        setUserState(changeData)
    }

    return (
        <div className='profile_container'>
            <div className='profile_header'>
                <h2>My Profile</h2>
                <button onClick={() => {
                    localStorage.removeItem('auth_token');
                    sessionStorage.removeItem('auth_token');
                    history.push('/')
                }}>
                    Sign Out
                    <ExitToAppIcon/>
                </button>
            </div>
            <div className='profile_user_info'>
                <CustomInput type='text' placeholder='Full name' Icon={AccountCircleOutlinedIcon} value={userState.name}
                             changeFunction={changeFunction} name='fullName' errorMessage={errorMessage}/>
                <label>
                    <CustomInput type='date' placeholder='Birthdate' Icon={CalendarTodayOutlinedIcon}
                                 value={userState.birthday} changeFunction={changeFunction} name='birthday'
                                 errorMessage={errorMessage}/>
                </label>
                <CustomSelect placeholder='Country' Icon={PublicIcon}
                              value={userState.country} changeFunction={changeFunction} name='country'/>
                <CustomInput type='text' placeholder='Email' Icon={MailOutlineIcon}
                             value={userState.email} changeFunction={changeFunction} name='email'
                             errorMessage={errorMessage}/>
            </div>
        </div>
    );
};

export default Profile;