import {createSlice} from '@reduxjs/toolkit'

const initialAdminData = {
    updateModal: '',
    goals: [],
    averageCount: 0,
    donations: [],
    users: []
}

export const adminActions = createSlice({
    name: 'admin',
    initialState: {
        updateModal: '',
        changeTrigger: false,
        goals: [],
        averageCount: 0,
        donations: [],
        users: []

    },
    reducers: {
        setGoals: (state, action) => {
            state.goals = action.payload.items;
            state.averageCount = action.payload.count;
        },
        triggerChange: state => {
            state.changeTrigger = !state.changeTrigger
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
    triggerChange,
    outUser
} = adminActions.actions

export default adminActions.reducer