import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  name: string,
  phone: string,
  userId: string
}

const initialState: UserState = {
  name: '',
  phone: '',
  userId: ''
}

export const userSlice = createSlice({
  name: '@USER',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const {name, phone, userId} = action.payload
      const userPayload = {name,phone,userId}
      localStorage.setItem("userInfo", JSON.stringify(userPayload))
      state.name = name
      state.phone = phone
      state.userId = userId
    },
    removeUser: (state) => {
      localStorage.removeItem("userInfo")
      state.name = ''
      state.phone = ''
      state.userId = ''
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer