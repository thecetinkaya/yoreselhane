import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AllProductsPage from './pages/AllProductsPage'
import CartPage from './pages/CartPage'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kategori/:slug" element={<CategoryPage />} />
        {/* /yeni-urunler is handled by CategoryPage via slug 'yeni-urunler' */}
        <Route path="/urun/:slug" element={<ProductDetailPage />} />
        <Route path="/tum-urunler" element={<AllProductsPage />} />
        <Route path="/sepet" element={<CartPage />} />
      </Routes>
    </Layout>
  )
}

export default App
