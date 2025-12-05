import AccountLayout from '../../components/AccountLayout'
import { FiMapPin } from 'react-icons/fi'

export default function AddressBookPage() {
  return (
    <AccountLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-slate-800">Adres Defterim</h2>
        <button className="px-4 py-2 bg-[#00b853] text-white rounded hover:bg-[#00a048] transition-colors text-sm font-medium">
          Yeni Ekle
        </button>
      </div>

      <div className="border border-slate-100 rounded-lg p-12 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center mb-6">
          <FiMapPin className="text-4xl text-slate-800" />
        </div>
        
        <h3 className="text-lg font-bold text-slate-800 mb-2">Kayıtlı Adres Bulunamadı!</h3>
        <p className="text-slate-500 mb-8 max-w-md">
          Adresini sistemimize kaydederek sipariş aşamasında ek zaman harcamazsınız.
        </p>
        
        <button className="px-8 py-2 border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition-colors text-sm font-medium">
          Yeni Ekle
        </button>
      </div>
    </AccountLayout>
  )
}
