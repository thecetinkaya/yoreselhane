import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type Slide = {
	id: string
	title: string // Resimler için alt metin olarak kullanılacak
	linkTo: string // Tıklandığında gidilecek sayfa
	bg?: string
	image?: string
}

export default function HeroSlider({ slides, intervalMs = 6000 }: { slides: Slide[]; intervalMs?: number }) {
	const [index, setIndex] = useState(0)
	const total = slides.length
	const safeSlides = useMemo(() => slides.filter(Boolean), [slides])

	useEffect(() => {
		if (total <= 1) return
		const t = setInterval(() => setIndex((i) => (i + 1) % total), intervalMs)
		return () => clearInterval(t)
	}, [total, intervalMs])

	if (safeSlides.length === 0) return null
	const current = safeSlides[index]

	return (
		<div className="relative overflow-hidden rounded-2xl">
			{/* Use a taller aspect ratio on mobile so images aren't overly cropped; keep wide banner on md+ */}
			{/* Compact slider on mobile: fixed small height; larger wide banner on md+ */}
			<Link to={current.linkTo} className="block w-full h-40 sm:h-48 md:h-auto md:aspect-[21/7] relative" style={{ background: current.bg ?? 'linear-gradient(135deg, #e2e8f0, #94a3b8)' }}>
				{/* Mobile: use a blurred background fill to avoid letterboxing/gaps when using object-contain */}
				{current.image && (
					<>
						<div
							className="absolute inset-0 bg-center bg-cover filter blur-sm scale-105 md:hidden"
							style={{ backgroundImage: `url(${current.image})` }}
						/>
						<img
							src={current.image}
							alt={current.title}
							className="relative w-full h-full object-contain md:object-cover object-center"
						/>
					</>
				)}
				{/* Yazılar kaldırıldı */}
			</Link>

			{/* İndikatörler */}
			{total > 1 && (
				<div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2 z-20">
					{safeSlides.map((s, i) => (
						<button
							key={s.id}
							onClick={(e) => { e.stopPropagation(); setIndex(i); }}
							className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
							aria-label={`Slide ${i + 1}`}
						/>
					))}
				</div>
			)}

			{/* İleri/Geri Butonları */}
			{total > 1 && (
				<>
					<button
						className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-slate-700 z-20"
						onClick={(e) => { e.stopPropagation(); setIndex((i) => (i - 1 + total) % total); }}
						aria-label="Prev"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
					</button>
					<button
						className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-slate-700 z-20"
						onClick={(e) => { e.stopPropagation(); setIndex((i) => (i + 1) % total); }}
						aria-label="Next"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
					</button>
				</>
			)}
		</div>
	)
}
