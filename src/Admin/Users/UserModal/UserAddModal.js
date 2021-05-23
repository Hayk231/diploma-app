import React, {useState} from 'react';
import CustomInput from "../../../Helpers/components/customInput";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import CustomRadio from "../../../Helpers/components/customRadio";
import WcOutlinedIcon from "@material-ui/icons/WcOutlined";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import CustomSelect from "../../../Helpers/components/customSelect";
import PublicIcon from "@material-ui/icons/Public";
import {baseUrl, countryList, getToken} from "../../../Helpers/Constants";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {MenuItem, Select} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CustomButton from "../../../Helpers/components/CustomButton";
import {validateForm} from "../../../Helpers/Utils";
import axios from "axios";
import {setLoading} from "../../../redux/loadingActions";
import {outUser, triggerChange} from "../../../redux/Admin/adminActions";
import {closeEditModal} from "../../../redux/User/userActions";

const defaultData = {
    fullName: '',
    gender: 'MALE',
    birthday: new Date().toISOString().split('T')[0],
    country: 'Armenia',
    email: '',
    password: '',
    conf_password: '',
};

const defaultMessage = {name: '', text: ''};

const UserAddModal = ({data}) => {

    const [userData, setUserData] = useState(defaultData);
    const [errorMessage, setErrorMessage] = useState(defaultMessage);
    const [role, setRole] = useState('USER');
    const history = useHistory();
    const dispatch = useDispatch();

    const changeFunction = (event) => {
        let changeData = {...userData};
        let value = event.target.value;
        if (event.target.name === 'birthday' && new Date(value) > new Date()) {
            value = new Date().toISOString().split('T')[0]
        }
        changeData[event.target.name] = value;
        setUserData(changeData)
        errorMessage && setErrorMessage(defaultMessage);
    }

    const changeRole = (value) => {
        setUserData(defaultData);
        setRole(value)
    }

    const addUser = (event) => {
        event.preventDefault();
        let {fullName, gender, birthday, country, email, password, conf_password} = userData;
        let data = {
            fullName,
            gender,
            birthday: new Date(birthday).getTime(),
            country
        };
        if (role === 'ORGANIZATION') {
            data = { fullName }
        } else if (role === 'ADMIN') { data = {} }

        const pushData = {
            email,
            role,
            data,
            password
        };
        const token = getToken();
        if (token) {
            const AuthStr = 'Bearer '.concat(token);
            if (validateForm({email, ...data, password, conf_password}).name) {
                setErrorMessage(validateForm({email, ...data, password, conf_password}));
            } else {
                setErrorMessage(defaultMessage);
                axios.post(baseUrl + `users/${role}`, pushData, {headers: {Authorization: AuthStr}}).then(() => {
                    dispatch(triggerChange());
                    dispatch(closeEditModal(false))
                }).catch(error => {
                    const message = error.response.data.message;
                    if (message.toLowerCase().includes('email')) {
                        setErrorMessage({name: 'email', text: message});
                    }
                });
            }
        } else {
            dispatch(outUser())
        }
    }

    const createFieldList = () => {
        let fields =  (
                <>
                    <CustomInput type='text' label='Full name' Icon={AccountCircleOutlinedIcon} value={userData.name}
                                 changeFunction={changeFunction} name='fullName' id='fullName' errorMessage={errorMessage}/>
                    <CustomRadio options={[{value: 'MALE', 'label': 'Male'}, {value: 'FEMALE', 'label': 'Female'}]}
                                 Icon={WcOutlinedIcon} label='Gender' value={userData.gender}
                                 changeFunction={changeFunction} name='gender' id='gender'/>
                    <label>
                        <CustomInput type='date' label='Birthdate' Icon={CalendarTodayOutlinedIcon}
                                     value={userData.birthday} changeFunction={changeFunction} name='birthday' id='birthday'
                                     errorMessage={errorMessage}/>
                    </label>
                    <CustomSelect label='Country' Icon={PublicIcon} options={countryList}
                                  value={userData.country} changeFunction={changeFunction} name='country' id='country'/>
                </>
            );
        if (role === 'ORGANIZATION') {
            fields = (
                <CustomInput type='text' label='Full name' Icon={AccountCircleOutlinedIcon} value={userData.name}
                             changeFunction={changeFunction} name='fullName' id='fullName' errorMessage={errorMessage}/>
            )
        } else if (role === 'ADMIN') {
            fields = ''
        }
        return fields
    }

    const dataFields = createFieldList()

    return (
        <>
            <Select
                value={role}
                onChange={event => changeRole(event.target.value)}
            >
                {
                    data.roles.map(el => (
                        <MenuItem value={el.value} key={el.value}>{el.label}</MenuItem>
                    ))
                }
            </Select>
            <form onSubmit={addUser}>
                <CustomInput type='text' label='Email' Icon={MailOutlineIcon}
                             value={userData.email} changeFunction={changeFunction} name='email' id='email'
                             errorMessage={errorMessage}/>
                {dataFields}
                <CustomInput type='password' label='Password' Icon={LockOutlinedIcon}
                             value={userData.password} changeFunction={changeFunction} name='password' id='password'
                             errorMessage={errorMessage}/>
                <CustomInput type='password' label='Confirm Password' Icon={LockOutlinedIcon}
                             value={userData.conf_password} changeFunction={changeFunction} name='conf_password' id='conf_password'
                             errorMessage={errorMessage}/>
                <div className='modal_button' style={{margin: '30px'}}>
                    <CustomButton type='submit'>Create</CustomButton>
                </div>
            </form>
        </>
    );
};

export default UserAddModal;