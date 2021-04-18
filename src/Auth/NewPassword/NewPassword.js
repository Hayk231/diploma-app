import '../Reset/Reset.scss';
import CustomInput from "../../Helpers/components/customInput";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, {useState} from "react";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {useHistory} from "react-router-dom";
import {validateForm} from "../../Helpers/Utils";
import axios from "axios";
import {baseUrl} from "../../Helpers/Constants";
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "../../redux/loadingActions";
import Loading from "../../Helpers/components/Loading/Loading";

const defaultNewPassData = {
    token: '',
    password: '',
    conf_password: '',
}

const defaultMessage = {name: '', text: ''};

const NewPassword = () => {

    const [resetNewPassState, setResetNewPassState] = useState(defaultNewPassData);
    const [errorMessage, setErrorMessage] = useState(defaultMessage);
    const history = useHistory();
    const { loading } = useSelector(state => state.loading);
    const dispatch = useDispatch();

    const changeFunction = (event) => {
        let changeData = {...resetNewPassState};
        changeData[event.target.name] = event.target.value;
        setResetNewPassState(changeData)
        errorMessage && setErrorMessage(defaultMessage);
    }

    const submitResetEmail = (event) => {
        event.preventDefault();
        if (validateForm(resetNewPassState).name) {
            setErrorMessage(validateForm(resetNewPassState));
        } else {
            setErrorMessage(defaultMessage);
            let {token, password} = resetNewPassState;
            dispatch(setLoading(true));
            axios.put(baseUrl + 'users/USER/reset_tokens', {
                token,
                password
            }).then(res => {
                dispatch(setLoading(false));
                history.push('/auth/login')
            })
        }
    }

    return (
        <form className='auth_new_pass_card' onSubmit={submitResetEmail}>
            { loading && <Loading/> }
            <h1>New Password</h1>
            <p>Please enter your recovery code from email and your new password</p>
            <CustomInput type='text' placeholder='Code' Icon={VpnKeyIcon}
                         value={resetNewPassState.token} changeFunction={changeFunction}
                         name='token' errorMessage={errorMessage}/>
            <CustomInput type='password' placeholder='Password' Icon={LockOutlinedIcon}
                         value={resetNewPassState.password} changeFunction={changeFunction}
                         name='password' errorMessage={errorMessage}/>
            <CustomInput type='password' placeholder='Confirm Password' Icon={LockOutlinedIcon}
                         value={resetNewPassState.conf_password} changeFunction={changeFunction}
                         name='conf_password' errorMessage={errorMessage}/>
            <div className='auth_new_pass_button'>
                <button type='submit'>Confirm</button>
            </div>
        </form>
    );
};

export default NewPassword;