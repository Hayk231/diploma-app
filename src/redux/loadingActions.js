import {createSlice} from '@reduxjs/toolkit'

export const loadingActions = createSlice({
    name: 'loading',
    initialState: {
        loading: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const { setLoading } = loadingActions.actions

export default loadingActions.reducer