import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store'
import { addToCart } from '../slices/cartSlice'

export default function ProductDetailPage() {
	const { slug } = useParams()
	const [qty, setQty] = useState(1)
	const dispatch = useDispatch<AppDispatch>()
	const products = useSelector((s: RootState) => s.products.catalog)
	const product = useMemo(() => products.find(p => p.slug === slug), [products, slug])

	if (!product) {
		return <div className="py-10 text-center text-slate-600">Ürün bulunamadı.</div>
	}

	return (
		<div className="grid md:grid-cols-2 gap-8 px-0">
			<div className="aspect-square rounded-xl bg-slate-100" />
			<div className="space-y-4">
				<h1 className="text-2xl font-semibold">{product.title}</h1>
				<div className="text-2xl font-bold">{product.price.toFixed(2)} TL</div>
				<p className="text-slate-600">{product.description}</p>
				<div className="flex items-center gap-3">
					<input type="number" min={1} value={qty} onChange={(e) => setQty(parseInt(e.target.value || '1'))} className="w-20 border rounded-md px-3 py-2" />
					<button
						className="btn-primary"
						onClick={() => dispatch(addToCart({ id: product.id, title: product.title, price: product.price, image: product.image, quantity: qty }))}
					>
						Sepete Ekle
					</button>
				</div>
				<div className="text-sm text-slate-500">Kategori: <Link className="underline" to={`/kategori/${product.category}`}>{product.category}</Link></div>
			</div>
		</div>
	)
}
