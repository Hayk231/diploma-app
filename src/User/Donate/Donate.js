import React, {useState} from 'react';
import './Donate.scss';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import CustomInput from "../../Helpers/components/customInput";
import CustomSelect from "../../Helpers/components/customSelect";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CreditCardIcon from "@material-ui/icons/CreditCard";
import CustomButton from "../../Helpers/components/CustomButton";
import {validateForm} from "../../Helpers/Utils";
import DonateSuccess from "./DonateSuccess";

const defaultMessage = {name: '', text: ''};

const defPaymentData = {amount: '', card: ''}

const Donate = () => {

    const {allGoals, creditCards} = useSelector(state => state.user);
    const {organizationUserId, goalId} = useParams();
    const goalData = allGoals.find(el => el.organizationUserId == organizationUserId && el.id == goalId);
    const [errorMessage, setErrorMessage] = useState(defaultMessage);
    const [paymentData, setPaymentData] = useState(defPaymentData);
    const [showSuccess, setShowSuccess] = useState(false);

    const changeFunction = (event) => {
        event.preventDefault();

        let changedData = {...paymentData};
        changedData[event.target.name] = event.target.value;
        setPaymentData(changedData)
    }

    const submitDonation = (event) => {
        event.preventDefault();
        if (validateForm(paymentData).name) {
            setErrorMessage(validateForm(paymentData));
        } else {
            setErrorMessage(defaultMessage);
            setShowSuccess(true)
        }
    }

    if (!goalData) return <div>loading</div>

    return (
        <div className='donate_container'>
            <div className='donate_content'>
                {
                    showSuccess
                        ? <DonateSuccess/>
                        : (
                        <>
                            <img src={goalData.thumbnailImageData.url} alt={goalData.title}/>
                            <h2>{goalData.title}</h2>
                            <form onSubmit={submitDonation}>
                                <CustomInput type='number' label='Amount' Icon={AttachMoneyIcon}
                                             value={paymentData.amount} changeFunction={changeFunction}
                                             name='amount' errorMessage={errorMessage}/>
                                <CustomSelect label='Payment Card' Icon={CreditCardIcon} options={creditCards}
                                              value={paymentData.card} changeFunction={changeFunction} name='card'/>
                                <CustomButton type='submit' customPadding='10px 35px' radius='4px'>Donate</CustomButton>
                            </form>
                        </>
                    )
                }

            </div>
        </div>
    );
};

export default Donate;