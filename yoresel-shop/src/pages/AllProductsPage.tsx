import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { selectProductsCatalog, setCatalog, type Product } from '../slices/productsSlice'
import { mockProducts } from '../sampleData'
import ProductCard from '../components/ProductCard'

export default function AllProductsPage() {
    const dispatch = useAppDispatch()
    const products = useAppSelector(selectProductsCatalog)

    useEffect(() => {
        // ensure catalog is set (in dev/mock environment)
        if (!products || products.length === 0) dispatch(setCatalog(mockProducts))
    }, [dispatch, products])

    return (
        <div className="space-y-6 px-0">
            <div>
                <h1 className="text-2xl font-semibold">Tüm Ürünler</h1>
                <p className="text-slate-600">{products.length} ürün listeleniyor</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((p: Product) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    )
}
