import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from './ProductCard';
import type { Product } from '../slices/productsSlice';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface ProductSliderProps {
    title: string;
    products: Product[];
    linkTo?: string;
}

export default function ProductSlider({ title, products, linkTo }: ProductSliderProps) {
    const swiperRef = useRef<SwiperType>(null);

    return (
        <section className="py-12">
            <div className="container mx-auto px-12 relative">
                {/* Header - Centered Link */}
                <div className="flex flex-col items-center justify-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
                    {linkTo && (
                        <Link 
                            to={linkTo} 
                            className="text-lg font-medium text-slate-900 border-b border-slate-900 pb-0.5 hover:text-slate-700 transition-colors"
                        >
                            Kategoriye Git
                        </Link>
                    )}
                </div>

                {/* Slider Container */}
                <div className="relative">
                    {/* Left Button - Outside */}
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                        aria-label="Önceki"
                    >
                        <FiChevronLeft size={24} />
                    </button>

                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        breakpoints={{
                            500: { slidesPerView: 2, spaceBetween: 20 },
                            768: { slidesPerView: 3, spaceBetween: 30 },
                            1024: { slidesPerView: 4, spaceBetween: 30 },
                        }}
                        className="!pb-4"
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id} className="h-auto">
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Right Button - Outside */}
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                        aria-label="Sonraki"
                    >
                        <FiChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
}
