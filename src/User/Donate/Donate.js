import React, {useEffect, useRef, useState} from 'react';
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
import {baseUrl, getToken} from "../../Helpers/Constants";
import axios from "axios";
import {setLoading} from "../../redux/loadingActions";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const defaultMessage = {name: '', text: ''};

const defPaymentData = {email: '', amount: ''}

const Donate = () => {

    const [donationDone, setDonationDone] = useState(false);
    const {loading} = useSelector(state => state.loading);
    const {goalId} = useParams();
    const dispatch = useDispatch();
    const [goalData, setGoalData] = useState()
    const [errorMessage, setErrorMessage] = useState(defaultMessage);
    const [paymentData, setPaymentData] = useState(defPaymentData);
    const paypalButtonRef = useRef(null);

    useEffect(() => {
        getGoalData();
    }, []);

    const getGoalData = () => {
        const AuthStr = 'Bearer '.concat(getToken());
        axios.get(baseUrl + 'goals', {
            params: {filter: 'ID', goalId},
            headers: {Authorization: AuthStr}
        }).then(res => {
            setGoalData(res.data[0])
        })
    }
    useEffect(() => {
        if (goalData && paypalButtonRef.current && !paypalButtonRef.current.hasChildNodes()) {
            const AuthStr = 'Bearer '.concat(getToken());
            paypal.Buttons({
                createOrder: (data, actions) => {
                    const donateData = submitDonation();
                    if (donateData) {
                        return axios.post(baseUrl + 'donations/' + goalId,
                            {amount: donateData.amount, email: donateData.email},
                            {headers: {Authorization: AuthStr}}).then(res => res.data.id)
                    } else {
                        return actions.reject()
                    }
                },
                onApprove: (data) => {
                    dispatch(setLoading(true));
                    axios.put(baseUrl + `donations/${goalId}/${data.orderID}`, '',
                        {headers: {Authorization: AuthStr}}).then(() => {
                        dispatch(setLoading(false))
                        setDonationDone(true);
                    })
                },
                onCancel: (err) => {
                    axios.delete(baseUrl + `donations/${goalId}/${err.orderID}`,
                        {headers: {Authorization: AuthStr}}).then(res => {
                        dispatch(setLoading(false))
                        alert('Something went wrong')
                    })
                },
            }).render(paypalButtonRef.current);
        }
    }, [goalData])

    const changeFunction = (event) => {
        event.preventDefault();
        let changedData = {...paymentData};
        changedData[event.target.name] = event.target.value;
        setPaymentData(changedData)
    }

    const submitDonation = () => {
        const checkData = {
            email: document.getElementById('paypal_email').value,
            amount: parseInt(document.getElementById('paypal_amount').value),
        }
        if (validateForm(checkData).name) {
            setErrorMessage(validateForm(checkData));
            return false
        } else {
            setErrorMessage(defaultMessage);
            return checkData
        }
    }

    if (!goalData || loading) return <Loading/>

    return (
        <div className='donate_container'>
            <div className='donate_content'>
                {
                    donationDone
                        ? <DonateSuccess/>
                        : (
                            <>
                                <img src={goalData.thumbnailImageData ? goalData.thumbnailImageData.url : defImage}
                                     alt={goalData.title}/>
                                <h2>{goalData.title}</h2>
                                <form>
                                    <CustomInput type='text' label='Paypal Email' Icon={MailOutlineIcon}
                                                 value={paymentData.email} changeFunction={changeFunction} name='email'
                                                 errorMessage={errorMessage} id='paypal_email'/>
                                    <CustomInput type='number' label='Amount' Icon={AttachMoneyIcon}
                                                 value={paymentData.amount} changeFunction={changeFunction}
                                                 name='amount' errorMessage={errorMessage} id='paypal_amount'/>
                                    {/*<CustomSelect label='Payment Card' Icon={CreditCardIcon} options={creditCards}*/}
                                    {/*              value={paymentData.card} changeFunction={changeFunction} name='card'/>*/}
                                    {/*<CustomButton type='submit' customPadding='10px 35px' radius='4px'>Donate</CustomButton>*/}
                                </form>
                                <div ref={paypalButtonRef}></div>
                            </>
                        )
                }

            </div>
        </div>
    );
};

export default Donate;