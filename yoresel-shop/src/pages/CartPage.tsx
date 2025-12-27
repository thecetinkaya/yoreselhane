import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShield, FiTruck, FiCheckCircle } from 'react-icons/fi'
import type { RootState, AppDispatch } from '../store'
import { removeFromCart, setQuantity, clearCart } from '../slices/cartSlice'
import { showNotification } from '../slices/uiSlice'

export default function CartPage() {
	const dispatch = useDispatch<AppDispatch>()
	const { items, totalPrice } = useSelector((s: RootState) => s.cart)
	const list = Object.values(items)

	const handleQuantityChange = (id: string, newQty: number) => {
		if (newQty > 50) {
			dispatch(showNotification({
				title: 'Uyarı',
				message: 'Sepetinize en fazla 50 adet ürün ekleyebilirsiniz.',
				type: 'error'
			}))
			return
		}
		dispatch(setQuantity({ id, quantity: newQty }))
	}

	const FREE_SHIPPING_THRESHOLD = 500
	const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice)
	const shippingCost = remainingForFreeShipping > 0 ? 29.90 : 0
	const grandTotal = totalPrice + shippingCost

	if (list.length === 0) {
		return (
			<div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-12">
				<div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
					<FiShoppingCart className="text-4xl text-slate-400" />
				</div>
				<h2 className="text-2xl font-semibold text-slate-900 mb-2">Sepetinizde ürün bulunmamaktadır</h2>
				<p className="text-slate-500 mb-8 max-w-md">Sepetinizde henüz ürün yok. Yöresel lezzetleri keşfetmek için alışverişe başlayabilirsiniz.</p>
				<Link
					to="/"
					className="inline-flex items-center justify-center px-8 py-4 bg-[#19262e] text-white rounded-lg hover:bg-slate-800 transition-colors font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
				>
					Alışverişe Başla
				</Link>
			</div>
		)
	}

	return (
		<div className="py-8 px-4 md:px-6 lg:px-8 max-w-screen-2xl mx-auto">
			<h1 className="text-3xl font-bold text-slate-900 mb-8">Alışveriş Sepetim ({list.length} Ürün)</h1>

			<div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
				{/* Sol Kolon: Ürün Listesi */}
				<div className="flex-1 space-y-6">
					{/* Kargo İlerleme Çubuğu */}
					<div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
						<div className="flex items-center gap-3 mb-3">
							<div className="p-2 bg-green-50 rounded-full text-green-600">
								<FiTruck className="text-xl" />
							</div>
							<div className="text-sm font-medium text-slate-700">
								{remainingForFreeShipping > 0 ? (
									<>
										<span className="font-bold text-slate-900">₺{remainingForFreeShipping.toFixed(2)}</span> daha ekleyin, kargo <span className="text-green-600 font-bold">BEDAVA</span> olsun!
									</>
								) : (
									<span className="text-green-600 font-bold">Kargo Bedava!</span>
								)}
							</div>
						</div>
						<div className="h-2 bg-slate-100 rounded-full overflow-hidden">
							<div
								className="h-full bg-green-500 rounded-full transition-all duration-500"
								style={{ width: `${Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
							/>
						</div>
					</div>

					{/* Ürünler */}
					<div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
						<div className="divide-y divide-slate-100">
							{list.map(item => (
								<div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 group hover:bg-slate-50 transition-colors">
									{/* Ürün Görseli */}
									<Link to={`/urun/${item.title.toLowerCase().replace(/ /g, '-')}`} className="w-full sm:w-24 h-24 sm:h-24 bg-white rounded-lg border border-slate-100 overflow-hidden flex-shrink-0">
										<img src={item.image} alt={item.title} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
									</Link>

									{/* Ürün Detayları */}
									<div className="flex-1 flex flex-col justify-between">
										<div className="flex justify-between items-start gap-4">
											<div>
												<Link to={`/urun/${item.title.toLowerCase().replace(/ /g, '-')}`} className="font-semibold text-slate-900 hover:text-orange-600 transition-colors line-clamp-2">
													{item.title}
												</Link>
												<div className="text-sm text-slate-500 mt-1">Birim Fiyat: ₺{item.price.toFixed(2)}</div>
											</div>
											<div className="text-lg font-bold text-slate-900">
												₺{(item.price * item.quantity).toFixed(2)}
											</div>
										</div>

										<div className="flex items-center justify-between mt-4 sm:mt-0">
											{/* Adet Kontrolü */}
											<div className="flex items-center border border-slate-200 rounded-lg bg-white h-9">
												<button
													onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
													className="w-8 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-l-lg transition-colors"
												>
													<FiMinus size={14} />
												</button>
												<input
													type="number"
													min={1}
													value={item.quantity}
													onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value || '1'))}
													className="w-10 h-full text-center text-sm font-medium text-slate-900 focus:outline-none border-x border-slate-100"
												/>
												<button
													onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
													className="w-8 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-r-lg transition-colors"
												>
													<FiPlus size={14} />
												</button>
											</div>

											{/* Kaldır Butonu */}
											<button
												onClick={() => dispatch(removeFromCart({ id: item.id }))}
												className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition-colors px-2 py-1 rounded hover:bg-red-50"
											>
												<FiTrash2 />
												<span className="hidden sm:inline">Sepetten Sil</span>
											</button>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Sepet Altı Aksiyonlar */}
						<div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
							<button
								onClick={() => dispatch(clearCart())}
								className="text-sm text-slate-500 hover:text-red-600 transition-colors underline"
							>
								Sepeti Temizle
							</button>
							<Link to="/" className="text-sm font-medium text-slate-700 hover:text-slate-900 flex items-center gap-1">
								Alışverişe Devam Et <FiArrowRight />
							</Link>
						</div>
					</div>
				</div>

				{/* Sağ Kolon: Sipariş Özeti */}
				<div className="w-full lg:w-96 flex-shrink-0 space-y-6">
					<div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-6">
						<h2 className="text-lg font-bold text-slate-900 mb-6">Sipariş Özeti</h2>

						<div className="space-y-4 mb-6">
							<div className="flex justify-between text-slate-600">
								<span>Ürünler Toplamı</span>
								<span className="font-medium">₺{totalPrice.toFixed(2)}</span>
							</div>
							<div className="flex justify-between text-slate-600">
								<span>Kargo Toplamı</span>
								<span className="font-medium">{shippingCost === 0 ? <span className="text-green-600">Bedava</span> : `₺${shippingCost.toFixed(2)}`}</span>
							</div>
							{/* İndirim alanı eklenebilir */}
						</div>

						<div className="border-t border-slate-100 pt-4 mb-6">
							<div className="flex justify-between items-end">
								<span className="text-lg font-semibold text-slate-900">Genel Toplam</span>
								<span className="text-2xl font-bold text-orange-600">₺{grandTotal.toFixed(2)}</span>
							</div>
							<div className="text-xs text-slate-500 text-right mt-1">KDV Dahildir</div>
						</div>

						<button className="w-full py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-bold text-lg shadow-lg shadow-orange-200 flex items-center justify-center gap-2 group">
							<span>Sepeti Onayla</span>
							<FiArrowRight className="group-hover:translate-x-1 transition-transform" />
						</button>

						<div className="mt-6 space-y-3">
							<div className="flex items-center gap-3 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
								<FiShield className="text-lg text-green-600 flex-shrink-0" />
								<span>Güvenli Alışveriş: Bilgileriniz 256-bit SSL sertifikası ile korunmaktadır.</span>
							</div>
							<div className="flex items-center gap-3 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
								<FiCheckCircle className="text-lg text-blue-600 flex-shrink-0" />
								<span>%100 Müşteri Memnuniyeti ve İade Garantisi</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
