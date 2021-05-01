import React from 'react';
import './Confirmation.scss';
import {Link} from "react-router-dom";

const Confirmation = () => {
    return (
        <div className='confirmation_container'>
            <h2>Thanks for the registration!</h2>
            <p>
                Your account has been created and a verification email has been
                sent to your registered email address.
            </p>
            <div>
                Back to <Link to='/auth/login'>Login</Link> page
            </div>
        </div>
    );
};

export default Confirmation;