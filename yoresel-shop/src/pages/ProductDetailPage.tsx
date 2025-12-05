import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store'
import { addToCart } from '../slices/cartSlice'
import Seo from '../components/Seo'
import { SITE_URL } from '../config/constants'
import { FiHeart, FiPhone, FiShoppingCart, FiShare2, FiEdit3, FiMinus, FiPlus } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

export default function ProductDetailPage() {
	const { slug } = useParams()
	const [qty, setQty] = useState(1)
	
	// Gramaj seçenekleri (Frontend simülasyonu)
	const weightOptions = [
		{ label: '500 gr', multiplier: 0.5 }, // 500gr genelde tam yarısı olmaz, biraz daha pahalı olur
		{ label: '1000 gr', multiplier: 1.0 }
	]
	const [selectedWeight, setSelectedWeight] = useState(weightOptions[1])

	const dispatch = useDispatch<AppDispatch>()
	const products = useSelector((s: RootState) => s.products.catalog)
	const product = useMemo(() => products.find(p => p.slug === slug), [products, slug])

	if (!product) {
		return <div className="py-20 text-center text-slate-600 text-lg">Ürün bulunamadı.</div>
	}

	// Seçilen gramaja göre fiyat hesaplama
	const currentPrice = product.price * selectedWeight.multiplier

	const handleAddToCart = () => {
		dispatch(addToCart({ 
			id: `${product.id}-${selectedWeight.label}`, // ID'yi benzersiz yap (varyasyon için)
			title: `${product.title} (${selectedWeight.label})`, 
			price: currentPrice, 
			image: product.image, 
			quantity: qty 
		}))
	}

	const increaseQty = () => setQty(q => q + 1)
	const decreaseQty = () => setQty(q => (q > 1 ? q - 1 : 1))

	const jsonLdBase = {
		"@context": "https://schema.org/",
		"@type": "Product",
		"name": product.title,
		"image": [product.image],
		"description": product.description,
		"sku": product.id,
		...(product.gtin13 ? { gtin13: product.gtin13 } : {}),
		"brand": {
			"@type": "Brand",
			"name": "YöreselHane"
		},
		"offers": {
			"@type": "Offer",
			"url": `${SITE_URL}/urun/${product.slug}`,
			"priceCurrency": "TRY",
			"price": product.price.toFixed(2),
			"availability": "https://schema.org/InStock"
		}
	}

	const jsonLd = product.aggregateRating ? {
		...jsonLdBase,
		aggregateRating: {
			"@type": "AggregateRating",
			"ratingValue": product.aggregateRating.ratingValue.toString(),
			"reviewCount": product.aggregateRating.reviewCount.toString()
		}
	} : jsonLdBase

	return (
		<>
			<Seo title={product.title} description={product.description} url={`${SITE_URL}/urun/${product.slug}`} image={product.image} />
			<script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

			<div className="grid md:grid-cols-2 gap-12 lg:gap-16 px-0 py-6">
				{/* Sol Taraf: Ürün Görseli */}
				<div className="space-y-4">
					<div className="aspect-square rounded-xl bg-white border border-slate-100 overflow-hidden relative group">
						<img 
							src={product.image} 
							alt={product.title} 
							className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" 
						/>
						{/* Büyüteç ikonu eklenebilir */}
					</div>
					{/* Küçük resimler (Thumbnail) - Şimdilik ana resmi tekrar gösteriyoruz, ileride galeri eklenebilir */}
					<div className="grid grid-cols-4 gap-4">
						{[1, 2, 3, 4].map((i) => (
							<div key={i} className={`aspect-square rounded-lg border cursor-pointer overflow-hidden ${i === 1 ? 'border-slate-900 ring-1 ring-slate-900' : 'border-slate-200 hover:border-slate-400'}`}>
								<img src={product.image} alt="" className="w-full h-full object-cover" />
							</div>
						))}
					</div>
				</div>

				{/* Sağ Taraf: Ürün Bilgileri */}
				<div className="flex flex-col">
					<h1 className="text-3xl md:text-4xl font-medium text-slate-900 mb-4 font-heading">{product.title}</h1>
					
					{/* Yıldızlar ve Yorum Sayısı */}
					<div className="flex items-center gap-2 mb-6">
						<div className="flex text-yellow-400 text-sm">
							{'★'.repeat(5)}
						</div>
						<span className="text-sm text-slate-500">({product.aggregateRating?.reviewCount || 21} Yorum)</span>
					</div>

					{/* Kısa Açıklama / Özellikler */}
					<div className="space-y-2 text-slate-600 mb-8 text-sm leading-relaxed">
						<p>%100 Orijinal Yöresel Ürün</p>
						<p>Katkı maddesi yok!</p>
						<p>Tatlandırıcı yok!</p>
						<p>Koruyucu madde yok!</p>
					</div>

					{/* Ağırlık Seçimi */}
					<div className="mb-8">
						<span className="block text-sm text-slate-500 mb-2">Ağırlık</span>
						<div className="flex gap-2">
							{weightOptions.map((option) => (
								<button
									key={option.label}
									onClick={() => setSelectedWeight(option)}
									className={`px-4 py-2 border rounded text-sm transition-colors ${
										selectedWeight.label === option.label
											? 'bg-slate-900 text-white border-slate-900'
											: 'border-slate-200 hover:border-slate-900 text-slate-700'
									}`}
								>
									{option.label}
								</button>
							))}
						</div>
					</div>

					{/* Fiyat */}
					<div className="text-3xl font-bold text-slate-900 mb-8">
						₺{currentPrice.toFixed(2)}
					</div>

					{/* Aksiyon Butonları */}
					<div className="flex flex-wrap items-center gap-4 mb-8">
						{/* Adet Seçici */}
						<div className="flex items-center border border-slate-300 rounded-full h-12 w-32 justify-between px-4">
							<button onClick={decreaseQty} className="text-slate-500 hover:text-slate-900 transition-colors"><FiMinus /></button>
							<span className="font-semibold text-lg">{qty}</span>
							<button onClick={increaseQty} className="text-slate-500 hover:text-slate-900 transition-colors"><FiPlus /></button>
						</div>

						{/* Sepete Ekle */}
						<button
							onClick={handleAddToCart}
							className="flex-1 h-12 bg-[#19262e] text-white font-bold rounded-full hover:bg-slate-800 transition-colors uppercase tracking-wide text-sm px-8 min-w-[160px]"
						>
							SEPETE EKLE
						</button>

						{/* Favori Butonu */}
						<button className="w-12 h-12 border border-slate-300 rounded-full flex items-center justify-center text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-colors">
							<FiHeart className="text-xl" />
						</button>
					</div>

					{/* WhatsApp Sipariş Butonu */}
					<a 
						href={`https://wa.me/905428407589?text=Merhaba, ${product.title} ürünü hakkında bilgi almak istiyorum.`}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-center gap-2 w-full md:w-auto bg-[#25D366] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#20bd5a] transition-colors mb-8 max-w-xs"
					>
						<FaWhatsapp className="text-xl" />
						Whatsapp İle Sipariş Ver
					</a>

					{/* Ek Linkler */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-600 border-t border-slate-100 pt-6">
						<button className="flex items-center gap-2 hover:text-slate-900 transition-colors">
							<FiPhone /> Telefonla Sipariş
						</button>
						<Link to="/giris" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
							<FiShoppingCart /> İstek Listeme Ekle
						</Link>
						<Link to="/giris" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
							<FiShare2 /> Fiyat Düşünce Haber Ver
						</Link>
					</div>
					
					<div className="mt-4 pt-4">
						<Link to="/giris" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
							<FiEdit3 /> Yorum Yaz
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}
