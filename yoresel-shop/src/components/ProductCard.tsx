import { Link } from 'react-router-dom'
import { FiSearch, FiHeart } from 'react-icons/fi'
import { useAppDispatch } from '../hooks'
import { addToCart } from '../slices/cartSlice'
import type { Product } from '../slices/productsSlice'

export default function ProductCard({ product }: { product: Product }) {
    const dispatch = useAppDispatch()

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(addToCart({ id: product.id, title: product.title, price: product.price, image: product.image }))
    }

    return (
        <div className="group relative text-center border border-transparent hover:border-slate-200 rounded-lg transition-all duration-300">
            <div className="relative overflow-hidden rounded-lg">
                <Link to={`/urun/${product.slug}`} className="block">
                    <div className="relative aspect-square w-full">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-300 relative z-10"
                            loading="lazy"
                            decoding="async"
                        />

                        <div className="absolute left-0 right-0 bottom-0 translate-y-0 opacity-100 pointer-events-auto z-20 md:translate-y-full md:opacity-0 md:pointer-events-none md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-hover:pointer-events-auto transition-transform transition-opacity duration-500 ease-out">
                            <button onClick={handleAddToCart} className="w-full py-2 md:py-3 bg-slate-900 text-white font-semibold md:font-extrabold text-sm md:text-base">+ SEPETE EKLE</button>
                        </div>
                    </div>
                </Link>

                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to={`/urun/${product.slug}`} className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:bg-slate-100 transition-colors" title="Ürünü İncele">
                        <FiSearch className="w-5 h-5 text-slate-600" />
                    </Link>
                    <button onClick={() => { /* Favori Ekleme Mantığı */ }} className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:bg-slate-100 transition-colors" title="Favorilere Ekle">
                        <FiHeart className="w-5 h-5 text-slate-600" />
                    </button>
                </div>
            </div>
            <div className="mt-3 px-2">
                <div className="font-semibold text-sm line-clamp-2 text-slate-800">{product.title}</div>
                <div className="font-extrabold text-lg text-slate-900">{product.price.toFixed(2)} TL</div>
            </div>
        </div>
    )
}
