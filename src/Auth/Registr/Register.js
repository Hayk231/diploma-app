import React, {useState} from 'react';
import './Register.scss';
import CustomInput from "../../Helpers/components/customInput";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import CustomRadio from "../../Helpers/components/customRadio";
import WcOutlinedIcon from "@material-ui/icons/WcOutlined";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import PublicIcon from "@material-ui/icons/Public";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {Link, useHistory} from "react-router-dom";
import {validateForm} from "../../Helpers/Utils";
import axios from "axios";
import {baseUrl} from "../../Helpers/Constants";

const defaultState = {
    name: '',
    gender: 'male',
    birthdate: new Date().toISOString().split('T')[0],
    country: '',
    email: '',
    password: '',
    conf_password: '',
}

const defaultMessage = {name: '', text: ''};

const Register = () => {

    const [userState, setUserState] = useState(defaultState);
    const [errorMessage, setErrorMessage] = useState(defaultMessage);
    const history = useHistory();

    const submitRegister = (event) => {
        event.preventDefault();
        if (validateForm(userState).name) {
            setErrorMessage(validateForm(userState));
        } else {
            setErrorMessage(defaultMessage);
            let {name, gender, birthdate, country, email, password} = userState;
            axios.post(baseUrl + 'users/USER', {
                email,
                role: "USER",
                data: {
                    name,
                    gender,
                    birthdate,
                    country
                },
                password
            }).catch(err => console.log(err));
            history.push('/auth/confirmation')
        }
    }

    const changeFunction = (event) => {
        let changeData = {...userState};
        let value = event.target.value;
        console.log(value)
        if (event.target.name === 'birthdate' && new Date(value) > new Date()) {
            value = new Date().toISOString().split('T')[0]
        }
        console.log(value)
        changeData[event.target.name] = value;
        setUserState(changeData)
        errorMessage && setErrorMessage(defaultMessage);
    }

    return (
        <div className='auth_register_card'>
            <form onSubmit={submitRegister}>
                <h1>Create account</h1>
                <CustomInput type='text' placeholder='Full name' Icon={AccountCircleOutlinedIcon} value={userState.name}
                             changeFunction={changeFunction} name='name' errorMessage={errorMessage}/>
                <CustomRadio options={[{value: 'male', 'label': 'Male'}, {value: 'female', 'label': 'Female'}]}
                             Icon={WcOutlinedIcon} label='Gender' value={userState.gender}
                             changeFunction={changeFunction} name='gender'/>
                <label>
                    <CustomInput type='date' placeholder='Birthdate' Icon={CalendarTodayOutlinedIcon}
                                 value={userState.birthdate} changeFunction={changeFunction} name='birthdate'
                                 errorMessage={errorMessage}/>
                </label>
                <CustomInput type='text' placeholder='Country' Icon={PublicIcon}
                             value={userState.country} changeFunction={changeFunction} name='country'
                             errorMessage={errorMessage}/>
                <CustomInput type='text' placeholder='Email' Icon={MailOutlineIcon}
                             value={userState.email} changeFunction={changeFunction} name='email'
                             errorMessage={errorMessage}/>
                <CustomInput type='password' placeholder='Password' Icon={LockOutlinedIcon}
                             value={userState.password} changeFunction={changeFunction} name='password'
                             errorMessage={errorMessage}/>
                <CustomInput type='password' placeholder='Confirm Password' Icon={LockOutlinedIcon}
                             value={userState.conf_password} changeFunction={changeFunction} name='conf_password'
                             errorMessage={errorMessage}/>

                <div className='auth_register_button'>
                    <button>Sign up</button>
                </div>
                <div className='auth_register_bottom_cont'>
                    Already have an account?
                    <Link to='/auth/login'>Sign in</Link>
                </div>
            </form>
            <div className='auth_register_card_img'></div>
        </div>
    );
};

export default Register;