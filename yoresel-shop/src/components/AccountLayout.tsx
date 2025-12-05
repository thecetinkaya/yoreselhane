import { Link, useLocation } from 'react-router-dom'
import { 
  FiUser, FiPackage, FiRefreshCw, FiXCircle, FiShoppingCart, 
  FiHeart, FiMessageSquare, FiGift, FiTrendingDown, FiBell, 
  FiFileText, FiTag, FiHeadphones, FiCreditCard, FiLogOut, FiChevronDown, FiChevronRight
} from 'react-icons/fi'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../slices/authSlice'

interface AccountLayoutProps {
  children: React.ReactNode
  title?: string
}

export default function AccountLayout({ children, title }: AccountLayoutProps) {
  const location = useLocation()
  const dispatch = useDispatch()
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(true)

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <nav className="flex flex-col">
                {/* Hesap Ayarlarım Group */}
                <div>
                  <button 
                    onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 border-b border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <FiUser className="text-lg" />
                      <span>Hesap Ayarlarım</span>
                    </div>
                    {isAccountMenuOpen ? <FiChevronDown /> : <FiChevronRight />}
                  </button>
                  
                  {isAccountMenuOpen && (
                    <div className="bg-slate-50">
                      <Link 
                        to="/hesabim/uyelik-bilgileri" 
                        className={`flex items-center gap-3 px-4 py-2 pl-11 text-sm ${isActive('/hesabim/uyelik-bilgileri') ? 'text-orange-600 font-medium' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        <FiChevronRight className="text-xs" /> Üyelik Bilgilerim
                      </Link>
                      <Link 
                        to="/hesabim/sifre-degistir" 
                        className={`flex items-center gap-3 px-4 py-2 pl-11 text-sm ${isActive('/hesabim/sifre-degistir') ? 'text-orange-600 font-medium' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        <FiChevronRight className="text-xs" /> Şifre Değiştir
                      </Link>
                      <Link 
                        to="/hesabim/adres-defterim" 
                        className={`flex items-center gap-3 px-4 py-2 pl-11 text-sm ${isActive('/hesabim/adres-defterim') ? 'text-orange-600 font-medium' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        <FiChevronRight className="text-xs" /> Adres Defterim
                      </Link>
                      <Link 
                        to="/hesabim/duyuru-tercihleri" 
                        className={`flex items-center gap-3 px-4 py-2 pl-11 text-sm ${isActive('/hesabim/duyuru-tercihleri') ? 'text-orange-600 font-medium' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        <FiChevronRight className="text-xs" /> Duyuru Tercihlerim
                      </Link>
                    </div>
                  )}
                </div>

                {/* Other Menu Items */}
                <Link to="/siparislerim" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-100">
                  <FiPackage className="text-lg" /> Siparişlerim
                </Link>
                <Link to="/iadelerim" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-100">
                  <FiRefreshCw className="text-lg" /> İade Taleplerim
                </Link>
                <Link to="/iptal-taleplerim" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-100">
                  <FiXCircle className="text-lg" /> İptal Taleplerim
                </Link>
                <Link to="/sepet" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-100">
                  <FiShoppingCart className="text-lg" /> Alışveriş Sepetim
                </Link>
                <Link to="/favoriler" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-100">
                  <FiHeart className="text-lg" /> Favorilerim
                </Link>
                <Link to="/yorumlarim" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-100">
                  <FiMessageSquare className="text-lg" /> Yorumlarım
                </Link>
                <Link to="/istek-listelerim" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-100">
                  <FiGift className="text-lg" /> İstek Listelerim
                </Link>
                <Link to="/fiyat-alarmi" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-100">
                  <FiTrendingDown className="text-lg" /> Fiyat Alarm Listem
                </Link>
                <Link to="/stok-alarmi" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-100">
                  <FiBell className="text-lg" /> Stok Alarm Listem
                </Link>
                <Link to="/sozlesmelerim" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-100">
                  <FiFileText className="text-lg" /> Sözleşmelerim
                </Link>
                <Link to="/puan-cek" className="flex items-center justify-between px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <FiTag className="text-lg" /> Para Puan / Hediye Çeki
                  </div>
                  <FiChevronRight />
                </Link>
                <Link to="/destek-taleplerim" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-100">
                  <FiHeadphones className="text-lg" /> Destek Taleplerim
                </Link>
                <Link to="/havale-bildirim" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-100">
                  <FiCreditCard className="text-lg" /> Havale Bildirim Formu
                </Link>
                <button 
                  onClick={() => dispatch(logout())}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-red-600 text-left"
                >
                  <FiLogOut className="text-lg" /> Güvenli Çıkış
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {title && <h1 className="text-2xl font-semibold text-slate-800 mb-6">{title}</h1>}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
