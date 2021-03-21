import axios from "axios";
import {baseUrl} from "../../Helpers/Constants";
import {setUser} from "./userActions";

export const getUserData = (token) => {
    return dispatch => {
        const AuthStr = 'Bearer '.concat(token);
        axios.get(baseUrl + 'users/USER', { headers: { Authorization: AuthStr } }).then(res => {
            dispatch(setUser(res.data))
        })
    }
}