import React, {useState} from 'react';
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import CustomButton from "../CustomButton";

const reminderOptions = [
    {value: 'start', label: 'Start of Month'},
    {value: 'middle', label: 'Middle of Month'},
    {value: 'end', label: 'End of Month'}
]

const ReminderContent = () => {

    const [reminderType, setReminderType] = useState('start');

    const handleChange = (e) => {
        setReminderType(e.target.value)
    }

    return (
        <>
            <h2 style={{textAlign: 'left', marginBottom: '10px'}}>Reminder For Donation </h2>
            <div className='modal_content_subtitle'>Choose reminder period for every month</div>
            <FormControl fullWidth margin='normal'>
                <RadioGroup value={reminderType} onChange={handleChange}>
                    {
                        reminderOptions.map(el => (
                            <FormControlLabel value={el.value} control={<Radio/>} label={el.label}/>
                        ))
                    }
                </RadioGroup>
            </FormControl>
            <div className='modal_button' style={{margin: '30px'}}>
                <CustomButton type='submit' radius='4px' customWidth='120px'>Set</CustomButton>
            </div>
        </>
    );
};

export default ReminderContent;