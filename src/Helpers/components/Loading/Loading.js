import React from 'react';
import './Loading.scss'

const Loading = () => {
    return (
        <div className='loader_container'>
            <div className='loader_content'>
                <span className='loader_spinner'></span>
            </div>
        </div>
    );
};

export default Loading;