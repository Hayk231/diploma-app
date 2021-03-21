import React from 'react';

const CustomRadio = ({options, Icon, label, name, changeFunction}) => {
    return (
        <div className='custom_radio'>
            <div className='custom_radio_label'>
                <Icon/>
                {label}
            </div>
            <div className='custom_radio_items'>
                {
                    options.map((option, index) => (
                        <div key={option.value}>
                            <div className="md-radio">
                                <input id={option.value} type="radio" value={option.value}
                                       defaultChecked={index === 0} name={name} onChange={changeFunction}/>
                                <label htmlFor={option.value}>{option.label}</label>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CustomRadio;