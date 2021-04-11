import React from 'react';
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import CustomButton from "../../Helpers/components/CustomButton";

const DonateSuccess = () => {
    return (
        <>
            <h1>ALL DONE !</h1>
            <h2>Thank you for your donation</h2>
            <div className='donate_success_share'>You can share your donation with friends</div>
            <CustomButton radius='4px' style='light' customPadding='8px 30px' icon={ShareOutlinedIcon}>
                Share
            </CustomButton>
        </>
    );
};

export default DonateSuccess;