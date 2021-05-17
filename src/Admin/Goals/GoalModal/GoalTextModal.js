import React, {useState} from 'react';
import CustomInput from "../../../Helpers/components/customInput";
import TitleIcon from '@material-ui/icons/Title';
import DescriptionIcon from '@material-ui/icons/Description';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CustomButton from "../../../Helpers/components/CustomButton";
import {useDispatch} from "react-redux";
import {validateForm} from "../../../Helpers/Utils";
import {updateGoalData} from "../../../redux/Admin/adminMiddlewares";

const defaultMessage = {name: '', text: ''};

const GoalTextModal = ({data}) => {

    const [goalData, setGoalData] = useState(data);
    const [errorMessage, setErrorMessage] = useState(defaultMessage);
    const dispatch = useDispatch();

    const changeFunction = (event) => {
        event.preventDefault();
        let changedData = {...goalData};
        changedData[event.target.name] = event.target.value;
        setGoalData(changedData)
    }

    const submitChange = (e) => {
        e.preventDefault();
        const changeData = {
            goalId: goalData.id,
            organizationUserId: goalData.organizationUserId,
            data: {
                title: goalData.title,
                description: goalData.description,
                amount: goalData.amount,
            }
        }
        if (validateForm(changeData.data).name) {
            setErrorMessage(validateForm(changeData.data));
        } else {
            setErrorMessage(defaultMessage);
            dispatch(updateGoalData(changeData))
        }
        console.log(changeData)
    }

    return (
        <>
            <form onSubmit={submitChange}>
                <CustomInput type='text' label='Title' name='title' Icon={TitleIcon}
                             value={goalData.title} id='title'
                             changeFunction={changeFunction} errorMessage={errorMessage}/>
                <CustomInput type='text' label='Description' Icon={DescriptionIcon}
                             value={goalData.description} id='description'
                             changeFunction={changeFunction} name='description' errorMessage={errorMessage}/>
                <CustomInput type='number' label='Amount' Icon={AttachMoneyIcon}
                             value={goalData.amount} id='amount'
                             changeFunction={changeFunction} name='amount' errorMessage={errorMessage}/>
                <div className='modal_button' style={{margin: '30px'}}>
                    <CustomButton type='submit'>Update Goal</CustomButton>
                </div>
            </form>
        </>
    );
};

export default GoalTextModal;