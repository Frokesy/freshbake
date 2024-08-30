import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://irjvdbavljsoerfoizrm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyanZkYmF2bGpzb2VyZm9penJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ5NjQ4NzcsImV4cCI6MjA0MDU0MDg3N30.GoNCAEqB-TOZftxHoeAmQgHjmcfBjKieuOTgPeqBC-8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)