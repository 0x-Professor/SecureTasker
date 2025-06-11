// Centralized authentication utilities
import { createSupabaseClient, isDemoMode } from "./supabase"
import { getDemoSession } from "./demo-auth"

export interface User {
  id: string
  email: string | null
  name: string | null
}

export const getCurrentUser = async (): Promise<User | null> => {
  if (isDemoMode()) {
    const demoSession = getDemoSession()
    return demoSession
      ? {
          id: demoSession.id,
          email: demoSession.email,
          name: demoSession.name,
        }
      : null
  }

  try {
    const supabase = createSupabaseClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) return null

    return {
      id: session.user.id,
      email: session.user.email || null,
      name: session.user.user_metadata?.full_name || session.user.email || null,
    }
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

export const requireAuth = async (): Promise<User> => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Authentication required")
  }
  return user
}
