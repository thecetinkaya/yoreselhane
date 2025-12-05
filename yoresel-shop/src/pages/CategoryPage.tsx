import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import { SLIDER_COUNT } from '../config/constants'
import ProductCard from '../components/ProductCard'

export default function CategoryPage() {
	const { slug } = useParams()
	const products = useSelector((s: RootState) => s.products.catalog)

	// Support a special slug 'yeni-urunler' to show new products.
	// We'll try to match the HomePage slider behavior: include products with badge 'Yeni',
	// but if those are fewer than the slider count, fill up from the slider's selection
	// (first up to 8 products) so the category page and slider feel consistent.
	const list = useMemo(() => {
		if (slug === 'yeni-urunler') {
			const sliderCount = SLIDER_COUNT
			const byBadge = products.filter(p => Array.isArray(p.badges) && p.badges.includes('Yeni'))
			if (byBadge.length >= sliderCount) return byBadge.slice(0, sliderCount)

			// fill remaining slots from the slider selection (first N products)
			const sliderSelection = products.slice(0, Math.min(products.length, sliderCount))
			const ids = new Set<string>()
			const merged: typeof products = []
				;[...byBadge, ...sliderSelection].forEach(p => {
					if (!ids.has(p.id)) {
						ids.add(p.id)
						merged.push(p)
					}
				})
			return merged.slice(0, sliderCount)
		}
		return products.filter(p => p.category === slug)
	}, [products, slug])

	return (
		<div className="space-y-6 px-0">
			<div>
				<h1 className="text-2xl font-semibold capitalize">{slug}</h1>
				<p className="text-slate-600">{list.length} ürün bulundu</p>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{list.map(p => (
					<ProductCard key={p.id} product={p} />
				))}
			</div>
		</div>
	)
}
