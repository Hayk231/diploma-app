import axios from "axios";
import qs from 'qs';
import {baseUrl, getToken} from "../../Helpers/Constants";
import {
    setGoals,
    outUser
} from "./adminActions";
import {setLoading} from "../loadingActions";
import {closeEditModal} from "../User/userActions";

export const getTableGoals = (instructions) => {
    return dispatch => {
        const token = getToken();
        if (token) {
            dispatch(setLoading(true))
            const AuthStr = 'Bearer '.concat(token);
            axios.post(baseUrl + 'goals',
                instructions,{headers: {Authorization: AuthStr}}
            ).then(res => {
                dispatch(setGoals(res.data))
                dispatch(setLoading(false))
            }).catch(error => {
                dispatch(setLoading(false))
                if (error && error.response && error.response.status === 401) {
                    dispatch(outUser())
                }
            })
        } else {
            dispatch(outUser())
        }
    }
}

export const updateGoalActiveness = (ids) => {
    return dispatch => {
        const token = getToken();
        if (token) {
            dispatch(setLoading(true))
            const AuthStr = 'Bearer '.concat(token);
            axios.put(baseUrl + 'goals', '',{
                params: {ids, active: false},
                paramsSerializer: function(params) {
                    return qs.stringify(params, {arrayFormat: 'repeat'})
                },
                headers: {Authorization: AuthStr}
            }).then(res => {
                    // dispatch(setGoals(res.data))
                dispatch(setLoading(false))
            }).catch(error => {
                dispatch(setLoading(false))
                if (error && error.response && error.response.status === 401) {
                    dispatch(outUser())
                }
            })
        } else {
            dispatch(outUser())
        }
    }
}

export const updateGoalData = (goalData) => {
    return dispatch => {
        const token = getToken();
        if (token) {
            dispatch(setLoading(true))
            const AuthStr = 'Bearer '.concat(token);
            axios.put(baseUrl + `goals/${goalData.organizationUserId}/${goalData.goalId}`,
                goalData.data,
                {
                    headers: {Authorization: AuthStr}
            }).then(res => {
                    // dispatch(setGoals(res.data))
                dispatch(closeEditModal(false))
                dispatch(setLoading(false))
            }).catch(error => {
                dispatch(setLoading(false))
                if (error && error.response && error.response.status === 401) {
                    dispatch(outUser())
                }
            })
        } else {
            dispatch(outUser())
        }
    }
}