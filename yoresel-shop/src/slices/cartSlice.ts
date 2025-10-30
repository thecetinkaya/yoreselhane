import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type CartItem = {
	id: string
	title: string
	price: number
	image: string
	quantity: number
}

export type CartState = {
	items: Record<string, CartItem>
	totalQuantity: number
	totalPrice: number
}

const initialState: CartState = {
	items: {},
	totalQuantity: 0,
	totalPrice: 0,
}

function recalcTotals(state: CartState) {
	let qty = 0
	let price = 0
	Object.values(state.items).forEach((item) => {
		qty += item.quantity
		price += item.quantity * item.price
	})
	state.totalQuantity = qty
	state.totalPrice = parseFloat(price.toFixed(2))
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (
			state,
			action: PayloadAction<{ id: string; title: string; price: number; image: string; quantity?: number }>
		) => {
			const { id, title, price, image } = action.payload
			const quantity = action.payload.quantity ?? 1
			const existing = state.items[id]
			if (existing) {
				existing.quantity += quantity
			} else {
				state.items[id] = { id, title, price, image, quantity }
			}
			recalcTotals(state)
		},
		removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
			delete state.items[action.payload.id]
			recalcTotals(state)
		},
		setQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
			const item = state.items[action.payload.id]
			if (!item) return
			item.quantity = Math.max(1, action.payload.quantity)
			recalcTotals(state)
		},
		clearCart: (state) => {
			state.items = {}
			recalcTotals(state)
		},
	},
})

export const { addToCart, removeFromCart, setQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
