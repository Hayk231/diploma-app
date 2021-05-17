import React, {useState} from 'react';
import CustomInput from "../customInput";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import CustomButton from "../CustomButton";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {useDispatch} from "react-redux";
import {validateForm} from "../../Utils";

const defaultMessage = {name: '', text: ''};

const defaultState = {
    cardHolder: 'John Smith',
    expire: new Date().toISOString().split('T')[0],
    cardNumber: '4561 2778 5633 3522',
    cvv: '083',
}

const CardContent = () => {

    const [cardState, setCardState] = useState(defaultState);
    const [errorMessage, setErrorMessage] = useState(defaultMessage);

    const dispatch = useDispatch();

    const changeFunction = (event) => {
        event.preventDefault();

        let changedData = {...cardState};
        changedData[event.target.name] = event.target.value;
        setCardState(changedData)
    }

    const addCreditCard = (e) => {
        e.preventDefault();
        if (validateForm(cardState).name) {
            setErrorMessage(validateForm(cardState));
        } else {
            setErrorMessage(defaultMessage);
            // dispatch(updateUserData({...cardState, birthday: new Date(cardState.birthday).getTime()}))
        }
    }

    return (
        <>
            <h2>Add Credit Card</h2>
            <form onSubmit={addCreditCard}>
                <CustomInput type='text' label='Card Holder' Icon={AccountCircleOutlinedIcon}
                             value={cardState.cardHolder} changeFunction={changeFunction}
                             name='cardHolder' errorMessage={errorMessage}/>
                <CustomInput type='text' label='Card Number' Icon={CreditCardIcon}
                             changeFunction={changeFunction} value={cardState.cardNumber} name='cardNumber'/>
                <label>
                    <CustomInput type='date' label='Expire Date' Icon={CalendarTodayOutlinedIcon}
                                 value={cardState.expire} changeFunction={changeFunction} name='expire'
                                 errorMessage={errorMessage}/>
                </label>
                <CustomInput type='text' label='CVV' Icon={LockOutlinedIcon}
                             value={cardState.cvv} changeFunction={changeFunction} name='cvv'
                             errorMessage={errorMessage}/>
                <div className='modal_button'>
                    <CustomButton type='submit'>Add card</CustomButton>
                </div>
            </form>
        </>
    );
};

export default CardContent;