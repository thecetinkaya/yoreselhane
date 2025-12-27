import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import Seo from '../components/Seo'
import { supabase } from '../lib/subabase'
import { useAppDispatch } from '../hooks'
import { login } from '../slices/authSlice'

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [showPassword, setShowPassword] = useState(false)
  // navigation and dispatch will be used inside form components via hooks

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <Seo title={activeTab === 'login' ? 'Giriş Yap' : 'Üye Ol'} />

      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-8">
          <button
            type="button"
            className={`flex-1 pb-4 text-center font-medium text-lg transition-colors relative ${activeTab === 'login'
                ? 'text-[#19262e] border-b-2 border-[#19262e]'
                : 'text-slate-400 hover:text-slate-600'
              }`}
            onClick={() => setActiveTab('login')}
          >
            Giriş Yap
          </button>
          <button
            type="button"
            className={`flex-1 pb-4 text-center font-medium text-lg transition-colors relative ${activeTab === 'register'
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
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (res.error) {
      const msg = res.error.message || 'Giriş yapılamadı.'
      // if error mentions confirmation, provide friendly advice
      if (/confirm|verification|verified|doğrul|confirmation/i.test(msg)) {
        setMessage({ type: 'info', text: 'E-posta adresinizi doğrulamanız gerekiyor. Lütfen gelen kutunuzu kontrol edin.' })
      } else {
        setMessage({ type: 'error', text: msg })
      }
      return
    }
    // dispatch to redux
    const user = res.data?.user
    dispatch(login({ name: user?.email || '', email: user?.email || '' }))
    navigate('/')
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {message && (
        <div className={`px-4 py-3 rounded-md text-sm ${message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-100' : message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
          {message.text}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="E-posta"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19262e] focus:border-transparent transition-all"
          />
        </div>
        <div className="relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        disabled={loading}
        className={`w-full py-3 px-4 bg-[#19262e] text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 ${loading ? 'opacity-60' : ''}`}
      >
        {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
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
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('handleRegister start', { firstName, lastName, email, phone })
    setMessage(null)
    // basic client-side validation
    const trimmedEmail = email.trim()
    const trimmedPassword = password
    if (!trimmedEmail || !/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setMessage({ type: 'error', text: 'Lütfen geçerli bir e-posta adresi girin.' })
      return
    }
    if (!trimmedPassword || trimmedPassword.length < 6) {
      setMessage({ type: 'error', text: 'Şifre en az 6 karakter olmalıdır.' })
      return
    }
    setLoading(true)
    try {
      const fullName = `${firstName} ${lastName}`.trim()
      // include user metadata so the DB trigger can populate profiles (full_name, phone)
      const res = await supabase.auth.signUp({
        email: trimmedEmail,
        password: trimmedPassword,
        options: { data: { full_name: fullName, phone } }
      })
      console.log('supabase.signUp result', res)
      if (res.error) {
        // show server error to user
        setMessage({ type: 'error', text: res.error.message })
        return
      }

      // if user created, upsert profile as fallback (the DB trigger may also create it)
      const user = res.data?.user
      const session = res.data?.session
      if (user && session) {
        // we have a session (user is signed in) so we can upsert the profile as that user
        const upsertRes = await supabase.from('profiles').upsert({ id: user.id, full_name: fullName, phone }).select()
        console.log('profile upsert', upsertRes)
      } else if (user && !session) {
        // No session: signUp completed but user must confirm email before signing in.
        console.log('user created but no session (email confirmation required). Skipping profile upsert to avoid 401')
      }

      // Don't navigate when email confirmation is required (no session). Show inline message instead.
      if (session) {
        setMessage({ type: 'success', text: 'Kayıt başarılı. Sisteme giriş yapıldı.' })
        navigate('/')
      } else {
        setMessage({ type: 'info', text: 'Kayıt başarılı. Lütfen e-posta adresinizi doğrulayın.' })
      }
    } catch (err) {
      console.error('handleRegister error', err)
      setMessage({ type: 'error', text: 'Kayıt sırasında beklenmeyen bir hata oluştu. Konsolu kontrol edin.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleRegister}>
      {message && (
        <div className={`px-4 py-3 rounded-md text-sm ${message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-100' : message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
          {message.text}
        </div>
      )}
      <div className="space-y-4">
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          placeholder="Adınız"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19262e] focus:border-transparent transition-all"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder="Soyadınız"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19262e] focus:border-transparent transition-all"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="E-posta"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#19262e] focus:border-transparent transition-all"
        />
        <div className="relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
        disabled={loading}
        className={`w-full py-3 px-4 bg-[#19262e] text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 mt-4 ${loading ? 'opacity-60' : ''}`}
      >
        {loading ? 'Kayıt yapılıyor...' : 'Üye Ol'}
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
