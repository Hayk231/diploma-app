import React from 'react';
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    PinterestIcon,
    PinterestShareButton, TwitterIcon, TwitterShareButton, VKIcon, VKShareButton
} from "react-share";

const ShareButtons = ({shareUrl, mediaUrl}) => {
    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-around', padding: '0 30px'}}>
            <FacebookShareButton url={shareUrl}>
                <FacebookIcon round={true} size={40}/>
            </FacebookShareButton>
            <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon round={true} size={40}/>
            </LinkedinShareButton>
            <PinterestShareButton url={shareUrl}
                                  media={mediaUrl || 'https://www.peacewelfare.org/wp-content/uploads/2020/05/donation-image.png'}>
                <PinterestIcon round={true} size={40}/>
            </PinterestShareButton>
            <TwitterShareButton url={shareUrl}>
                <TwitterIcon round={true} size={40}/>
            </TwitterShareButton>
            <VKShareButton url={shareUrl}>
                <VKIcon round={true} size={40}/>
            </VKShareButton>
        </div>
    );
};

export default ShareButtons;