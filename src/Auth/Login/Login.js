import React, {useState} from 'react';
import './Login.scss';
import CustomInput from "../../Helpers/components/customInput";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {Link, useHistory} from "react-router-dom";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import googleIcon from "./images/google.png";
import fbIcon from "./images/fb.png";
import twitterIcon from "./images/twitter.png";
import {validateForm} from "../../Helpers/Utils";
import axios from "axios";
import {baseUrl} from "../../Helpers/Constants";

const defaultLoginData = {
    email: '',
    password: '',
}

const defaultMessage = {name: '', text: ''};

const Login = () => {
    const [userLoginState, setUserLoginState] = useState(defaultLoginData);
    const [remember, setRemember] = useState(false);
    const [errorMessage, setErrorMessage] = useState(defaultMessage);
    const history = useHistory();

    const changeFunction = (event) => {
        let changeData = {...userLoginState};
        changeData[event.target.name] = event.target.value;
        setUserLoginState(changeData)
        errorMessage && setErrorMessage(defaultMessage);
    }

    const submitLogin = (event) => {
        event.preventDefault();
        if (validateForm(userLoginState).name) {
            setErrorMessage(validateForm(userLoginState));
        } else {
            setErrorMessage(defaultMessage);
            let {email, password} = userLoginState;
            axios.post(baseUrl + 'login', {
                email,
                password
            }).then(res => {
                let storage = remember ? localStorage : sessionStorage;
                storage.setItem('auth_token', res.data.token)
                storage.setItem('role', res.data.role);
                history.push('/')
            })
        }
    }

    return (
        <div className='auth_login_card'>
            <form onSubmit={submitLogin} autoComplete="on" >
                <h1>Sign in</h1>
                <CustomInput type='text' placeholder='Email' Icon={MailOutlineIcon} value={userLoginState.name}
                             changeFunction={changeFunction} name='email' errorMessage={errorMessage}/>
                <CustomInput type='password' placeholder='Password' Icon={LockOutlinedIcon} value={userLoginState.name}
                             changeFunction={changeFunction} name='password' errorMessage={errorMessage}/>
                <div className='auth_login_forgot'>
                    <Link to='/auth/reset'>
                        Forgot password?
                    </Link>
                </div>
                <div className='auth_login_remember'>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Remember me"
                    />
                </div>
                <div className='auth_login_button'>
                    <button type="submit">Sign in</button>
                    {/*<input type="submit" value='Sign in'/>*/}
                </div>
                <div className='auth_login_social'>
                    <div className='auth_login_social_label'>
                        <span>or sign in with</span>
                    </div>
                    <div className='auth_login_social_icons'>
                        <img src={googleIcon} alt='googleIcon'/>
                        <img src={fbIcon} alt='fbIcon'/>
                        <img src={twitterIcon} alt='twitterIcon'/>
                    </div>
                </div>
                <div className='auth_login_bottom_cont'>
                    Don’t have an account?
                    <Link to='/auth/signup'>Sign up</Link>
                </div>
            </form>
            <div className='auth_login_card_img'> </div>
        </div>
    );
};

export default Login;