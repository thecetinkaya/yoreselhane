import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setCatalog, selectProductsCatalog } from '../slices/productsSlice'
import { mockProducts } from '../sampleData'
import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider'

export default function HomePage() {
	const dispatch = useAppDispatch()
	const products = useAppSelector(selectProductsCatalog)

	useEffect(() => {
		dispatch(setCatalog(mockProducts))
	}, [dispatch])

	return (
		<div className="space-y-16">
			{/* Hero Slider */}
			<HeroSlider
				slides={[
					{
						id: '1',
						title: "Anadolu'nun Yöresel Lezzetleri",
						subtitle: 'Peynir, zeytin, bal ve daha fazlası',
						cta: { label: 'Alışverişe Başla', to: '/kategori/peynir' },
						bg: 'linear-gradient(135deg, #f59e0b, #d97706)',
						image: '/api/placeholder/1200/600'
					},
					{
						id: '2',
						title: 'Doğal ve Taze Ürünler',
						subtitle: 'Üreticiden sofranıza',
						cta: { label: 'Koleksiyonu Gör', to: '/kategori/bal' },
						bg: 'linear-gradient(135deg, #84cc16, #15803d)',
						image: '/api/placeholder/1200/600'
					},
					{
						id: '3',
						title: 'Haftanın Fırsatları',
						subtitle: 'Seçili ürünlerde indirimler',
						cta: { label: 'İncele', to: '/kategori/zeytin' },
						bg: 'linear-gradient(135deg, #dc2626, #ea580c)',
						image: '/api/placeholder/1200/600'
					},
				]}
			/>

			{/* Categories Section */}
			<section className="px-0 lg:px-0">
				<div className="w-full">
					<div className="text-center mb-10">
						<h2 className="text-3xl font-bold bg-gradient-to-r from-[var(--brand-200)] to-[var(--brand-300)] bg-clip-text text-transparent mb-3">
							Lezzet Kategorileri
						</h2>
						<p className="text-[var(--brand-300)]/60 text-lg">
							Anadolu'nun eşsiz lezzetlerini keşfedin
						</p>
					</div>
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
						<CategoryCard title="Peynir Çeşitleri" slug="peynir" icon="🧀" />
						<CategoryCard title="Zeytin & Zeytinyağı" slug="zeytin" icon="🫒" />
						<CategoryCard title="Doğal Ballar" slug="bal" icon="🍯" />
						<CategoryCard title="Kahvaltılık" slug="kahvaltilik" icon="🍞" />
					</div>
				</div>
			</section>

			{/* Featured Products */}
			<section className="px-0 lg:px-0">
				<div className="w-full">
					<div className="text-center mb-10">
						<h2 className="text-3xl font-bold bg-gradient-to-r from-[var(--brand-200)] to-[var(--brand-300)] bg-clip-text text-transparent mb-3">
							Öne Çıkan Ürünler
						</h2>
						<p className="text-[var(--brand-300)]/60 text-lg">
							En çok tercih edilen premium ürünler
						</p>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
						{products.slice(0, 10).map((p: { id: string; title: string; price: number; image: string; slug: string }) => (
							<ProductCard key={p.id} product={p} />
						))}
					</div>
					<div className="text-center mt-10">
						<Link
							to="/tum-urunler"
							className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[var(--brand-200)]/20 to-[var(--brand-300)]/20 border border-[var(--brand-300)]/30 text-[var(--brand-300)] font-semibold hover:from-[var(--brand-200)]/30 hover:to-[var(--brand-300)]/30 hover:border-[var(--brand-300)]/40 transition-all duration-200"
						>
							Tüm Ürünleri Gör
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</Link>
					</div>
				</div>
			</section>

			{/* Promo Banner */}
			<section className="px-0 lg:px-0">
				<div className="w-full">
					<div className="rounded-2xl bg-[var(--brand-100)] border border-[var(--brand-300)]/20 p-8 md:p-12 text-center">
						<h3 className="text-2xl md:text-3xl font-bold text-[var(--brand-300)] mb-4">
							🚚 300 TL ve Üzeri Alışverişlerde <span className="text-[var(--brand-200)]">Kargo Bedava!</span>
						</h3>
						<p className="text-[var(--brand-300)]/60 text-lg mb-6">
							Anadolu'nun lezzetlerini kapınıza kadar getiriyoruz
						</p>
						<Link
							to="/kampanyalar"
							className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--brand-200)] to-[var(--brand-300)] text-[var(--brand-300)] font-semibold transition-all duration-200 shadow-lg shadow-[var(--brand-300)]/25"
						>
							Kampanyaları İncele
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</Link>
					</div>
				</div>
			</section>

			{/* Features */}
			<section className="px-0 lg:px-0">
				<div className="w-full">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[var(--brand-200)]/10 to-[var(--brand-300)]/10 border border-[var(--brand-300)]/20">
							<div className="w-12 h-12 bg-gradient-to-r from-[var(--brand-200)] to-[var(--brand-300)] rounded-xl flex items-center justify-center mx-auto mb-4">
								<span className="text-xl">🚚</span>
							</div>
							<h4 className="font-bold text-[var(--brand-300)] mb-2">Hızlı Teslimat</h4>
							<p className="text-[var(--brand-300)]/60 text-sm">Aynı gün kargo fırsatı</p>
						</div>
						<div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[var(--brand-200)]/10 to-[var(--brand-300)]/10 border border-[var(--brand-300)]/20">
							<div className="w-12 h-12 bg-gradient-to-r from-[var(--brand-200)] to-[var(--brand-300)] rounded-xl flex items-center justify-center mx-auto mb-4">
								<span className="text-xl">🌱</span>
							</div>
							<h4 className="font-bold text-[var(--brand-300)] mb-2">%100 Doğal</h4>
							<p className="text-[var(--brand-300)]/60 text-sm">Katkısız, doğal ürünler</p>
						</div>
						<div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[var(--brand-200)]/10 to-[var(--brand-300)]/10 border border-[var(--brand-300)]/20">
							<div className="w-12 h-12 bg-gradient-to-r from-[var(--brand-200)] to-[var(--brand-300)] rounded-xl flex items-center justify-center mx-auto mb-4">
								<span className="text-xl">💝</span>
							</div>
							<h4 className="font-bold text-[var(--brand-300)] mb-2">Özel Paket</h4>
							<p className="text-[var(--brand-300)]/60 text-sm">Hediye paketleme hizmeti</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

function CategoryCard({ title, slug, icon }: { title: string; slug: string; icon: string }) {
	return (
		<Link
			to={`/kategori/${slug}`}
			className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--brand-200)]/10 to-[var(--brand-300)]/10 border border-[var(--brand-300)]/20 p-6 text-center hover:from-[var(--brand-200)]/20 hover:to-[var(--brand-300)]/20 hover:border-[var(--brand-300)]/40 hover:shadow-2xl hover:shadow-[var(--brand-300)]/10 transition-all duration-300 transform hover:-translate-y-1"
		>
			<div className="w-16 h-16 bg-gradient-to-r from-[var(--brand-200)] to-[var(--brand-300)] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
				<span className="text-2xl">{icon}</span>
			</div>
			<h3 className="font-bold text-[var(--brand-300)] text-lg mb-2">{title}</h3>
			<p className="text-[var(--brand-300)]/60 text-sm group-hover:text-[var(--brand-200)] transition-colors duration-200">
				Keşfet
			</p>
			<div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-200)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
		</Link>
	)
}

function ProductCard({ product }: { product: { id: string; title: string; price: number; image: string; slug: string } }) {
	return (
		<Link
			to={`/urun/${product.slug}`}
			className="group relative bg-gradient-to-br from-[var(--brand-200)]/5 to-[var(--brand-300)]/5 border border-[var(--brand-300)]/20 rounded-2xl p-4 hover:from-[var(--brand-200)]/10 hover:to-[var(--brand-300)]/10 hover:border-[var(--brand-300)]/40 hover:shadow-2xl hover:shadow-[var(--brand-300)]/10 transition-all duration-300 transform hover:-translate-y-1"
		>
			{/* Product Image */}
			<div className="aspect-square rounded-xl bg-gradient-to-br from-[var(--brand-200)]/10 to-[var(--brand-300)]/10 mb-4 overflow-hidden">
				<div className="w-full h-full bg-[var(--brand-200)]/5 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
					<span className="text-3xl text-[var(--brand-300)]/40">🛒</span>
				</div>
			</div>

			{/* Product Info */}
			<div className="space-y-2">
				<h3 className="font-medium text-[var(--brand-300)]/90 text-sm line-clamp-2 group-hover:text-[var(--brand-300)] transition-colors duration-200">
					{product.title}
				</h3>
				<div className="flex items-center justify-between">
					<span className="font-bold text-[var(--brand-300)] text-lg">
						{product.price.toFixed(2)} TL
					</span>
					<button
						onClick={(e) => {
							e.preventDefault()
							// Add to cart logic here
						}}
						className="opacity-0 group-hover:opacity-100 w-8 h-8 bg-gradient-to-r from-[var(--brand-200)] to-[var(--brand-300)] rounded-lg flex items-center justify-center text-[var(--brand-300)] transition-all duration-200 hover:scale-110"
					>
						+
					</button>
				</div>
			</div>

			{/* Hover Effect */}
			<div className="absolute inset-0 border-2 border-[var(--brand-300)]/0 group-hover:border-[var(--brand-300)]/20 rounded-2xl transition-all duration-300" />
		</Link>
	)
}