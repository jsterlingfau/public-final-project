import {createClient} from '@supabase/supabase-js'

const URL = 'https://zqyfigtzjbxeoeowvtlq.supabase.co'
const API_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxeWZpZ3R6amJ4ZW9lb3d2dGxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNzE5NjUsImV4cCI6MjAyOTY0Nzk2NX0.ZNc4QJWB0yxL56z4VWTG-wFRoiYPYbyKjnaBbCn2FxM'

export const supabase = createClient(URL,API_KEY);