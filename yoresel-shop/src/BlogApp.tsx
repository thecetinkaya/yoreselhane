import { Routes, Route, Link } from 'react-router-dom'
import BlogHomePage from './pages/blog/BlogHomePage'
import BlogPostPage from './pages/blog/BlogPostPage'
import AdminDashboard from './pages/blog/admin/AdminDashboard'
import PostEditorPage from './pages/blog/admin/PostEditorPage'
import AuthPage from './pages/AuthPage'
import PrivateRoute from './components/PrivateRoute'
import ScrollToTop from './components/ScrollToTop'

// Bu dosya Blog uygulamanızın ana giriş noktasıdır.
function BlogApp() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <ScrollToTop />

            {/* Basit Header - Admin linki eklenebilir */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold text-slate-900">Yöreselhane<span className="text-blue-600">Blog</span></Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">Ana Sayfa</Link>
                        <Link to="/admin" className="text-sm font-medium text-slate-600 hover:text-slate-900">Yönetim</Link>
                    </nav>
                </div>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<BlogHomePage />} />
                    <Route path="/giris" element={<AuthPage />} />

                    {/* Admin Routes */}
                    <Route path="/admin" element={<PrivateRoute requireAdmin={true}><AdminDashboard /></PrivateRoute>} />
                    <Route path="/admin/yeni" element={<PrivateRoute requireAdmin={true}><PostEditorPage /></PrivateRoute>} />
                    <Route path="/admin/duzenle/:id" element={<PrivateRoute requireAdmin={true}><PostEditorPage /></PrivateRoute>} />

                    {/* Blog Detail - En sonda olmalı */}
                    <Route path="/:slug" element={<BlogPostPage />} />
                </Routes>
            </main>

            <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; {new Date().getFullYear()} Yöreselhane Blog. Tüm hakları saklıdır.</p>
                </div>
            </footer>
        </div>
    )
}

export default BlogApp