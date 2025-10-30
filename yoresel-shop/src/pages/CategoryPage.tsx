import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'

export default function CategoryPage() {
	const { slug } = useParams()
	const products = useSelector((s: RootState) => s.products.catalog)
	const list = useMemo(() => products.filter(p => p.category === slug), [products, slug])

	return (
		<div className="space-y-6 px-0">
			<div>
				<h1 className="text-2xl font-semibold capitalize">{slug}</h1>
				<p className="text-slate-600">{list.length} ürün bulundu</p>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{list.map(p => (
					<Link key={p.id} to={`/urun/${p.slug}`} className="rounded-xl border p-4 bg-white hover:shadow transition block">
						<div className="aspect-square rounded-lg bg-slate-100 mb-3" />
						<div className="text-sm text-slate-700 line-clamp-2">{p.title}</div>
						<div className="mt-1 font-semibold">{p.price.toFixed(2)} TL</div>
					</Link>
				))}
			</div>
		</div>
	)
}
