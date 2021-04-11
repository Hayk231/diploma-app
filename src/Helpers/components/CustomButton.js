import React from 'react';
import './cunstomInputs.scss';

const defaultStyles = {
    border: 'none',
    borderRadius: '30px',
    backgroundColor: '#a1d0cf',
    color: '#fff',
    padding: '10px 30px',
    width: 'auto',
    height: 'auto'
}

const CustomButton = ({children, style, type, onClick, radius, customHeight, customWidth, customPadding, icon: Icon}) => {
    const borderRadius = radius || defaultStyles.borderRadius;
    const width = customWidth || defaultStyles.width;
    const height = customHeight || defaultStyles.height;
    const padding = customPadding || defaultStyles.padding;
    const secClass = style || '';

    return (
        <button className={`custom_button ${secClass}`} type={type} onClick={onClick}
                style={{borderRadius, width, height, padding }}>
            { Icon && <Icon/>}
            {children}
        </button>
    );
};

export default CustomButton;