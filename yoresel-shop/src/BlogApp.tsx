import { Routes, Route, Link } from 'react-router-dom'
import BlogHomePage from './pages/blog/BlogHomePage'
import BlogPostPage from './pages/blog/BlogPostPage'
import AdminDashboard from './pages/blog/admin/AdminDashboard'
import PostEditorPage from './pages/blog/admin/PostEditorPage'
import BlogAuthPage from './pages/blog/BlogAuthPage'
import PrivateRoute from './components/PrivateRoute'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import logo from './assets/logo.png'

// Bu dosya Blog uygulamanızın ana giriş noktasıdır.
function BlogApp() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
            <ScrollToTop />

            {/* SEO Uyumlu Navbar */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2" title="Yöreselhane Blog Ana Sayfa">
                        <img src={logo} alt="Yöreselhane Logo" className="h-48 w-auto" />
                        <span className="text-xl font-bold text-slate-900 hidden sm:block">Blog</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8" aria-label="Ana Menü">
                        <Link to="/" className="text-base font-medium text-slate-600 hover:text-slate-900 transition-colors" title="Blog Ana Sayfası">Ana Sayfa</Link>
                        <a href="https://yoreselhane.com" className="text-base font-medium text-slate-600 hover:text-slate-900 transition-colors" title="Yöreselhane E-Ticaret Sitesi" target="_blank" rel="noopener noreferrer">Mağaza</a>
                        <Link to="/hakkimizda" className="text-base font-medium text-slate-600 hover:text-slate-900 transition-colors" title="Hakkımızda">Hakkımızda</Link>
                        <Link to="/iletisim" className="text-base font-medium text-slate-600 hover:text-slate-900 transition-colors" title="İletişim">İletişim</Link>
                    </nav>

                    {/* Mobil Menü Butonu (İleride eklenebilir) */}
                    <div className="md:hidden">
                        {/* Hamburger Menu Icon */}
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<BlogHomePage />} />
                    <Route path="/giris" element={<BlogAuthPage />} />

                    {/* Admin Routes */}
                    <Route path="/admin" element={<PrivateRoute requireAdmin={true}><AdminDashboard /></PrivateRoute>} />
                    <Route path="/admin/yeni" element={<PrivateRoute requireAdmin={true}><PostEditorPage /></PrivateRoute>} />
                    <Route path="/admin/duzenle/:id" element={<PrivateRoute requireAdmin={true}><PostEditorPage /></PrivateRoute>} />

                    {/* Blog Detail - En sonda olmalı */}
                    <Route path="/:slug" element={<BlogPostPage />} />
                </Routes>
            </main>

            <Footer />
        </div>
    )
}

export default BlogApp