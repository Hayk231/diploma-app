import React, {useState} from 'react';
import './cunstomInputs.scss';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const CustomInput = ({
                         type,
                         placeholder = '',
                         id,
                         Icon,
                         name,
                         changeFunction,
                         errorMessage,
                         value,
                         readOnly,
                         suffixData,
                         label
                     }) => {

    const [showPassword, setShowPassword] = useState(false);

    let isWrong = errorMessage && errorMessage.name === name;

    let inputProps = {
        type: type === 'password' ? showPassword ? 'text' : 'password' : type,
        placeholder: placeholder,
        id: id || '',
        name: name,
        value: value,
        readOnly: readOnly,
        onChange: changeFunction,
    };

    if (type === 'password') {
        inputProps.autoComplete = 'current-password'
    }
    if (type === 'date') {
        inputProps.max = new Date().toISOString().split("T")[0]
        inputProps.min = '1900-01-01'
    }

    const suffixContent = () => {
        if (suffixData && suffixData.icon) {
            const SuffixIcon = suffixData.icon;
            const clickFunction = suffixData.clickFunction || (() => {
            })
            return (
                <div className='custom_input_suffix'>
                    <SuffixIcon onClick={clickFunction}/>
                </div>
            )
        } else {
            if (type === 'password') {
                return (
                    <div className='custom_input_suffix'>
                        {
                            showPassword ?
                                <VisibilityIcon onClick={() => setShowPassword(false)}/>
                                :
                                <VisibilityOffIcon onClick={() => setShowPassword(true)}/>
                        }
                    </div>
                )
            }
            return <></>
        }
    }

    return (
        <div className={`custom_input ${isWrong && 'invalid_input'}`}>
            {label && <div className='custom_label'>{label}</div>}
            {Icon && <div className='custom_input_prefix'><Icon/></div>}
            <input {...inputProps}/>
            {suffixContent()}
            {
                isWrong && errorMessage.text && <span className='invalid_input_message'>{errorMessage.text}</span>
            }
        </div>
    );
}

export default CustomInput;