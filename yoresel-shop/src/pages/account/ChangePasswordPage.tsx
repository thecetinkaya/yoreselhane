import AccountLayout from '../../components/AccountLayout'
import { FiRefreshCw, FiEye, FiEyeOff } from 'react-icons/fi'
import { useState } from 'react'

export default function ChangePasswordPage() {
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

  return (
    <AccountLayout title="Şifremi Değiştir">
      <div className="max-w-2xl">
        <p className="text-sm text-slate-600 mb-6">
          Şifrenizi değiştirmek için lütfen onay anahtarını ve yeni şifrenizi giriniz.
        </p>

        <form className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 space-y-6">
            <h3 className="font-semibold text-slate-800 border-b border-slate-200 pb-2">Şifremi Değiştir</h3>
            
            {/* Yeni Şifre */}
            <div className="relative">
              <input 
                type={showPassword1 ? "text" : "password"}
                placeholder="Yeni Şifre"
                className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:border-orange-500 text-slate-800 bg-white"
              />
              <button 
                type="button"
                onClick={() => setShowPassword1(!showPassword1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword1 ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Yeni Şifre Tekrar */}
            <div className="relative">
              <input 
                type={showPassword2 ? "text" : "password"}
                placeholder="Yeni Şifre (tekrar)"
                className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:border-orange-500 text-slate-800 bg-white"
              />
              <button 
                type="button"
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword2 ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Captcha */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white px-4 py-2 text-2xl font-mono tracking-widest border border-slate-300 select-none relative overflow-hidden">
                  <span className="relative z-10 font-bold text-slate-700">2DRKXS</span>
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
                className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:border-orange-500 text-slate-800 bg-white"
              />
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-[#19262e] text-white rounded hover:bg-slate-800 transition-colors font-medium">
            Gönder
          </button>
        </form>
      </div>
    </AccountLayout>
  )
}
