import axios from "axios";
import qs from 'qs';
import {baseUrl, getDeviceToken, getRole, getToken} from "../../Helpers/Constants";
import {
    setUser,
    outUser,
    closeEditModal,
    setAllGoals,
    setDonationDone,
    setMyGoals,
    setNotifications,
    deleteNotification,
} from "./userActions";
import {setLoading} from "../loadingActions";

export const getUserData = () => {
    return dispatch => {
        const token = getToken();
        const role = getRole();
        if (token) {
            const AuthStr = 'Bearer '.concat(token);
            dispatch(setLoading(true))
            axios.get(baseUrl + `users/${role}`, {headers: {Authorization: AuthStr}}).then(res => {
                dispatch(setUser(res.data));
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
export const updateUserData = (data) => {
    return (dispatch, getState) => {
        const token = getToken();
        const role = getRole();
        if (token) {
            const AuthStr = 'Bearer '.concat(token);
            dispatch(setLoading(true))
            axios.put(baseUrl + `users/${role}`, {
                data
            }, {headers: {Authorization: AuthStr}}).then(res => {
                dispatch(setLoading(false))
                dispatch(setUser(res.data));
                if (getState().user.editModal) {
                    dispatch(closeEditModal());
                }
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

export const updateUserPassword = (data) => {
    return (dispatch, getState) => {
        const token = getToken();
        const role = getRole();
        if (token) {
            dispatch(setLoading(true))
            const AuthStr = 'Bearer '.concat(token);
            axios.put(baseUrl + `users/${role}/password`, data, {headers: {Authorization: AuthStr}})
                .then(() => {
                    dispatch(setLoading(false))
                    dispatch(closeEditModal());
                    if (getState().user.editModal) {
                        dispatch(closeEditModal());
                    }
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

export const getGoals = (filter) => {
    return dispatch => {
        const token = getToken();
        if (token) {
            dispatch(setLoading(true))
            const AuthStr = 'Bearer '.concat(token);
            axios.get(baseUrl + 'goals', {
                params: {filter},
                headers: {Authorization: AuthStr}
            }).then(res => {
                filter === 'DISCOVER' ?
                    dispatch(setAllGoals(res.data)) : dispatch(setMyGoals(res.data))
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
export const prolongSession = () => {
    return dispatch => {
        const token = getToken();
        const role = getRole();
        if (token) {
            const AuthStr = 'Bearer '.concat(token);
            const deviceToken = getDeviceToken();
            axios.put(baseUrl + `users/${role}/session`, {deviceToken}, {headers: {Authorization: AuthStr}}).then(res => {
                let storage = localStorage.getItem('auth_token') ? localStorage : sessionStorage;
                storage.setItem('auth_token', res.data.token)
                storage.setItem('role', res.data.role);
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

export const setReminder = (goalId) => {
    return dispatch => {
        const token = getToken();
        if (token) {
            const AuthStr = 'Bearer '.concat(token);
            axios.post(baseUrl + 'reminders/' + goalId,
                '', {headers: {Authorization: AuthStr}})
                .catch(error => {
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

export const deleteReminder = (goalId) => {
    return dispatch => {
        const token = getToken();
        if (token) {
            const AuthStr = 'Bearer '.concat(token);
            axios.delete(baseUrl + 'reminders/' + goalId, {
                headers: {Authorization: AuthStr}
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

// export const donationCreate = (goalId, amount) => {
//     return dispatch => {
//         const token = getToken();
//         if (token) {
//             const AuthStr = 'Bearer '.concat(token);
//             axios.post(baseUrl + 'donations/' + goalId,
//                 '', {
//                     params: {amount: parseInt(amount)},
//                     headers: {Authorization: AuthStr}
//                 }).then(() => {
//                 dispatch(setDonationDone(true));
//                 // dispatch(getNotifications());
//             }).catch(error => {
//                 dispatch(setLoading(false))
//                 if (error && error.response && error.response.status === 401) {
//                     dispatch(outUser())
//                 }
//             })
//         } else {
//             dispatch(outUser())
//         }
//     }
// }

export const getNotifications = () => {
    return dispatch => {
        const token = getToken();
        if (token) {
            const AuthStr = 'Bearer '.concat(token);
            axios.get(baseUrl + `notifications`, {
                headers: {Authorization: AuthStr}
            }).then(res => dispatch(setNotifications(res.data)))
                .catch(error => {
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

export const notificationSeen = (id) => {
    return dispatch => {
        const token = getToken();
        if (token) {
            const AuthStr = 'Bearer '.concat(token);
            axios.put(baseUrl + 'notifications', '',
                {
                    params: {ids: [id]},
                    paramsSerializer: function(params) {
                        return qs.stringify(params, {arrayFormat: 'repeat'})
                    },
                    headers: {Authorization: AuthStr}
                }).then(() => dispatch(getNotifications()))
                .catch(error => {
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
export const notificationDelete = (id) => {
    return dispatch => {
        const token = getToken();
        if (token) {
            const AuthStr = 'Bearer '.concat(token);
            axios.delete(baseUrl + 'notifications',
                {
                    params: {ids: []},
                    paramsSerializer: function(params) {
                        return qs.stringify(params, {arrayFormat: 'repeat'})
                    },
                    headers: {Authorization: AuthStr}
                }).then(() => dispatch(deleteNotification(id)))
                .catch(error => {
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