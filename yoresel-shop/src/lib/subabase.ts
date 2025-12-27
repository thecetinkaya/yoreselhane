// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// .env dosyasındaki bilgileri okuyoruz
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL ve Key bulunamadı! .env dosyasını kontrol et.')
}

// Bağlantıyı oluşturup dışarıya açıyoruz
export const supabase = createClient(supabaseUrl, supabaseKey)