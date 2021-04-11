import React, {useEffect, useState} from 'react';
import CustomInput from "../customInput";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import CustomSelect from "../customSelect";
import PublicIcon from "@material-ui/icons/Public";
import CustomButton from "../CustomButton";
import {validateForm} from "../../Utils";
import {updateUserData} from "../../../redux/User/userMiddlewares";
import {useDispatch, useSelector} from "react-redux";
import {countryList} from "../../Constants";

const defaultMessage = {name: '', text: ''};

const defaultState = {
    fullName: '',
    birthday: new Date().toISOString().split('T')[0],
    gender: 'MALE',
    country: 'Armenia',
}

const InfoContent = () => {

    const [userState, setUserState] = useState(defaultState);
    const [errorMessage, setErrorMessage] = useState(defaultMessage);

    const {userData} = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userData.id) {
            let setData = {
                fullName: userData.data.fullName,
                birthday: new Date(userData.data.birthday).toISOString().split('T')[0],
                country: userData.data.country,
                gender: userData.data.gender.toUpperCase(),
            }
            setUserState(setData)
        }
    }, [userData])

    const changeFunction = (event) => {
        event.preventDefault();

        let changedData = {...userState};
        let value = event.target.value;
        if (event.target.name === 'birthday' && new Date(value) > new Date()) {
            value = new Date().toISOString().split('T')[0]
        }
        changedData[event.target.name] = value;
        setUserState(changedData)
    }

    const setProfileData = (e) => {
        e.preventDefault();
        if (validateForm(userState).name) {
            setErrorMessage(validateForm(userState));
        } else {
            setErrorMessage(defaultMessage);
            dispatch(updateUserData({...userState, birthday: new Date(userState.birthday).getTime()}))
        }
    }

    return (
        <>
            <h2>Edit Profile</h2>
            <form onSubmit={setProfileData}>
                <CustomInput type='text' label='Full name' Icon={AccountCircleOutlinedIcon}
                             value={userState.fullName}
                             changeFunction={changeFunction} name='fullName' errorMessage={errorMessage}/>
                <label>
                    <CustomInput type='date' label='Birthdate' Icon={CalendarTodayOutlinedIcon}
                                 value={userState.birthday} changeFunction={changeFunction} name='birthday'
                                 errorMessage={errorMessage}/>
                </label>
                <CustomSelect label='Country' Icon={PublicIcon} options={countryList}
                              value={userState.country} changeFunction={changeFunction} name='country'/>
                <div className='modal_button'>
                    <CustomButton type='submit'>Save Changes</CustomButton>
                </div>
            </form>
        </>
    );
};

export default InfoContent;