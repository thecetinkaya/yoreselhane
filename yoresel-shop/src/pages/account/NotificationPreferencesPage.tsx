import AccountLayout from '../../components/AccountLayout'
import { useState } from 'react'

export default function NotificationPreferencesPage() {
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [smsEnabled, setSmsEnabled] = useState(true)

  return (
    <AccountLayout title="Beni Haberdar Et">
      <div className="max-w-3xl">
        <p className="text-sm text-slate-600 mb-8">
          Kampanyalarımızdan hangi yolla haberdar olmak istersiniz ?
        </p>

        <div className="space-y-6 mb-8">
          {/* Email Toggle */}
          <div className="flex items-start gap-4">
            <button 
              onClick={() => setEmailEnabled(!emailEnabled)}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${emailEnabled ? 'bg-[#00b853]' : 'bg-slate-200'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${emailEnabled ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
            <div>
              <h4 className="text-sm font-medium text-slate-800">E-Posta ile</h4>
              <p className="text-xs text-slate-500">(Kayıtlı e-mail adresiniz: burakcetinkaya2699@gmail.com)</p>
            </div>
          </div>

          {/* SMS Toggle */}
          <div className="flex items-start gap-4">
            <button 
              onClick={() => setSmsEnabled(!smsEnabled)}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${smsEnabled ? 'bg-[#00b853]' : 'bg-slate-200'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${smsEnabled ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
            <div>
              <h4 className="text-sm font-medium text-slate-800">Sms ile</h4>
              <p className="text-xs text-slate-500">(Kayıtlı telefon numaranız: 905428407589)</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-6">
          Kampanya, duyuru, bilgilendirmelerden onay vereceğiniz yöntem ile haberdar olacaksınız.
        </p>

        <button className="px-8 py-2 bg-slate-400 text-white rounded cursor-not-allowed text-sm font-medium">
          Kaydet
        </button>
      </div>
    </AccountLayout>
  )
}
