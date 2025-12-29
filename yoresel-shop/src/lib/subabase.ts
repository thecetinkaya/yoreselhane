// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import { login, logout } from '../slices/authSlice'
import type { AppDispatch } from '../store'

// .env dosyasındaki bilgileri okuyoruz
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL ve Key bulunamadı! .env dosyasını kontrol et.')
}

// Bağlantıyı oluşturup dışarıya açıyoruz
export const supabase = createClient(supabaseUrl, supabaseKey)

import type { Session } from '@supabase/supabase-js'

// Supabase auth state değişikliklerini Redux ile senkronize etmek için küçük bir yardımcı
export async function initAuthListener(dispatch: AppDispatch) {
  async function handleSession(session: Session | null) {
    const user = session?.user
    if (user) {
      // Fetch user profile to get role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      dispatch(login({
        id: user.id,
        name: user.email || '',
        email: user.email || '',
        role: profile?.role || 'customer'
      }))
    } else {
      dispatch(logout())
    }
  }

  // First, read current session (if any) so the app knows auth state immediately
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.warn('supabase.getSession error', error)
    }
    await handleSession(data?.session)
  } catch (err) {
    console.error('initAuthListener getSession failed', err)
    dispatch(logout())
  }

  // Subscribe to future auth state changes
  supabase.auth.onAuthStateChange((_, session) => {
    handleSession(session)
  })
}