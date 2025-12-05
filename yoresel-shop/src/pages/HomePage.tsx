import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setCatalog, selectProductsCatalog, type Product } from '../slices/productsSlice';
import { addToCart } from '../slices/cartSlice';
import { mockProducts } from '../sampleData';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import slideImage1 from '../assets/1.png';
import slideImage2 from '../assets/2.png';
import slideImage3 from '../assets/3.png';
import { FiSearch, FiHeart } from 'react-icons/fi';
import filigran from '../images/filigran.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { SLIDER_COUNT } from '../config/constants';

// Swiper stilleri
import 'swiper/css';
import 'swiper/css/navigation';

export default function HomePage() {
	const dispatch = useAppDispatch()
	const products = useAppSelector(selectProductsCatalog)

	useEffect(() => {
		dispatch(setCatalog(mockProducts))
	}, [dispatch])

	// (Promo banner moved to top bar in Layout)

	return (
		<div className="space-y-16">
			{/* Hero Slider */}
			<HeroSlider
				slides={[
					{
						id: '1',
						title: "Anadolu'nun Yöresel Lezzetleri",
						linkTo: '/kategori/peynir',
						image: slideImage1
					},
					{
						id: '2',
						title: 'Doğal ve Taze Ürünler',
						linkTo: '/kategori/bal',
						image: slideImage2
					},
					{
						id: '3',
						title: 'Haftanın Fırsatları',
						linkTo: '/kategori/zeytin',
						image: slideImage3
					},
				]}
			/>

			{/* Categories Section */}
			<section className="px-0 lg:px-0">
				<div className="w-full">
					<div className="text-center mb-6">
						<h2 className="text-4xl font-extrabold text-slate-900 mb-3">
							Yeni Ürünler
						</h2>
						<div>
							<Link to="/kategori/yeni-urunler" className="inline-block text-sm text-[var(--brand-300)] hover:text-[var(--brand-200)]">
								Kategoriye Git
							</Link>
						</div>
					</div>
					{/* Yeni Ürünler Slider'ı (Kategori kartları yerine) */}
					<Swiper
						modules={[Navigation]}
						spaceBetween={20}
						slidesPerView={4}
						navigation
						breakpoints={{
							320: { slidesPerView: 1, spaceBetween: 12 },
							640: { slidesPerView: 2, spaceBetween: 16 },
							768: { slidesPerView: 3, spaceBetween: 20 },
							1024: { slidesPerView: 4, spaceBetween: 24 },
						}}
						className="!pb-10"
					>
						{products.slice(0, Math.min(products.length, SLIDER_COUNT)).map((p: Product) => (
							<SwiperSlide key={p.id}>
								<ProductCard product={p} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</section>



			{/* Featured Products */}
			<section>
				<div className="w-full">
					<div className="text-center mb-10">
						<h2 className="text-3xl font-bold text-slate-800 mb-2">
							Öne Çıkan Ürünler
						</h2>
						<p className="text-slate-500 text-lg">
							En çok tercih edilen premium ürünler
						</p>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{products.slice(0, 4).map((p: Product) => (
							<ProductCard key={p.id} product={p} />
						))}
					</div>
					<div className="text-center mt-12">
						<Link
							to="/tum-urunler"
							className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900 transition-colors"
						>
							Tüm Ürünleri Gör
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</Link>
					</div>
				</div>
			</section>


			{/* Promo banner removed from HomePage — now displayed in Layout top bar */}

			{/* Filigran / Trust banner under features, above footer */}
			<section className="px-0 lg:px-0">
				<div className="w-full flex justify-center py-8">
					<img src={filigran} alt="Güven ve Hızlı Teslimat" className="w-full max-w-5xl object-contain opacity-90" />
				</div>
			</section>
		</div>
	)
}

function ProductCard({ product }: { product: Product }) {
	const dispatch = useAppDispatch()

	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		dispatch(addToCart(product))
	}

	return (
		<div className="group relative text-center border border-transparent hover:border-slate-200 rounded-lg transition-all duration-300">
			{/* Resim Alanı - square card using Tailwind */}
			<div className="relative overflow-hidden rounded-lg">
				<Link to={`/urun/${product.slug}`} className="block">
					<div className="relative aspect-square w-full">
						<img
							src={product.image}
							alt={product.title}
							className="w-full h-full object-cover transition-transform duration-300 relative z-10"
							loading="lazy"
							decoding="async"
						/>

						{/* Title & price - moved below image; no gradient on image */}

						{/* Sliding add-to-cart: visible by default on mobile, slides up on md+ hover */}
						<div className="absolute left-0 right-0 bottom-0 translate-y-0 opacity-100 pointer-events-auto z-20 md:translate-y-full md:opacity-0 md:pointer-events-none md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-hover:pointer-events-auto transition-transform transition-opacity duration-500 ease-out">
							<button onClick={handleAddToCart} className="w-full py-2 md:py-3 bg-slate-900 text-white font-semibold md:font-extrabold text-sm md:text-base">+ SEPETE EKLE</button>
						</div>
					</div>
				</Link>

				{/* Hover icons (centered) */}
				<div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<Link to={`/urun/${product.slug}`} className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:bg-slate-100 transition-colors" title="Ürünü İncele">
						<FiSearch className="w-5 h-5 text-slate-600" />
					</Link>
					<button onClick={() => { /* Favori Ekleme Mantığı */ }} className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:bg-slate-100 transition-colors" title="Favorilere Ekle">
						<FiHeart className="w-5 h-5 text-slate-600" />
					</button>
				</div>
			</div>
			{/* Title & price below image (moved outside overflow-hidden so CTA can't cover it) */}
			<div className="mt-3 px-2">
				<div className="font-semibold text-sm line-clamp-2 text-slate-800">{product.title}</div>
				<div className="font-extrabold text-lg text-slate-900">{product.price.toFixed(2)} TL</div>
			</div>
		</div>
	)
}