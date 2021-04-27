import axios from "axios";
import {baseUrl, getToken} from "../../Helpers/Constants";
import {setUser, outUser, closeEditModal, setAllGoals,} from "./userActions";
import {setLoading} from "../loadingActions";

export const getUserData = () => {
    return dispatch => {
        const token = getToken();
        if (token) {
            const AuthStr = 'Bearer '.concat(token);
            dispatch(setLoading(true))
            axios.get(baseUrl + 'users/USER', {headers: {Authorization: AuthStr}}).then(res => {
                dispatch(setUser(res.data));
                dispatch(setLoading(false))
            })
        } else {
            dispatch(outUser())
        }
    }
}
export const updateUserData = (data) => {
    return (dispatch, getState) => {
        const token = getToken();
        if (token) {
            const AuthStr = 'Bearer '.concat(token);
            dispatch(setLoading(true))
            axios.put(baseUrl + 'users/USER', {
                data
            }, {headers: {Authorization: AuthStr}}).then(res => {
                dispatch(setLoading(false))
                dispatch(setUser(res.data));
                if (getState().user.editModal) {
                    dispatch(closeEditModal());
                }
            })
        } else {
            dispatch(outUser())
        }
    }
}

export const updateUserPassword = (data) => {
    return (dispatch, getState) => {
        const token = getToken();
        if (token) {
            dispatch(setLoading(true))
            const AuthStr = 'Bearer '.concat(token);
            axios.put(baseUrl + 'users/USER/password', data, {headers: {Authorization: AuthStr}})
                .then(() => {
                    dispatch(setLoading(false))
                    dispatch(closeEditModal());
                    if (getState().user.editModal) {
                        dispatch(closeEditModal());
                    }
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
            dispatch(setLoading(true))
            const AuthStr = 'Bearer '.concat(token);
            axios.get(baseUrl + 'goals', {
                params: { filter: 'DISCOVER'},
                headers: {Authorization: AuthStr}
            }).then(res => {
                dispatch(setAllGoals(res.data))
                dispatch(setLoading(false))
            })
        } else {
            dispatch(outUser())
        }
    }
}
export const prolongSession = () => {
    return dispatch => {
        const token = getToken();
        if (token) {
            const AuthStr = 'Bearer '.concat(token);
            axios.put(baseUrl + 'users/USER/session', {}, {headers: {Authorization: AuthStr}}).then(res => {
                let storage = localStorage.getItem('auth_token') ? localStorage : sessionStorage;
                storage.setItem('auth_token', res.data.token)
                storage.setItem('role', res.data.role);
            })
        } else {
            dispatch(outUser())
        }
    }
}