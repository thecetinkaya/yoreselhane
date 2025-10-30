import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'

export default function Layout({ children }: { children: React.ReactNode }) {
	const cartQty = useSelector((s: RootState) => s.cart.totalQuantity)
	return (
		<div className="min-h-screen flex flex-col bg-white text-slate-900">
			{/* Top Bar */}
			<div className="hidden md:block border-b border-slate-200 bg-slate-50/80">
				<div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 h-10 flex items-center justify-between text-sm text-slate-700">
					<div className="flex items-center gap-6">
						<span>Doğal ve gurme ürünler</span>
						<span className="hidden lg:inline">300 TL üzeri kargo bedava</span>
					</div>
					<div className="flex items-center gap-6">
						<Link to="/about" className="hover:text-slate-900">Hakkımızda</Link>
						<Link to="/support" className="hover:text-slate-900">Destek</Link>
					</div>
				</div>
			</div>

			{/* Navbar */}
			<header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
				<div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8">
					<div className="h-20 flex items-center justify-between">
						<Link to="/" className="flex items-center gap-3 group">
							<div className="flex flex-col">
								<span className="text-2xl font-bold">Yöreselhane</span>
							</div>
						</Link>

						<div className="hidden lg:flex items-center w-full max-w-2xl mx-8">
							<div className="relative flex-1">
								<input type="text" placeholder="Ezine peynir, Gemlik zeytin, çiçek bal..." className="w-full rounded-l-xl border border-slate-300 bg-white px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300" />
							</div>
							<button className="rounded-r-xl bg-slate-900 text-white px-6 py-3 text-sm font-semibold hover:bg-black transition-colors">Ara</button>
						</div>

						<div className="flex items-center gap-6">
							<Link to="/sepet" className="relative flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-100">
								<span className="font-medium">Sepet</span>
								{cartQty > 0 && (<span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold w-5 h-5">{cartQty}</span>)}
							</Link>
							<Link to="/hesabim" className="px-4 py-2 rounded-xl hover:bg-slate-100 font-medium">Hesabım</Link>
						</div>
					</div>

					<div className="h-14 flex items-center justify-between">
						<div className="relative group">
							<button className="inline-flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-2.5 hover:bg-slate-50">
								<span className="font-semibold">Tüm Kategoriler</span>
								<span>▾</span>
							</button>
							<div className="pointer-events-none group-hover:pointer-events-auto invisible group-hover:visible absolute left-0 mt-2 min-w-80 rounded-2xl border border-slate-200 bg-white shadow-2xl p-4 grid grid-cols-2 gap-2">
								<DropdownLink to="/kategori/peynir" label="Peynir Çeşitleri" desc="Ezine, Kaşar, Gravyer" />
								<DropdownLink to="/kategori/zeytin" label="Zeytin & Zeytinyağı" desc="Gemlik, Kırma, Naturel" />
								<DropdownLink to="/kategori/bal" label="Doğal Ballar" desc="Çam, Çiçek, Kestane" />
								<DropdownLink to="/kategori/kahvaltilik" label="Kahvaltılık" desc="Reçel, Tereyağı, Kaymak" />
								<DropdownLink to="/kategori/sucuk" label="Şarküteri" desc="Sucuk, Pastırma, Kavurma" />
								<DropdownLink to="/kategori/makarna" label="Makarna & Bakliyat" desc="Ev Yapımı Makarnalar" />
							</div>
						</div>

						<nav className="hidden md:flex items-center gap-2">
							{['Ana Sayfa', 'Peynir', 'Zeytin', 'Bal', 'Kahvaltılık'].map((t, i) => (
								<NavItem key={i} to={["/", "/kategori/peynir", "/kategori/zeytin", "/kategori/bal", "/kategori/kahvaltilik"][i]} label={t} />
							))}
						</nav>
					</div>
				</div>
			</header>

			<main className="flex-1 w-full">
				<div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 py-8">
					{children}
				</div>
			</main>

			<footer className="border-t border-slate-200 bg-white">
				<div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 py-12 grid md:grid-cols-4 gap-8 text-sm text-slate-700">
					<div className="space-y-2">
						<div className="text-xl font-bold">GurmeYöresel</div>
						<p className="leading-relaxed">Türkiye'nin dört bir yanından özenle seçilmiş premium yöresel lezzetler.</p>
					</div>
					<div>
						<div className="font-semibold mb-3">Lezzet Kategorileri</div>
						<ul className="space-y-2">
							<li><Link to="/kategori/peynir" className="hover:text-slate-900">Peynir Çeşitleri</Link></li>
							<li><Link to="/kategori/zeytin" className="hover:text-slate-900">Zeytin & Zeytinyağı</Link></li>
							<li><Link to="/kategori/bal" className="hover:text-slate-900">Doğal Ballar</Link></li>
							<li><Link to="/kategori/kahvaltilik" className="hover:text-slate-900">Kahvaltılık Ürünler</Link></li>
						</ul>
					</div>
					<div>
						<div className="font-semibold mb-3">Kurumsal</div>
						<ul className="space-y-2">
							<li><Link to="/about" className="hover:text-slate-900">Hakkımızda</Link></li>
							<li><Link to="/kvkk" className="hover:text-slate-900">KVKK & Gizlilik</Link></li>
							<li><Link to="/iade" className="hover:text-slate-900">İade & Değişim</Link></li>
							<li><Link to="/teslimat" className="hover:text-slate-900">Teslimat Koşulları</Link></li>
						</ul>
					</div>
					<div>
						<div className="font-semibold mb-3">İletişim</div>
						<div className="space-y-2">
							<p>support@gurmeyoresel.com</p>
							<p>+90 555 000 00 00</p>
							<p>Pzt-Cmt: 09:00 - 18:00</p>
						</div>
					</div>
				</div>
				<div className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
					© {new Date().getFullYear()} GurmeYöresel. Tüm hakları saklıdır.
				</div>
			</footer>
		</div>
	)
}

function NavItem({ to, label }: { to: string; label: string }) {
	return (
		<NavLink to={to} className={({ isActive }) => isActive ? 'px-4 py-2 rounded-xl font-medium bg-slate-900 text-white' : 'px-4 py-2 rounded-xl font-medium hover:bg-slate-100'}>{label}</NavLink>
	)
}

function DropdownLink({ to, label, desc }: { to: string; label: string; desc: string }) {
	return (
		<Link to={to} className="rounded-xl p-3 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors">
			<div className="font-semibold text-slate-900">{label}</div>
			<div className="text-xs text-slate-500 mt-1">{desc}</div>
		</Link>
	)
}