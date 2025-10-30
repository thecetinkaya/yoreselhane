import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type Slide = {
	id: string
	title: string
	subtitle?: string
	cta?: { label: string; to: string }
	bg?: string
}

export default function HeroSlider({ slides, intervalMs = 5000 }: { slides: Slide[]; intervalMs?: number }) {
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
		<div className="relative overflow-hidden">
			<div className="aspect-16/6 w-full" style={{ background: current.bg ?? 'linear-gradient(135deg,var(--brand-200),var(--brand-300))' }}>
				<div className="h-full w-full flex items-center">
					<div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 py-8 w-full">
						<div className="max-w-2xl space-y-3">
							<h1 className="text-3xl md:text-5xl font-extrabold text-[var(--brand-300)] drop-shadow-sm">{current.title}</h1>
							{current.subtitle && <p className="text-[var(--brand-300)]/80 md:text-lg">{current.subtitle}</p>}
							{current.cta && (
								<Link to={current.cta.to} className="inline-flex items-center justify-center rounded-md bg-[var(--brand-200)] px-5 py-2.5 text-[var(--brand-300)] shadow hover:opacity-90 transition-colors">
									{current.cta.label}
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
			{total > 1 && (
				<div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
					{safeSlides.map((s, i) => (
						<button
							key={s.id}
							onClick={() => setIndex(i)}
							className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-[var(--brand-300)]' : 'w-2 bg-[var(--brand-300)]/50'}`}
							aria-label={`Slide ${i + 1}`}
						/>
					))}
				</div>
			)}
			{total > 1 && (
				<>
					<button
						className="absolute left-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-[var(--brand-100)]/90 hover:opacity-100 shadow flex items-center justify-center border border-[var(--brand-300)]/10"
						onClick={() => setIndex((i) => (i - 1 + total) % total)}
						aria-label="Prev"
					>
						<span className="i-hero-chevron-left">‹</span>
					</button>
					<button
						className="absolute right-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-[var(--brand-100)]/90 hover:opacity-100 shadow flex items-center justify-center border border-[var(--brand-300)]/10"
						onClick={() => setIndex((i) => (i + 1) % total)}
						aria-label="Next"
					>
						<span className="i-hero-chevron-right">›</span>
					</button>
				</>
			)}
		</div>
	)
}
