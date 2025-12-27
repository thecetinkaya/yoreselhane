import { useAppSelector } from '../hooks';
import { selectProductsCatalog, type Product } from '../slices/productsSlice';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import HeroSlider from '../components/HeroSlider';
import ProductSlider from '../components/ProductSlider';
import slideImage1 from '../assets/1.png';
import slideImage2 from '../assets/2.png';
import slideImage3 from '../assets/3.png';
import { SLIDER_COUNT } from '../config/constants';
// moved to public/images
const filigran = '/images/filigran.png';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
	const products = useAppSelector(selectProductsCatalog)

	return (
		<div className="space-y-16">
			<Seo overrideTitle="Yöreselhane - Doğal ve Yöresel Lezzetler" />
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

			{/* Yeni Ürünler Slider */}
			<ProductSlider
				title="Yeni Ürünler"
				products={products.slice(0, Math.min(products.length, SLIDER_COUNT))}
				linkTo="/kategori/yeni-urunler"
			/>

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

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-12">
						{products.slice(0, 4).map((p: Product) => (
							<ProductCard key={p.id} product={p} />
						))}
					</div>

					<div className="text-center mt-12">
						<Link
							to="/kategori/tum-urunler"
							className="inline-block px-8 py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-lg hover:bg-slate-900 hover:text-white transition-colors uppercase tracking-wide text-sm"
						>
							Tüm Ürünlerimizi Gör
						</Link>
					</div>
				</div>
			</section>

			{/* Filigran / Güven Banner */}
			<section className="">
				<div className="container mx-auto px-4 flex justify-center">
					<img src={filigran} alt="Güven ve Hızlı Teslimat" className="w-full max-w-5xl object-contain opacity-90" />
				</div>
			</section>
		</div>
	)
}