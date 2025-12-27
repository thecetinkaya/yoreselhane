import AccountLayout from '../../components/AccountLayout'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/subabase'

export default function AccountPage() {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [marketing, setMarketing] = useState(true)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null)

  useEffect(() => {
    let mounted = true
      ; (async () => {
        try {
          const { data: sessionData } = await supabase.auth.getSession()
          const user = sessionData?.session?.user
          if (!user) return

          setEmail(user.email || '')

          const { data: profile, error } = await supabase
            .from('profiles')
            .select('full_name, phone')
            .eq('id', user.id)
            .single()

          if (error) {
            console.warn('profiles select error', error)
          }

          if (profile && mounted) {
            setFullName(profile.full_name || '')
            setPhone(profile.phone || '')
          }
        } catch (err) {
          console.error('load profile failed', err)
        }
      })()

    return () => { mounted = false }
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setLoading(true)
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const user = sessionData?.session?.user
      if (!user) {
        setMessage({ type: 'error', text: 'Giriş yapılmamış. Lütfen giriş yapın.' })
        setLoading(false)
        return
      }

      const full_name = fullName.trim()
      const phoneTrim = phone.trim()

      const { error } = await supabase.from('profiles').upsert({ id: user.id, full_name, phone: phoneTrim })
      if (error) {
        setMessage({ type: 'error', text: error.message })
      } else {
        setMessage({ type: 'success', text: 'Profil bilgileriniz güncellendi.' })
      }
    } catch (err) {
      console.error(err)
      setMessage({ type: 'error', text: 'Güncelleme sırasında hata oluştu.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AccountLayout>
      <form className="space-y-6" onSubmit={handleSave}>
        {message && (
          <div className={`px-4 py-3 rounded-md text-sm ${message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-slate-500 mb-1">Ad & Soyad</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:border-orange-500 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-500 mb-1">E-posta</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full px-4 py-2 border border-slate-200 rounded bg-slate-100 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-500 mb-1">Cep Telefonu *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:border-orange-500 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-500 mb-1">Bildirim Tercihleri</label>
            <div className="flex items-center gap-3">
              <input id="marketing" type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="w-4 h-4" />
              <label htmlFor="marketing" className="text-sm text-slate-600">Kampanya, duyuru ve bilgilendirmelerden haberdar olmak istiyorum.</label>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-end gap-4 pt-4 border-t border-slate-100">
          <button type="submit" disabled={loading} className="px-6 py-2 bg-[#00b853] text-white rounded hover:bg-[#00a048] transition-colors text-sm font-medium">
            {loading ? 'Kaydediliyor...' : 'Güncelle'}
          </button>
        </div>
      </form>
    </AccountLayout>
  )
}
