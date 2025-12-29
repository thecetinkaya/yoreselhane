import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import { FiInstagram, FiFacebook, FiPhone } from 'react-icons/fi'
import { FaYoutube, FaPinterest, FaTiktok } from 'react-icons/fa'

const footerImg = '/images/footer.png'

export default function Footer() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    return (
        <footer className="bg-white pt-16 pb-8 border-t border-slate-200 font-sans">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
                    {/* KURUMSAL */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 border-b-2 border-slate-900 inline-block pb-1 text-sm tracking-wider">KURUMSAL</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><Link to="/hakkımızda" className="hover:text-slate-900 transition-colors">Hakkımızda</Link></li>
                            <li><Link to="/gizlilik" className="hover:text-slate-900 transition-colors">Gizlilik ve Güvenlik Politikası</Link></li>
                            <li><Link to="/mesafeli-satis" className="hover:text-slate-900 transition-colors">Mesafeli Satış Sözleşmesi</Link></li>
                            <li><Link to="/kvkk" className="hover:text-slate-900 transition-colors">KVKK</Link></li>
                        </ul>
                    </div>
                    {/* KATEGORİLER */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 border-b-2 border-slate-900 inline-block pb-1 text-sm tracking-wider">KATEGORİLER</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><Link to="/kategori/peynir" className="hover:text-slate-900 transition-colors">Peynir Çeşitleri</Link></li>
                            <li><Link to="/kategori/zeytin" className="hover:text-slate-900 transition-colors">Zeytin & Zeytinyağı</Link></li>
                            <li><Link to="/kategori/kahvaltilik" className="hover:text-slate-900 transition-colors">Kahvaltılık</Link></li>
                            <li><Link to="/kategori/bal" className="hover:text-slate-900 transition-colors">Bal</Link></li>
                        </ul>
                    </div>
                    {/* ALIŞVERİŞ */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 border-b-2 border-slate-900 inline-block pb-1 text-sm tracking-wider">ALIŞVERİŞ</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li>
                                {isAuthenticated ? (
                                    <Link to="/hesabim" className="hover:text-slate-900 transition-colors">Hesabım</Link>
                                ) : (
                                    <Link to="/giris" className="hover:text-slate-900 transition-colors">Giriş Yap</Link>
                                )}
                            </li>
                            <li><Link to="/sepet" className="hover:text-slate-900 transition-colors">Sepetim</Link></li>
                            <li><Link to="/siparislerim" className="hover:text-slate-900 transition-colors">Siparişlerim</Link></li>
                            <li><Link to="/iade" className="hover:text-slate-900 transition-colors">İptal ve İade Koşulları</Link></li>
                        </ul>
                    </div>
                    {/* DESTEK */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 border-b-2 border-slate-900 inline-block pb-1 text-sm tracking-wider">DESTEK</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><Link to="/iletisim" className="hover:text-slate-900 transition-colors">Yardım</Link></li>
                            <li><Link to="/sss" className="hover:text-slate-900 transition-colors">Sıkça Sorulan Sorular</Link></li>
                            <li><Link to="/kargo-takip" className="hover:text-slate-900 transition-colors">Kargo Takip</Link></li>
                            <li><Link to="/iletisim" className="hover:text-slate-900 transition-colors">İletişim</Link></li>
                        </ul>
                    </div>
                    {/* E-BÜLTEN */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 border-b-2 border-slate-900 inline-block pb-1 text-sm tracking-wider">E-BÜLTEN</h4>
                        <p className="text-sm text-slate-600 mb-4 leading-relaxed">Takipte kalın. Fırsatlardan ilk siz haberdar olun!</p>
                        <div className="flex gap-2 mb-8">
                            <input
                                type="email"
                                placeholder="E-posta adresinizi yazın..."
                                className="flex-1 border-b border-slate-300 py-2 focus:outline-none focus:border-slate-900 text-sm bg-transparent"
                            />
                            <button className="font-bold text-slate-900 border-b-2 border-slate-900 text-sm hover:text-slate-700 hover:border-slate-700 transition-colors">GÖNDER</button>
                        </div>
                        <div className="flex gap-5 text-xl text-slate-800">
                            <a href="https://www.instagram.com/yoreselhanecom/" className="hover:text-slate-600 transition-colors"><FiInstagram /></a>
                            <a href="https://www.facebook.com/yoreselhanecom" className="hover:text-slate-600 transition-colors"><FiFacebook /></a>
                            <a href="https://www.youtube.com/@yoreselhanecom" className="hover:text-slate-600 transition-colors"><FaYoutube /></a>
                            <a href="https://pinterest.com/yoreselhanecom" className="hover:text-slate-600 transition-colors"><FaPinterest /></a>
                            <a href="https://tiktok.com/@yoreselhanecom" className="hover:text-slate-600 transition-colors"><FaTiktok /></a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-200 pt-8 flex flex-col lg:flex-row items-center justify-between gap-8">
                    {/* Left: WhatsApp & Contact */}
                    <div className="flex flex-col sm:flex-row items-center gap-8 w-full lg:w-auto justify-center lg:justify-start">
                        <a href="https://wa.me/905428407589" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border border-green-500 text-green-600 px-5 py-3 rounded hover:bg-green-50 transition-colors group">
                            <FiPhone className="text-2xl group-hover:scale-110 transition-transform" />
                            <span className="font-semibold">WhatsApp Destek</span>
                        </a>
                        <div className="text-center sm:text-left">
                            <div className="text-xs text-slate-500 mb-1">Müşteri Hizmetleri</div>
                            <div className="font-bold text-slate-800 text-lg">0542 840 75 89</div>
                            <div className="text-xs text-slate-500 mt-1">info@yoreselhane.com</div>
                        </div>
                    </div>

                    {/* Right: Payment Logos */}
                    <div className="w-full lg:w-auto flex justify-center lg:justify-end">
                        <img src={footerImg} alt="Ödeme Yöntemleri" className="h-8 md:h-10 object-contain opacity-80 grayscale hover:grayscale-0 transition-all" />
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-xs text-slate-400 mt-12">
                    <p>© {new Date().getFullYear()} Yöreselhane. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    )
}
