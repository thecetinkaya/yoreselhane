import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export type Product = {
	id: string
	title: string
	slug: string
	price: number
	image: string
	category: string
	description: string
	badges?: string[]
	gtin13?: string
	aggregateRating?: { ratingValue: number; reviewCount: number }
}

export type ProductsState = {
	catalog: Product[]
	categories: string[]
	selectedProductId?: string
	status: 'idle' | 'loading' | 'error'
}

const initialState: ProductsState = {
	catalog: [],
	categories: [],
	selectedProductId: undefined,
	status: 'idle',
}

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setCatalog: (state, action: PayloadAction<Product[]>) => {
			state.catalog = action.payload
			state.categories = Array.from(new Set(action.payload.map(p => p.category)))
		},
		selectProduct: (state, action: PayloadAction<string | undefined>) => {
			state.selectedProductId = action.payload
		},
	},
})

export const { setCatalog, selectProduct } = productsSlice.actions
export default productsSlice.reducer

// Selectors
export const selectProductsCatalog = (state: RootState) => state.products.catalog
