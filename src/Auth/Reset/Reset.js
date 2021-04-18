import CustomInput from "../../Helpers/components/customInput";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import './Reset.scss';
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {validateForm} from "../../Helpers/Utils";
import axios from "axios";
import {baseUrl} from "../../Helpers/Constants";
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "../../redux/loadingActions";
import Loading from "../../Helpers/components/Loading/Loading";

const defaultEmailResetData = {
    email: '',
}

const defaultMessage = {name: '', text: ''};

const Reset = () => {

    const [resetEmailState, setResetEmailState] = useState(defaultEmailResetData);
    const [errorMessage, setErrorMessage] = useState(defaultMessage);
    const history = useHistory();
    const { loading } = useSelector(state => state.loading);
    const dispatch = useDispatch();

    const changeFunction = (event) => {
        let changeData = {...resetEmailState};
        changeData[event.target.name] = event.target.value;
        setResetEmailState(changeData)
        errorMessage && setErrorMessage(defaultMessage);
    }

    const submitResetEmail = (event) => {
        event.preventDefault();
        if (validateForm(resetEmailState).name) {
            setErrorMessage(validateForm(resetEmailState));
        } else {
            setErrorMessage(defaultMessage);
            let {email} = resetEmailState;
            dispatch(setLoading(true));
            axios.post(baseUrl + 'users/USER/reset_tokens', {
                email,
            }).then(res => {
                dispatch(setLoading(false));
                history.push('/auth/new_password')
            })
        }
    }

    return (
        <form className='auth_reset_card' onSubmit={submitResetEmail}>
            { loading && <Loading/> }
            <h1>Reset Password</h1>
            <p>Please enter your email address</p>
            <CustomInput type='text' placeholder='Email' Icon={MailOutlineIcon} value={resetEmailState.email}
                         changeFunction={changeFunction} name='email' errorMessage={errorMessage}/>
            <div className='auth_reset_button'>
                <button type='submit'>Send</button>
            </div>
        </form>
    );
};

export default Reset;