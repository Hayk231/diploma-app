import React from 'react';
import {MenuItem, Select} from "@material-ui/core";
import {countryList} from "../Constants";
import './cunstomInputs.scss';

const CustomSelect = ({Icon, name, changeFunction, value}) => {
    console.log(value)
    return (
        <div className='custom_select'>
            {Icon && <div><Icon/></div>}
            <Select
                value={value}
                onChange={changeFunction}
                displayEmpty
                className='custom_select_comp'
                inputProps={{'aria-label': 'Without label', 'name': name}}
            >
                {
                    countryList.map(el => {
                        return (
                            <MenuItem value={el} key={el}>{el}</MenuItem>
                        )
                    })
                }
            </Select>
        </div>
    );
};

export default CustomSelect;