import AccountLayout from '../../components/AccountLayout'
import { FiRefreshCw } from 'react-icons/fi'

export default function AccountPage() {
  return (
    <AccountLayout>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ad */}
          <div>
            <label className="block text-sm text-slate-500 mb-1">Adınız*</label>
            <input 
              type="text" 
              defaultValue="Burak"
              className="w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:border-orange-500 text-slate-800"
            />
          </div>

          {/* Ülke */}
          <div>
            <label className="block text-sm text-slate-500 mb-1">Ülke</label>
            <select className="w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:border-orange-500 text-slate-800 bg-white">
              <option>Türkiye</option>
            </select>
          </div>

          {/* Soyad */}
          <div>
            <label className="block text-sm text-slate-500 mb-1">Soyadınız*</label>
            <input 
              type="text" 
              defaultValue="Çetinkaya"
              className="w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:border-orange-500 text-slate-800"
            />
          </div>

          {/* Şehir */}
          <div>
            <label className="block text-sm text-slate-500 mb-1">Şehir</label>
            <select className="w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:border-orange-500 text-slate-800 bg-white">
              <option>Şehir Seçiniz</option>
              <option>İstanbul</option>
              <option>Ankara</option>
              <option>İzmir</option>
            </select>
          </div>

          {/* Cep Telefonu */}
          <div>
            <label className="block text-sm text-slate-500 mb-1">Cep Telefonunuz *</label>
            <div className="flex">
              <div className="flex items-center justify-center px-3 border border-r-0 border-slate-200 rounded-l bg-slate-50">
                <img src="https://flagcdn.com/w20/tr.png" alt="TR" className="w-5" />
                <span className="ml-1 text-xs text-slate-600">▼</span>
              </div>
              <input 
                type="tel" 
                defaultValue="+905428407589"
                className="w-full px-4 py-2 border border-slate-200 rounded-r focus:outline-none focus:border-orange-500 text-slate-800"
              />
            </div>
          </div>

          {/* İlçe */}
          <div>
            <label className="block text-sm text-slate-500 mb-1">İlçe</label>
            <select className="w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:border-orange-500 text-slate-800 bg-white">
              <option>İlçe Seçiniz</option>
            </select>
          </div>

          {/* E-posta */}
          <div>
            <label className="block text-sm text-slate-500 mb-1">E-posta Adresiniz</label>
            <input 
              type="email" 
              defaultValue="burakcetinkaya2699@gmail.com"
              className="w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:border-orange-500 text-slate-800"
            />
          </div>

          {/* Öğrenim Durumu */}
          <div>
            <label className="block text-sm text-slate-500 mb-1">Öğrenim Durumu</label>
            <select className="w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:border-orange-500 text-slate-800 bg-white">
              <option>Seçiniz</option>
              <option>İlköğretim</option>
              <option>Lise</option>
              <option>Üniversite</option>
              <option>Yüksek Lisans</option>
            </select>
          </div>

          {/* Cinsiyet */}
          <div>
            <label className="block text-sm text-slate-500 mb-2">Cinsiyet</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="gender" className="text-orange-500 focus:ring-orange-500" />
                <span className="text-sm text-slate-600">Kadın</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="gender" className="text-orange-500 focus:ring-orange-500" />
                <span className="text-sm text-slate-600">Erkek</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="gender" defaultChecked className="text-orange-500 focus:ring-orange-500" />
                <span className="text-sm text-slate-600">Belirtmek İstemiyorum</span>
              </label>
            </div>
          </div>

          {/* Meslek */}
          <div>
            <label className="block text-sm text-slate-500 mb-1">Meslek</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:border-orange-500 text-slate-800"
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-2 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
            <span className="text-sm text-slate-600">Kampanya, duyuru, bilgilendirmelerden e-posta ile haberdar olmak istiyorum.</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
            <span className="text-sm text-slate-600">Kampanya, duyuru, bilgilendirmelerden sms ile haberdar olmak istiyorum.</span>
          </label>
        </div>

        {/* Captcha */}
        <div className="pt-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-slate-100 px-4 py-2 text-2xl font-mono tracking-widest border border-slate-300 select-none relative overflow-hidden">
              <span className="relative z-10 font-bold text-slate-700">2DB6HV</span>
              {/* Random lines for captcha effect */}
              <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 40">
                  <path d="M0,20 Q50,0 100,20" stroke="black" fill="none" />
                  <path d="M0,10 Q50,30 100,10" stroke="blue" fill="none" />
                  <path d="M10,0 L90,40" stroke="red" fill="none" />
                </svg>
              </div>
            </div>
            <button type="button" className="text-slate-500 hover:text-slate-700">
              <FiRefreshCw className="text-xl" />
            </button>
          </div>
          <input 
            type="text" 
            placeholder="Güvenlik Kodu"
            className="w-full md:w-64 px-4 py-2 border border-slate-200 rounded focus:outline-none focus:border-orange-500 text-slate-800"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-end gap-4 pt-4 border-t border-slate-100">
          <button type="button" className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium">
            Üyelik Bilgilerimi Sil
          </button>
          <button type="submit" className="px-6 py-2 bg-[#00b853] text-white rounded hover:bg-[#00a048] transition-colors text-sm font-medium">
            Kaydet
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-4">
          *Üyelik bilgilerini sildiğinizde kişisel verilerin korunması kanunu gereği tüm bilgileriniz sistemden silinmekte olup, yeniden üye olmanız gerekmektedir.
        </p>
      </form>
    </AccountLayout>
  )
}
