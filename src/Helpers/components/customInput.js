import React from 'react';

const CustomInput = ({type, placeholder, Icon, name, changeFunction, errorMessage, value}) => {

    let isWrong = errorMessage && errorMessage.name === name;

    let inputProps = {
        type: type,
        placeholder: placeholder,
        name: name,
        value: value,
        onChange: changeFunction
    };

    if (type === 'password') {
        inputProps.autoComplete =  'current-,password'
    }
    if (type === 'date') {
        inputProps.max =  new Date().toISOString().split("T")[0]
        inputProps.min =  '1900-01-01'
    }

    return (
        <div className={`custom_input ${isWrong && 'invalid_input'}`}>
            {Icon && <div><Icon/></div>}
            <input {...inputProps}/>
            {
                isWrong && errorMessage.text && <span className='invalid_input_message'>{errorMessage.text}</span>
            }
        </div>
    );
}

export default CustomInput;