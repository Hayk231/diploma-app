import React from 'react';
import ShareButtons from "../../Helpers/components/ShareButtons";

const DonateSuccess = ({goalData}) => {

    const shareUrl = `https://fndrisr.herokuapp.com/goals/${goalData.organizationUserId}/${goalData.id}/view`;
    const mediaUrl = goalData.thumbnailImageData ? goalData.thumbnailImageData.url : '';

    return (
        <>
            <h1>ALL DONE !</h1>
            <h2>Thank you for your donation</h2>
            <div className='donate_success_share_text'>You can share your donation with friends</div>
            <ShareButtons shareUrl={shareUrl} mediaUrl={mediaUrl}/>
        </>
    );
};

export default DonateSuccess;