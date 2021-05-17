import {createSlice} from '@reduxjs/toolkit'

const initialAdminData = {
    updateModal: '',
    goals: [],
    goalsCount: 0,
    donations: [],
    users: []
}

export const adminActions = createSlice({
    name: 'admin',
    initialState: {
        updateModal: '',
        goals: [],
        goalsCount: 0,
        donations: [],
        users: []

    },
    reducers: {
        setGoals: (state, action) => {
            state.goals = action.payload.goals;
            state.goalsCount = action.payload.count;
        },
        outUser: () => {
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