import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import type { RootState, AppDispatch } from '../store'
import { removeFromCart, setQuantity, clearCart } from '../slices/cartSlice'

export default function CartPage() {
	const dispatch = useDispatch<AppDispatch>()
	const { items, totalPrice } = useSelector((s: RootState) => s.cart)
	const list = Object.values(items)

	if (list.length === 0) {
		return (
			<div className="min-h-[500px] flex flex-col items-center justify-center text-center px-4">
				<FiShoppingCart className="text-7xl text-[#19262e] mb-6" />
				<h2 className="text-2xl font-medium text-[#19262e] mb-8">Sepetin Boş</h2>
				<Link 
					to="/" 
					className="w-full max-w-md py-4 bg-[#19262e] text-white rounded hover:bg-slate-800 transition-colors font-medium text-lg"
				>
					Alışverişe Başla
				</Link>
			</div>
		)
	}

	return (
		<div className="space-y-6 px-0">
			<h1 className="text-2xl font-semibold">Sepet</h1>
			<>
				<div className="space-y-3">
						{list.map(item => (
							<div key={item.id} className="flex items-center justify-between border rounded-xl p-4 bg-white">
								<div className="flex items-center gap-4">
									<div className="size-16 rounded-lg bg-slate-100" />
									<div>
										<div className="font-medium">{item.title}</div>
										<div className="text-sm text-slate-600">{item.price.toFixed(2)} TL</div>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<input type="number" min={1} value={item.quantity} onChange={(e) => dispatch(setQuantity({ id: item.id, quantity: parseInt(e.target.value || '1') }))} className="w-20 border rounded-md px-3 py-2" />
									<button onClick={() => dispatch(removeFromCart({ id: item.id }))} className="text-red-600 hover:underline">Kaldır</button>
								</div>
							</div>
						))}
					</div>
					<div className="flex items-center justify-between border rounded-xl p-4 bg-white">
						<div className="font-semibold">Toplam</div>
						<div className="text-xl font-bold">{totalPrice.toFixed(2)} TL</div>
					</div>
					<div className="flex items-center justify-end gap-3">
						<button className="inline-flex items-center justify-center rounded-md border px-4 py-2" onClick={() => dispatch(clearCart())}>Sepeti Temizle</button>
						<button className="inline-flex items-center justify-center rounded-md bg-sky-500 px-4 py-2 text-white shadow hover:bg-sky-600 transition-colors">Ödemeye Geç</button>
					</div>
				</>
		</div>
	)
}
