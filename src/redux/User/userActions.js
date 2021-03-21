import { createSlice } from '@reduxjs/toolkit'

export const userActions = createSlice({
  name: 'user',
  initialState: {
    userData: {
      id: '',
      email: '',
      role: '',
      data: { }
    }
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

export const { setUser, decrement, incrementByAmount } = userActions.actions

export default userActions.reducer