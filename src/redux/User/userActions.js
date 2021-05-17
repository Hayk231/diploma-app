import {createSlice} from '@reduxjs/toolkit'

const initialUserData = {
    id: '',
    email: '',
    role: '',
    data: {}
}

const initialCreditCards = [
    {id: 1, value: '4561 2778 5633 3522'},
    {id: 2, value: '7456 1225 7882 1155'}
];

export const userActions = createSlice({
    name: 'user',
    initialState: {
        userData: initialUserData,
        editModal: '',
        creditCards: initialCreditCards,
        allGoals: [],
        myGoals: [],
        donationDone: false,
        notifications: []
    },
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload;
        },
        setAllGoals: (state, action) => {
            state.allGoals = action.payload || []
        },
        setMyGoals: (state, action) => {
            state.myGoals = action.payload || []
        },
        outUser: state => {
            state.userData = initialUserData;
            localStorage.removeItem('auth_token');
            localStorage.removeItem('role');
            sessionStorage.removeItem('auth_token');
            sessionStorage.removeItem('role');
            window.location.reload();
        },
        openEditModal: (state, action) => {
            state.editModal = action.payload
        },
        closeEditModal: state => {
            state.editModal = ''
        },
        deleteCreditCard: (state, action) => {
            state.creditCards.splice(action.payload, 1)
        },
        setDonationDone: (state, action) => {
            state.donationDone = action.payload
        },
        setNotifications: (state, action) => {
            state.notifications = action.payload
        },
        setNotificationsSeen: (state, action) => {
            state.notifications = action.payload
        },
        addNotification: (state, action) => {
            state.notifications.push(action.payload)
        },
        deleteNotification: (state, action) => {
            state.notifications = state.notifications.filter(el => el.notificationId != action.payload)
        }
    }
})

export const {
    setUser,
    setAllGoals,
    setMyGoals,
    outUser,
    openEditModal,
    closeEditModal,
    deleteCreditCard,
    setDonationDone,
    setNotifications,
    addNotification,
    deleteNotification
} = userActions.actions

export default userActions.reducer