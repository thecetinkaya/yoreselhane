import { createSlice } from '@reduxjs/toolkit'

export type NotificationPayload =
	| string
	| {
		title?: string
		message: string
		type?: 'success' | 'error' | 'info'
		actionLabel?: string
		actionUrl?: string
	}

export type UIState = {
	isCartOpen: boolean
	theme: 'light' | 'dark'
	notification: {
		title?: string
		message: string
		type: 'success' | 'error' | 'info'
		actionLabel?: string
		actionUrl?: string
	} | null
}

const initialState: UIState = {
	isCartOpen: false,
	theme: 'light',
	notification: null,
}

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		openCart: (state) => {
			state.isCartOpen = true
		},
		closeCart: (state) => {
			state.isCartOpen = false
		},
		toggleTheme: (state) => {
			state.theme = state.theme === 'light' ? 'dark' : 'light'
		},
		setTheme: (state, action: { payload: 'light' | 'dark' }) => {
			state.theme = action.payload
		},
		// payload can be a simple string (message) or a richer object
		showNotification: (state, action: { payload: NotificationPayload }) => {
			if (!action.payload) {
				state.notification = null
				return
			}
			if (typeof action.payload === 'string') {
				state.notification = { message: action.payload, type: 'info' }
			} else {
				state.notification = {
					title: action.payload.title,
					message: action.payload.message,
					type: action.payload.type ?? 'info',
					actionLabel: action.payload.actionLabel,
					actionUrl: action.payload.actionUrl,
				}
			}
		},
		clearNotification: (state) => {
			state.notification = null
		},
	},
})

export const { openCart, closeCart, toggleTheme, setTheme, showNotification, clearNotification } = uiSlice.actions
export default uiSlice.reducer
