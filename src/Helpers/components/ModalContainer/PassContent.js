import React, {useState} from 'react';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CustomInput from "../customInput";
import CustomButton from "../CustomButton";
import {useDispatch} from "react-redux";
import {validateForm} from "../../Utils";
import {updateUserPassword} from "../../../redux/User/userMiddlewares";

const defaultMessage = {name: '', text: ''};

const defaultState = {
    password: '',
    oldPassword: '',
}

const PassContent = () => {

    const [passState, setPassState] = useState(defaultState);
    const [errorMessage, setErrorMessage] = useState(defaultMessage);

    const dispatch = useDispatch();

    const changeFunction = (event) => {
        event.preventDefault();

        let changedData = {...passState};
        changedData[event.target.name] = event.target.value;
        setPassState(changedData)
    }

    const setProfileData = (e) => {
        e.preventDefault();
        if (validateForm(passState).name) {
            setErrorMessage(validateForm(passState));
        } else {
            setErrorMessage(defaultMessage);
            dispatch(updateUserPassword(passState))
        }
    }

    return (
        <>
            <h2>Change Password</h2>
            <form onSubmit={setProfileData}>
                <CustomInput type='password' placeholder='Old password' Icon={LockOutlinedIcon}
                             value={passState.oldPassword} changeFunction={changeFunction} name='oldPassword'
                             errorMessage={errorMessage}/>
                <CustomInput type='password' placeholder='New password' Icon={LockOutlinedIcon}
                             value={passState.password} changeFunction={changeFunction} name='password'
                             errorMessage={errorMessage}/>
                <div className='modal_button'>
                    <CustomButton type='submit'>Save Changes</CustomButton>
                </div>
            </form>
        </>
    );
};

export default PassContent;