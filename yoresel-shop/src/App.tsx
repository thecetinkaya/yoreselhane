import './App.css'
import { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useAppDispatch } from './hooks'
import { setCatalog } from './slices/productsSlice'
import { mockProducts } from './sampleData'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AllProductsPage from './pages/AllProductsPage'
import CartPage from './pages/CartPage'
import KvkkPage from './pages/KvkkPage'
import AuthPage from './pages/AuthPage'
import AccountPage from './pages/account/AccountPage'
import ChangePasswordPage from './pages/account/ChangePasswordPage'
import AddressBookPage from './pages/account/AddressBookPage'
import NotificationPreferencesPage from './pages/account/NotificationPreferencesPage'
import OrdersPage from './pages/account/OrdersPage'
import ReturnRequestsPage from './pages/account/ReturnRequestsPage'
import CancelRequestsPage from './pages/account/CancelRequestsPage'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setCatalog(mockProducts))
  }, [dispatch])

  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/giris" element={<AuthPage />} />
        <Route path="/kategori/:slug" element={<CategoryPage />} />
        {/* /yeni-urunler is handled by CategoryPage via slug 'yeni-urunler' */}
        <Route path="/urun/:slug" element={<ProductDetailPage />} />
        <Route path="/tum-urunler" element={<AllProductsPage />} />
        <Route path="/sepet" element={<CartPage />} />
        <Route path="/kvkk" element={<KvkkPage />} />
        
        {/* Account Routes */}
        <Route path="/hesabim" element={<Navigate to="/hesabim/uyelik-bilgileri" replace />} />
        <Route path="/hesabim/uyelik-bilgileri" element={<AccountPage />} />
        <Route path="/hesabim/sifre-degistir" element={<ChangePasswordPage />} />
        <Route path="/hesabim/adres-defterim" element={<AddressBookPage />} />
        <Route path="/hesabim/duyuru-tercihleri" element={<NotificationPreferencesPage />} />
        <Route path="/siparislerim" element={<OrdersPage />} />
        <Route path="/iadelerim" element={<ReturnRequestsPage />} />
        <Route path="/iptal-taleplerim" element={<CancelRequestsPage />} />
      </Routes>
    </Layout>
  )
}

export default App
