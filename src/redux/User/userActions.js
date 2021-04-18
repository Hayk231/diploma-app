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
        allGoals: []
    },
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload;
        },
        setAllGoals: (state, action) => {
           state.allGoals = action.payload || []
        } ,
        outUser: state => {
            state.userData = initialUserData;
            localStorage.clear()
        },
        openEditModal: (state, action) => {
            state.editModal = action.payload
        },
        closeEditModal: state => {
            state.editModal = ''
        },
        deleteCreditCard: (state, action) => {
            state.creditCards.splice(action.payload, 1)
        }
    }
})

export const {setUser, setAllGoals, outUser, openEditModal, closeEditModal, deleteCreditCard} = userActions.actions

export default userActions.reducer