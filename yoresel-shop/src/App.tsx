import MainApp from './MainApp'
import BlogApp from './BlogApp'

function App() {
  // Vite environment variable'ını oku.
  // Yerelde .env dosyasında VITE_APP_MODE=blog veya VITE_APP_MODE=main olarak ayarlanabilir.
  // Vercel'de Environment Variables kısmından ayarlanabilir.
  const appMode = import.meta.env.VITE_APP_MODE || 'main'

  if (appMode === 'blog') {
    return <BlogApp />
  }

  return <MainApp />
}

export default App
