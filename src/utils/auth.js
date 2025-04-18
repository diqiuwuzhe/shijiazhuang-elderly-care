import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ekvyuvezjlwngtvbeesy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrdnl1dmV6amx3bmd0dmJlZXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5Mzk5MDQsImV4cCI6MjA2MDUxNTkwNH0.TR-xD_CGcjnWCyP1G99lP3aD2iQO7tku-DXZSTfK7zw'
)

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })
  return { data, error }
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback)
}