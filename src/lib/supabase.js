import { createClient } from '@supabase/supabase-js'

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(
	'https://zafgvnijbjyxgpiljyhk.supabase.co',
	supabaseAnonKey
)

export default supabase
