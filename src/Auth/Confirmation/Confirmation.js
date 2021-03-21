import React from 'react';
import {Link} from "react-router-dom";

const Confirmation = () => {
    return (
        <div>
            Check your email
            <Link to='/auth/login'>Login page</Link>
        </div>
    );
};

export default Confirmation;