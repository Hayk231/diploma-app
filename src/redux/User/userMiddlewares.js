import axios from "axios";
import {baseUrl, getToken} from "../../Helpers/Constants";
import {setUser, outUser, closeEditModal, setAllGoals,} from "./userActions";

export const getUserData = () => {
    return dispatch => {
        const token = getToken();
        if (token) {
            const AuthStr = 'Bearer '.concat(token);
            axios.get(baseUrl + 'users/USER', {headers: {Authorization: AuthStr}}).then(res => {
                dispatch(setUser(res.data))
            })
        } else {
            dispatch(outUser())
        }
    }
}
export const updateUserData = (data) => {
    return dispatch => {
        const token = getToken();
        if (token) {
            const AuthStr = 'Bearer '.concat(token);
            axios.put(baseUrl + 'users/USER', {
                data
            }, {headers: {Authorization: AuthStr}}).then(res => {
                dispatch(setUser(res.data))
            })
        } else {
            dispatch(outUser())
        }
    }
}

export const updateUserPassword = (data) => {
    return dispatch => {
        const token = getToken();
        if (token) {
            const AuthStr = 'Bearer '.concat(token);
            axios.put(baseUrl + 'users/USER/password', data, {headers: {Authorization: AuthStr}})
                .then(() => {
                    dispatch(closeEditModal())
                })
        } else {
            dispatch(outUser())
        }
    }
}

export const getAllGoals = () => {
    return dispatch => {
        const token = getToken();
        if (token) {
            const AuthStr = 'Bearer '.concat(token);
            axios.get(baseUrl + 'goals', {headers: {Authorization: AuthStr}}).then(res => {
                dispatch(setAllGoals(res.data))
            })
        } else {
            dispatch(outUser())
        }
    }
}