import React, {useEffect, useState} from 'react';
import './Donate.scss';
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CustomInput from "../../Helpers/components/customInput";
// import CustomSelect from "../../Helpers/components/customSelect";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import CreditCardIcon from "@material-ui/icons/CreditCard";
import CustomButton from "../../Helpers/components/CustomButton";
import {validateForm} from "../../Helpers/Utils";
import DonateSuccess from "./DonateSuccess";
import {donationCreate} from "../../redux/User/userMiddlewares";
import {setDonationDone} from "../../redux/User/userActions";
import defImage from "../images/default_image.jpg";
import Loading from "../../Helpers/components/Loading/Loading";

const defaultMessage = {name: '', text: ''};

const defPaymentData = {amount: ''}

const Donate = () => {

    const {allGoals, donationDone, creditCards} = useSelector(state => state.user);
    const {organizationUserId, goalId} = useParams();
    const dispatch = useDispatch();
    const goalData = allGoals.find(el => el.organizationUserId == organizationUserId && el.id == goalId);
    const [errorMessage, setErrorMessage] = useState(defaultMessage);
    const [paymentData, setPaymentData] = useState(defPaymentData);

    useEffect(() => {
        dispatch(setDonationDone(false))
    },[])

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
            dispatch(donationCreate(goalId, paymentData.amount))
        }
    }

    if (!goalData) return <Loading/>

    return (
        <div className='donate_container'>
            <div className='donate_content'>
                {
                    donationDone
                        ? <DonateSuccess/>
                        : (
                        <>
                            <img src={goalData.thumbnailImageData ? goalData.thumbnailImageData.url : defImage} alt={goalData.title}/>
                            <h2>{goalData.title}</h2>
                            <form onSubmit={submitDonation}>
                                <CustomInput type='number' label='Amount' Icon={AttachMoneyIcon}
                                             value={paymentData.amount} changeFunction={changeFunction}
                                             name='amount' errorMessage={errorMessage}/>
                                {/*<CustomSelect label='Payment Card' Icon={CreditCardIcon} options={creditCards}*/}
                                {/*              value={paymentData.card} changeFunction={changeFunction} name='card'/>*/}
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