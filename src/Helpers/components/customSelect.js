import React from 'react';
import {MenuItem, Select} from "@material-ui/core";
import './cunstomInputs.scss';

const CustomSelect = ({Icon, name, changeFunction, value, options, label, disabled}) => {
    return (
        <div className='custom_select'>
            { label && <div className='custom_label'>{label}</div> }
            {Icon && <div className='custom_select_prefix'><Icon/></div>}
            <Select
                value={value}
                onChange={changeFunction}
                displayEmpty
                className={`custom_select_comp ${disabled ? 'disabled' : ''}`}
                inputProps={{'aria-label': 'Without label', 'name': name}}
            >
                {
                    options.map(el => {
                        return (
                            <MenuItem value={el.id || el} key={el.id || el}>{el.value || el}</MenuItem>
                        )
                    })
                }
            </Select>
        </div>
    );
};

export default CustomSelect;