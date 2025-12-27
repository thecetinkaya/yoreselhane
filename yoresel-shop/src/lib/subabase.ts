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

// Supabase auth state değişikliklerini Redux ile senkronize etmek için küçük bir yardımcı
export async function initAuthListener(dispatch: AppDispatch) {
  // First, read current session (if any) so the app knows auth state immediately
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      // ignore; we'll still subscribe to changes below
      console.warn('supabase.getSession error', error)
    }
    const session = data?.session
    const user = session?.user
    if (user) dispatch(login({ name: user.email || '', email: user.email || '' }))
    else dispatch(logout())
  } catch (err) {
    console.error('initAuthListener getSession failed', err)
    dispatch(logout())
  }

  // Subscribe to future auth state changes
  supabase.auth.onAuthStateChange((_, session) => {
    const user = session?.user
    if (user) {
      dispatch(login({ name: user.email || '', email: user.email || '' }))
    } else {
      dispatch(logout())
    }
  })
}