import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface User {
  name: string
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
}

const initialState: AuthState = {
  isAuthenticated: true, // Simulating logged in state for demonstration as per request "eğer kullanıcı giriş yaptı ise"
  user: {
    name: 'Burak Çetinkaya',
    email: 'burak@example.com'
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true
      state.user = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
