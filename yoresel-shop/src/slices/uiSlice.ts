import { createSlice } from '@reduxjs/toolkit'

export type UIState = {
	isCartOpen: boolean
	theme: 'light' | 'dark'
}

const initialState: UIState = {
	isCartOpen: false,
	theme: 'light',
}

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		openCart: (state) => { state.isCartOpen = true },
		closeCart: (state) => { state.isCartOpen = false },
		toggleTheme: (state) => { state.theme = state.theme === 'light' ? 'dark' : 'light' },
		setTheme: (state, action: { payload: 'light' | 'dark' }) => { state.theme = action.payload },
	},
})

export const { openCart, closeCart, toggleTheme, setTheme } = uiSlice.actions
export default uiSlice.reducer
