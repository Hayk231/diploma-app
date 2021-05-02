import {emailRegex} from "./Constants";
import moment from 'moment';

export const validateForm = (data) => {
    let invalidName = {name: '', text: ''};

    for (let key in data) {
        if (!data[key].toString().trim()) {
            invalidName = {name: key, text: 'Please fill out this field.'}
            break
        }
        if (key === 'conf_password' && data[key] !== data.password) {
            invalidName = {name: key, text: 'Password mismatch.'}
            break
        }
        if (key === 'oldPassword' && data[key] === data.password) {
            invalidName = {name: key, text: 'Old and new passwords should differ'}
            break
        }
        if (key === 'email' && !emailRegex.test(data[key])) {
            debugger
            invalidName = {name: key, text: 'Please enter a valid email address.'}
            break
        }
    }
    return invalidName
}

export const buildChartData = (data) => {
    const defData = [
        {
            "id": "chartData",
            "color": "hsl(207, 70%, 50%)",
            "data": [
                {
                    "x": "2021-02-08",
                    "y": 23,
                    "count": 123
                },
            ]
        }
    ]
    defData[0].data = data.map(el => {
        const amount = el.amount || 1;
        return {x: moment(el.date).format('YYYY-MM-DD'), y: amount, count: el.count}
    })
    return defData
}