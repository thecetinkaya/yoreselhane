import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useRef, useEffect } from 'react'
import type { RootState } from '../store'
import { logout } from '../slices/authSlice'
import { openCart, closeCart } from '../slices/uiSlice'
// İkonları react-icons kütüphanesinden içe aktarıyoruz
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiChevronRight } from 'react-icons/fi'
import logo from '../assets/logo.png'
import Footer from './Footer'
import Seo from './Seo'
import Notifications from './Notifications'
import WhatsAppButton from './WhatsAppButton'
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from '../config/constants'

export default function Layout({ children }: { children: React.ReactNode }) {
	const dispatch = useDispatch()
	const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
	const { items: cartItems, totalQuantity: cartQty } = useSelector((s: RootState) => s.cart)
	const uiIsCartOpen = useSelector((s: RootState) => s.ui.isCartOpen)
	const cartItemsList = Object.values(cartItems)
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	// Cart popup open state and a small close timer to avoid flicker when moving pointer
	const [isCartOpen, setIsCartOpen] = useState(false)
	const closeTimer = useRef<number | null>(null)

	// Rotating promo messages for the top bar
	const promoMessages = [
		'1500 TL ve üzeri alışverişlerinizde kargo ücretsiz!',
		'2000 TL ve üzeri alışverişlerde Tadım Paketi Hediye',
		// add more messages if needed
	]
	// Static site/ordering notice shown separately under the rotating promos
	const promoNotice = 'Site yapım aşamasındadır. Lütfen siparişleriniz için Whatsapp Sipariş hattı 05428407589 üzerinden iletişime geçiniz.'
	const [promoIndex, setPromoIndex] = useState<number>(0)
	const [promoVisible, setPromoVisible] = useState<boolean>(true)

	useEffect(() => {
		const interval = setInterval(() => {
			setPromoVisible(false)
			setTimeout(() => {
				setPromoIndex(i => (i + 1) % promoMessages.length)
				setPromoVisible(true)
			}, 300)
		}, 4000)

		return () => clearInterval(interval)
	}, [promoMessages.length])

	// sync ui slice cart open state with local state
	useEffect(() => {
		setIsCartOpen(uiIsCartOpen)
	}, [uiIsCartOpen])

	return (
		// peynere.com'daki gibi serif font ailesini kullanmak için font-serif ekledim
		<div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
			<Notifications />
			{/* Default SEO tags; pages can override by rendering their own <Seo /> */}
			<Seo title={SITE_TITLE} description={SITE_DESCRIPTION} url={SITE_URL} />
			{/* Top Bar (Bunu olduğu gibi bıraktım) */}
			{/* Rotating promo bar (fixed height) */}
			<div className="hidden md:block bg-[#19262e] font-sans"> {/* Üst bar sans-serif kalabilir */}
				<div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 h-10 flex items-center justify-center text-lg text-white">
					<span className={`hidden lg:inline text-white font-bold transition-opacity duration-500 ${promoVisible ? 'opacity-100' : 'opacity-0'}`}>
						{promoMessages[promoIndex]}
					</span>
				</div>
			</div>

			{/* Separate static notice bar (doesn't affect rotating promo layout) */}
			<div className="hidden md:block border-b border-slate-200 bg-[#19262e]">
				<div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 h-8 flex items-center justify-center">
					<span className="text-sm text-yellow-300 font-medium">
						{promoNotice}
					</span>
				</div>
			</div>

			{/* Navbar */}
			<header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
				<div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8">
					{/* Tek satırlı navbar yapısı */}
					<div className="h-20 flex items-center justify-between">

						{/* 1. Logo (Sol) */}
						<Link to="/" className="flex items-center gap-3 group">
							<div className="flex flex-col">
								{/* 'PEYNERE' logosu gibi harf aralıklı ve büyük harf */}
								<img src={logo} alt="Yöreselhane" className="h-48 w-auto" />
							</div>
						</Link>

						{/* 2. Navigasyon Linkleri (Orta) */}
						{/* Arama çubuğunu kaldırdım ve navigasyonu buraya taşıdım */}
						<nav className="hidden xl:flex items-center gap-3 font-heading font-bold">
							<NavItem to="/" label="Ana Sayfa" />
							<NavItem to="/kategori/peynir" label="Peynir Çeşitleri" />
							<NavItem to="/kategori/zeytin" label="Zeytin & Zeytinyağı" />
							<NavItem to="/kategori/bal" label="Doğal Ballar" />
							<NavItem to="/kategori/kahvaltilik" label="Kahvaltılık" />
							<NavItem to="/kategori/sucuk" label="Şarküteri" />
						</nav>

						{/* 3. İkonlar (Sağ) */}
						<div className="flex items-center gap-5">
							{/* Arama İkonu */}
							<button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-2xl text-slate-700 hover:text-slate-900 transition-colors">
								<FiSearch />
							</button>

							{/* Hesap Alanı */}
							<div className="relative group h-full flex items-center">
								{isAuthenticated ? (
									<div className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900 transition-colors py-2">
										<FiUser className="text-2xl" />
										<span className="text-sm font-medium hidden xl:block">Hesabım</span>

										{/* Dropdown Menu */}
										<div className="absolute top-full right-0 w-60 bg-white border border-slate-200 rounded-b-lg shadow-lg py-2 hidden group-hover:block z-50">
											<div className="px-4 py-3 border-b border-slate-100">
												<p className="text-sm font-semibold text-slate-800">{user?.name}</p>
											</div>
											<div className="py-1">
												<Link to="/siparislerim" className="flex items-center justify-between px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-orange-600">
													Siparişlerim <FiChevronRight />
												</Link>
												<Link to="/hesabim" className="flex items-center justify-between px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-orange-600">
													Hesabım <FiChevronRight />
												</Link>
												<Link to="/favoriler" className="flex items-center justify-between px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-orange-600">
													Favorilerim <FiChevronRight />
												</Link>
												<Link to="/hesabim/adres-defterim" className="flex items-center justify-between px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-orange-600">
													Adres Defterim <FiChevronRight />
												</Link>
												<Link to="/iadelerim" className="flex items-center justify-between px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-orange-600">
													İade Taleplerim <FiChevronRight />
												</Link>
												<Link to="/kargo-takip" className="flex items-center justify-between px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-orange-600">
													Kargom Nerede <FiChevronRight />
												</Link>
											</div>
											<div className="border-t border-slate-100 mt-1 pt-1 bg-slate-50">
												<button
													onClick={() => dispatch(logout())}
													className="w-full flex items-center justify-between px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-red-600 text-left"
												>
													Çıkış Yap <FiChevronRight />
												</button>
											</div>
										</div>
									</div>
								) : (
									<Link to="/giris" className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors">
										<FiUser className="text-2xl" />
										<span className="text-sm font-medium hidden xl:block">Giriş Yap | Kayıt Ol</span>
									</Link>
								)}
							</div>

							{/* Favoriler İkonu (peynere.com'da var) */}
							<Link to="/favoriler" className="hidden sm:flex items-center gap-2 text-2xl text-slate-700 hover:text-slate-900 transition-colors" aria-label="Favorilerim">
								<FiHeart />
								<span className="text-sm font-medium">Favorilerim</span>
							</Link>

							{/* Sepet İkonu - mouse enter/leave ile kontrol edilen popup (küçük gecikme ile) */}
							<div
								className="relative"
								onMouseEnter={() => {
									// open immediately on enter
									setIsCartOpen(true)
									dispatch(openCart())
									if (closeTimer.current) {
										clearTimeout(closeTimer.current)
										closeTimer.current = null
									}
								}}
								onMouseLeave={() => {
									// small delay to allow pointer to move to popup without closing
									if (closeTimer.current) clearTimeout(closeTimer.current)
									closeTimer.current = window.setTimeout(() => {
										setIsCartOpen(false)
										dispatch(closeCart())
									}, 150)
								}}
								onFocus={() => setIsCartOpen(true)}
								onBlur={() => setIsCartOpen(false)}
							>
								<Link to="/sepet" className="relative text-2xl text-slate-700 hover:text-slate-900 transition-colors block">
									<FiShoppingCart />
									{cartQty > 0 && (
										<span className="absolute -top-2 -right-3 inline-flex items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold w-5 h-5">{cartQty}</span>
									)}
								</Link>

								{/* Sepet Hover Penceresi - gösterimi state ile kontrol ediliyor */}
								<div className={`absolute top-full right-0 mt-0 w-80 bg-white border border-slate-200 rounded-lg shadow-lg p-4 z-50 pointer-events-auto ${isCartOpen ? 'block' : 'hidden'}`}>
									{cartItemsList.length === 0 ? (
										<p className="text-center text-slate-600">Sepetiniz boş.</p>
									) : (
										<>
											<div className="space-y-3">
												{cartItemsList.slice(0, 3).map(item => (
													<div key={item.id} className="flex items-center gap-3">
														<div className="w-16 h-16 bg-slate-100 rounded overflow-hidden">
															<img src={item.image} alt={item.title} className="w-full h-full object-cover" />
														</div>
														<div className="flex-1">
															<p className="font-semibold text-sm text-slate-800">{item.title}</p>
															<p className="text-sm text-slate-600">{item.quantity} x {item.price.toFixed(2)} TL</p>
														</div>
													</div>
												))}
												{cartItemsList.length > 3 && (
													<p className="text-center text-sm text-slate-500 mt-2">...ve {cartItemsList.length - 3} ürün daha</p>
												)}
											</div>
											<Link to="/sepet" className="block w-full text-center bg-slate-800 text-white rounded-md py-2 mt-4 hover:bg-slate-900 transition-colors">
												Sepete Git
											</Link>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
					{/* İkinci satır (Tüm Kategoriler ve Nav) buradan kaldırıldı */}
				</div>
			</header>

			{/* Açılır Arama Barı */}
			{isSearchOpen && (
				<div className="bg-white border-b border-slate-200">
					<div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8">
						<input
							type="text"
							placeholder="Aradığınız ürünü yazın..."
							className="w-full h-16 bg-transparent text-lg font-sans focus:outline-none"
							autoFocus
						/>
					</div>
				</div>
			)}

			import Footer from './Footer'

			// ...existing code...

			{/* Main (Olduğu gibi) */}
			<main className="flex-1 w-full font-sans"> {/* İçerik sans-serif kalabilir */}
				<div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 py-8">
					{children}
				</div>
			</main>

			<Footer />

			{/* WhatsApp Floating Button */}
			<WhatsAppButton />
		</div>
	)
}

// Güncellenmiş NavItem (Daha minimalist)
function NavItem({ to, label }: { to: string; label: string }) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				`px-3 py-2 text-base ${isActive
					? 'text-slate-900' // Aktif link - font ağırlığı kaldırıldı
					: 'text-slate-600' // Aktif olmayan link - font ağırlığı kaldırıldı
				} hover:text-slate-900 transition-colors`
			}
		>
			{label}
		</NavLink>
	)
}