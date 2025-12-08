import { Link } from 'react-router-dom'
import type { Product } from '../slices/productsSlice'

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="group relative text-left h-full flex flex-col">
            {/* Image Section */}
            <div className="relative overflow-hidden mb-3 rounded-xl bg-gray-50">
                <Link to={`/urun/${product.slug}`} className="block">
                    <div className="relative aspect-square w-full">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                </Link>
            </div>

            {/* Details Section */}
            <div className="px-1 flex flex-col flex-grow">
                <Link to={`/urun/${product.slug}`} className="block group-hover:text-slate-700 transition-colors">
                    <h3 className="text-sm font-medium text-slate-900 mb-1 line-clamp-2 min-h-[40px]">
                        {product.title}
                    </h3>
                </Link>
                
                {/* Price Row */}
                <div className="mt-2">
                    <div className="font-bold text-lg text-slate-900">
                        ₺{product.price.toFixed(2).replace('.', ',')}
                    </div>
                </div>
            </div>
        </div>
    )
}
