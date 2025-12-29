import { Routes, Route } from 'react-router-dom'

// Bu dosya Blog uygulamanızın ana giriş noktasıdır.
// Blog sayfalarınızı ve layout'unuzu burada tanımlayabilirsiniz.

function BlogApp() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <header className="bg-white shadow-sm p-4">
                <div className="container mx-auto">
                    <h1 className="text-xl font-bold">Yöreselhane Blog</h1>
                </div>
            </header>
            <main className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={
                        <div className="prose lg:prose-xl mx-auto">
                            <h2>Blog Ana Sayfası</h2>
                            <p>Buraya blog yazılarınız gelecek.</p>
                        </div>
                    } />
                    {/* Diğer blog rotalarınızı buraya ekleyin */}
                </Routes>
            </main>
        </div>
    )
}

export default BlogApp
