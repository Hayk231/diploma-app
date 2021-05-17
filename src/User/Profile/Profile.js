import React from 'react';
import './Profile.scss';
import {useHistory} from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CustomInput from "../../Helpers/components/customInput";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import CustomSelect from "../../Helpers/components/customSelect";
import PublicIcon from "@material-ui/icons/Public";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import EditIcon from '@material-ui/icons/Edit';
import {useDispatch, useSelector} from "react-redux";
import CustomButton from "../../Helpers/components/CustomButton";
import ModalContainer from "../../Helpers/components/ModalContainer/ModalContainer";
import {openEditModal, deleteCreditCard, outUser} from "../../redux/User/userActions";
import {countryList} from "../../Helpers/Constants";
import Loading from "../../Helpers/components/Loading/Loading";

const Profile = () => {

    const {userData, editModal, creditCards} = useSelector(state => state.user);
    const { loading } = useSelector(state => state.loading);
    const dispatch = useDispatch();
    const history = useHistory()

    const birthday = userData.data.birthday && new Date(userData.data.birthday).toISOString().split('T')[0];

    const removeCreditCard = (id) => {
        let deleteIndex = creditCards.findIndex((el) => el.id === id);
        dispatch(deleteCreditCard(deleteIndex))
    }

    return (
        <div className='profile_container'>
            { editModal && <ModalContainer type={editModal}/> }
            { loading && <Loading/> }
            <div className='profile_header'>
                <h2>My Profile</h2>
                <button onClick={() => dispatch(outUser())}>
                    SIGN OUT
                    <ExitToAppIcon/>
                </button>
            </div>
            {
                userData.id && (
                    <div className='profile_user_info'>
                        <div className='profile_edit'>
                            <CustomButton onClick={() => dispatch(openEditModal('info'))}>
                                Edit profile
                                <EditIcon/>
                            </CustomButton>
                        </div>
                        <CustomInput type='text' Icon={AccountCircleOutlinedIcon}
                                     value={userData.data.fullName} label='Full Name'
                                     name='fullName' readOnly={true}/>
                        <label>
                            <CustomInput type='date' Icon={CalendarTodayOutlinedIcon}
                                         value={birthday} name='birthday' label='Birthday'
                                         readOnly={true}/>
                        </label>
                        <CustomSelect Icon={PublicIcon} label='Country' options={countryList}
                                      value={userData.data.country} name='country' disabled={true}/>
                        <CustomInput type='text' Icon={MailOutlineIcon}
                                     value={userData.email} name='email' label='Email'
                                     readOnly={true}/>
                    </div>
                )
            }
            <div className='profile_change_button'>
                <CustomButton onClick={() => dispatch(openEditModal('pass'))}>Change Password</CustomButton>
            </div>
            {/*<div className='profile_payment_container'>*/}
            {/*    <div className='profile_payment_header'>*/}
            {/*        <div>Payment details</div>*/}
            {/*    </div>*/}
            {/*    <div className='profile_payment_list'>*/}
            {/*        {*/}
            {/*            creditCards.map(el => (*/}
            {/*                <CustomInput type='text' placeholder='Card Number' Icon={CreditCardIcon}*/}
            {/*                             value={el.value} name='card' readOnly={true}*/}
            {/*                             key={el.id} suffixData={{icon: DeleteOutlineIcon, clickFunction: () => removeCreditCard(el.id)}}/>*/}
            {/*            ))*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*    <div className='profile_change_button'>*/}
            {/*        <CustomButton onClick={() => dispatch(openEditModal('card'))}>Add credit card</CustomButton>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default Profile;