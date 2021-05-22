import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {validateForm} from "../../../Helpers/Utils";
import CustomInput from "../../../Helpers/components/customInput";
import TitleIcon from "@material-ui/icons/Title";
import DescriptionIcon from "@material-ui/icons/Description";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CustomButton from "../../../Helpers/components/CustomButton";
import {baseUrl, getToken} from "../../../Helpers/Constants";
import axios from "axios";
import {outUser} from "../../../redux/Admin/adminActions";
import Loading from "../../../Helpers/components/Loading/Loading";
import ApartmentIcon from '@material-ui/icons/Apartment';
import CustomSelect from "../../../Helpers/components/customSelect";
import {addGoal} from "../../../redux/Admin/adminMiddlewares";

const defaultMessage = {name: '', text: ''};
const defaultGoalData = {organization: '', title: '', description: '', amount: ''}

const GoalAddModal = () => {

    const [newGoalData, setNewGoalData] = useState(defaultGoalData);
    const [errorMessage, setErrorMessage] = useState(defaultMessage);
    const [organizations, setOrganizations] = useState([]);
    const [customLoading, setCustomLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const token = getToken();
        if (token) {
            setCustomLoading(true)
            const AuthStr = 'Bearer '.concat(token);
            axios.post(baseUrl + 'users',
                {
                    role: "ORGANIZATION",
                    blocked: false,
                },{headers: {Authorization: AuthStr}}
            ).then(res => {
                setOrganizations(res.data.items.map(el => { return {id: el.id, value: el.email}}));
                setNewGoalData({...newGoalData, organization: res.data.items[0].id})
                setCustomLoading(false)
            }).catch(error => {
                setCustomLoading(false)
                if (error && error.response && error.response.status === 401) {
                    dispatch(outUser())
                }
            })
        } else {
            dispatch(outUser())
        }
    },[])

    const changeFunction = (event) => {
        event.preventDefault();
        let changedData = {...newGoalData};
        changedData[event.target.name] = event.target.value;
        setNewGoalData(changedData)
    }

    const submitChange = (e) => {
        e.preventDefault();
        const addData = {
            organizationUserId: newGoalData.organization,
            data: {
                title: newGoalData.title,
                description: newGoalData.description,
                amount: parseFloat(newGoalData.amount),
            }
        }
        if (validateForm(addData.data).name) {
            setErrorMessage(validateForm(addData.data));
        } else {
            setErrorMessage(defaultMessage);
            dispatch(addGoal(addData))
        }
    }

    return (
        <>
            {customLoading && <Loading/>}
            <form onSubmit={submitChange}>
                <CustomSelect label='Organization' Icon={ApartmentIcon} options={organizations}
                              value={newGoalData.organization} changeFunction={changeFunction} name='organization'/>
                <CustomInput type='text' label='Title' name='title' Icon={TitleIcon}
                             value={newGoalData.title} id='title'
                             changeFunction={changeFunction} errorMessage={errorMessage}/>
                <CustomInput type='text' label='Description' Icon={DescriptionIcon}
                             value={newGoalData.description} id='description'
                             changeFunction={changeFunction} name='description' errorMessage={errorMessage}/>
                <CustomInput type='number' label='Amount' Icon={AttachMoneyIcon}
                             value={newGoalData.amount} id='amount'
                             changeFunction={changeFunction} name='amount' errorMessage={errorMessage}/>
                <div className='modal_button' style={{margin: '30px'}}>
                    <CustomButton type='submit'>Add Goal</CustomButton>
                </div>
            </form>
        </>
    );
};

export default GoalAddModal;