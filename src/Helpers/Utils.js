import {emailRegex} from "./Constants";

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
        if (key === 'email' && !emailRegex.test(data[key])) {
            debugger
            invalidName = {name: key, text: 'Please enter a valid email address.'}
            break
        }
    }
    return invalidName
}