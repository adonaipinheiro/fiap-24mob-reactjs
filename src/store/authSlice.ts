import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  isLogged: boolean
}

const initialState: AuthState = {
  isLogged: false
}

export const authSlice = createSlice({
  name: '@AUTH',
  initialState,
  reducers: {
    logIn: (state) => {
      localStorage.setItem("isLogged", "true")
      state.isLogged = true
    },
    logOut: (state) => {
      localStorage.removeItem("isLogged")
      state.isLogged = false
    },
  },
})

export const { logIn, logOut } = authSlice.actions

export default authSlice.reducer