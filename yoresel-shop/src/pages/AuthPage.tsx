import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import Seo from '../components/Seo'

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <Seo title={activeTab === 'login' ? 'Giriş Yap' : 'Üye Ol'} />
      
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-8">
          <button
            className={`flex-1 pb-4 text-center font-medium text-lg transition-colors relative ${
              activeTab === 'login' 
                ? 'text-[#19262e] border-b-2 border-[#19262e]' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Giriş Yap
          </button>
          <button
            className={`flex-1 pb-4 text-center font-medium text-lg transition-colors relative ${
              activeTab === 'register' 
                ? 'text-[#19262e] border-b-2 border-[#19262e]' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
            onClick={() => setActiveTab('register')}
          >
            Üye Ol
          </button>
        </div>

        {/* Forms */}
        {activeTab === 'login' ? (
          <LoginForm showPassword={showPassword} setShowPassword={setShowPassword} />
        ) : (
          <RegisterForm showPassword={showPassword} setShowPassword={setShowPassword} />
        )}
      </div>
    </div>
  )
}

function LoginForm({ showPassword, setShowPassword }: { showPassword: boolean, setShowPassword: (v: boolean) => void }) {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="E-posta"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19262e] focus:border-transparent transition-all"
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Şifre"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19262e] focus:border-transparent transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-[#19262e] text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
      >
        Giriş Yap
      </button>

      <div className="flex justify-end">
        <a href="#" className="text-sm text-slate-500 hover:text-[#19262e]">Şifremi Unuttum</a>
      </div>

      <div className="pt-4">
        <button
          type="button"
          className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 font-medium"
        >
          <FcGoogle size={24} />
          Google ile Bağlan
        </button>
      </div>

      <div className="flex items-start gap-3 pt-2">
        <input
          id="login-terms"
          type="checkbox"
          className="mt-1 w-4 h-4 rounded border-slate-300 text-[#19262e] focus:ring-[#19262e]"
        />
        <label htmlFor="login-terms" className="text-sm text-slate-500 leading-tight">
          <Link to="/kvkk" className="text-[#3b82f6] hover:underline">Üyelik koşullarını</Link> ve <Link to="/kvkk" className="text-[#3b82f6] hover:underline">kişisel verilerimin korunmasını</Link> kabul ediyorum.
        </label>
      </div>
    </form>
  )
}

function RegisterForm({ showPassword, setShowPassword }: { showPassword: boolean, setShowPassword: (v: boolean) => void }) {
  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Adınız"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19262e] focus:border-transparent transition-all"
        />
        <input
          type="text"
          placeholder="Soyadınız"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19262e] focus:border-transparent transition-all"
        />
        <input
          type="email"
          placeholder="E-posta"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19262e] focus:border-transparent transition-all"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Şifre"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19262e] focus:border-transparent transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
        
        {/* Phone Input with Flag */}
        <div className="flex">
          <div className="flex items-center justify-center px-3 bg-slate-50 border border-r-0 border-slate-200 rounded-l-lg text-slate-500">
            <img src="https://flagcdn.com/w20/tr.png" alt="TR" className="w-5 h-auto mr-2" />
            <span className="text-sm font-medium">+90</span>
          </div>
          <input
            type="tel"
            placeholder="501 234 56 78"
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#19262e] focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-start gap-3">
          <input
            id="email-consent"
            type="checkbox"
            className="mt-1 w-4 h-4 rounded border-slate-300 text-[#19262e] focus:ring-[#19262e]"
          />
          <label htmlFor="email-consent" className="text-sm text-slate-600 leading-tight">
            Kampanya, duyuru, bilgilendirmelerden e-posta ile haberdar olmak istiyorum.
          </label>
        </div>
        <div className="flex items-start gap-3">
          <input
            id="sms-consent"
            type="checkbox"
            className="mt-1 w-4 h-4 rounded border-slate-300 text-[#19262e] focus:ring-[#19262e]"
          />
          <label htmlFor="sms-consent" className="text-sm text-slate-600 leading-tight">
            Kampanya, duyuru, bilgilendirmelerden sms ile haberdar olmak istiyorum.
          </label>
        </div>
        <div className="flex items-start gap-3">
          <input
            id="register-terms"
            type="checkbox"
            className="mt-1 w-4 h-4 rounded border-slate-300 text-[#19262e] focus:ring-[#19262e]"
          />
          <label htmlFor="register-terms" className="text-sm text-slate-500 leading-tight">
            <Link to="/kvkk" className="text-[#3b82f6] hover:underline">Üyelik koşullarını</Link> ve <Link to="/kvkk" className="text-[#3b82f6] hover:underline">kişisel verilerimin korunmasını</Link> kabul ediyorum.
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-[#19262e] text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 mt-4"
      >
        Üye Ol
      </button>
      
      <div className="pt-4">
        <button
          type="button"
          className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 font-medium"
        >
          <FcGoogle size={24} />
          Google ile Bağlan
        </button>
      </div>
    </form>
  )
}
