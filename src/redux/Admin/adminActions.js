import {createSlice} from '@reduxjs/toolkit'

const initialAdminData = {
    updateModal: '',
    goals: [],
    donations: [],
    users: []
}

export const adminActions = createSlice({
    name: 'admin',
    initialState: {
        updateModal: '',
        goals: [],
        donations: [],
        users: []

    },
    reducers: {
        setGoals: (state, action) => {
            state.goals = action.payload;
        },
        outUser: state => {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('role');
            sessionStorage.removeItem('auth_token');
            sessionStorage.removeItem('role');
            window.location.reload();
        },
    }
})

export const {
    setGoals,
    outUser
} = adminActions.actions

export default adminActions.reducer