import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/905428407589"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-6 md:bottom-6 md:right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-[#20bd5a] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] group"
      aria-label="WhatsApp Sipariş Hattı"
      title="WhatsApp Sipariş Hattı"
    >
      <FaWhatsapp className="text-3xl" />
      
      {/* Hover Tooltip (Desktop) */}
      <span className="absolute right-full mr-3 bg-white text-slate-800 px-3 py-1.5 rounded-lg shadow-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap hidden md:block pointer-events-none">
        Sipariş için bize yazın
      </span>
    </a>
  )
}
