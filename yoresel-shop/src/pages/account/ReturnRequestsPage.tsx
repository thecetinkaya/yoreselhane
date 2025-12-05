import AccountLayout from '../../components/AccountLayout'
import { useState } from 'react'
import { FiRefreshCw } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function ReturnRequestsPage() {
  const [isCreating, setIsCreating] = useState(false)

  return (
    <AccountLayout>
      {/* Info Message */}
      <div className="bg-slate-50 p-4 text-sm text-slate-600 mb-6 rounded">
        Bu sayfadan ürün iade talebi oluşturulmaktadır, mevcut taleplerinizin durumunu anlık olarak takip edebilirsiniz. Süreçle ilgili her adımda size e-posta veya SMS ile bilgi vereceğiz.
      </div>

      {/* Header / Actions */}
      <div className="flex justify-end mb-6">
        {isCreating ? (
          <button 
            onClick={() => setIsCreating(false)}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Vazgeç
          </button>
        ) : (
          <button 
            onClick={() => setIsCreating(true)}
            className="px-6 py-2 bg-[#00b853] text-white rounded hover:bg-[#00a048] transition-colors text-sm font-medium"
          >
            Yeni Talep Oluştur
          </button>
        )}
      </div>

      {/* Content */}
      {isCreating ? (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Sipariş No</label>
            <select className="w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:border-orange-500 text-slate-800 bg-white">
              <option>Seçiniz</option>
              {/* Mock orders */}
              <option value="1001">#1001 - 05.12.2025</option>
              <option value="1002">#1002 - 01.12.2025</option>
            </select>
          </div>
        </div>
      ) : (
        <div className="border border-slate-100 rounded-lg p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
          <div className="w-32 h-32 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center mb-6">
            <FiRefreshCw className="text-5xl text-slate-800" />
          </div>
          
          <h3 className="text-lg font-bold text-slate-800 mb-4">Geçmiş İade Kaydı Bulunamadı</h3>
          <p className="text-slate-500 mb-8">
            Şu anda oluşturduğunuz iade kaydı bulunmamaktadır.
          </p>
          
          <Link to="/" className="px-8 py-3 border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition-colors text-sm font-medium">
            Alışverişe Başla
          </Link>
        </div>
      )}
    </AccountLayout>
  )
}
