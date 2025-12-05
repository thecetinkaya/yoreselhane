import AccountLayout from '../../components/AccountLayout'
import { useState } from 'react'
import { FiBell } from 'react-icons/fi'
import { Link } from 'react-router-dom'

type TabType = 'completed' | 'payment_requested' | 'unpaid'

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<TabType>('completed')

  const renderContent = () => {
    let message = ''

    switch (activeTab) {
      case 'completed':
        message = 'Tamamlanan siparişiniz bulunmamaktadır.'
        break
      case 'payment_requested':
        message = 'Ödeme talep edilen bir siparişiniz bulunmamaktadır.'
        break
      case 'unpaid':
        message = 'Ödemesiz siparişiniz bulunmamaktadır.'
        break
    }

    return (
      <div className="border border-slate-100 rounded-lg p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-32 h-32 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center mb-6">
          <FiBell className="text-5xl text-slate-800" />
        </div>
        
        <h3 className="text-lg font-bold text-slate-800 mb-4">{message}</h3>
        <p className="text-slate-500 mb-8">
          Siparişinizi hızlı ve kolay bir şekilde oluşturabilirsiniz.
        </p>
        
        <Link to="/" className="px-8 py-3 border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition-colors text-sm font-medium">
          Alışverişe Başla
        </Link>
      </div>
    )
  }

  return (
    <AccountLayout>
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-6 py-3 text-sm font-medium border transition-colors ${
            activeTab === 'completed'
              ? 'bg-black text-white border-black'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Tamamlanan Siparişler
        </button>
        <button
          onClick={() => setActiveTab('payment_requested')}
          className={`px-6 py-3 text-sm font-medium border transition-colors ${
            activeTab === 'payment_requested'
              ? 'bg-black text-white border-black'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Ödeme Talep Edilen Siparişler
        </button>
        <button
          onClick={() => setActiveTab('unpaid')}
          className={`px-6 py-3 text-sm font-medium border transition-colors ${
            activeTab === 'unpaid'
              ? 'bg-black text-white border-black'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Ödemesiz Siparişler
        </button>
      </div>

      {renderContent()}
    </AccountLayout>
  )
}
