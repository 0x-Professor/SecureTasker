// Demo authentication utilities
export interface DemoUser {
  id: string
  email: string
  password: string
  fullName: string
  created_at: string
}

export interface DemoSession {
  id: string
  email: string
  name: string
}

// Storage keys
const DEMO_USERS_KEY = "securetasker_demo_users"
const DEMO_SESSION_KEY = "securetasker_demo_session"

// Register a new demo user
export function registerDemoUser(email: string, password: string, fullName: string): boolean {
  try {
    // Get existing users
    const existingUsers = getDemoUsers()

    // Check if user already exists
    if (existingUsers.find((user) => user.email === email)) {
      throw new Error("User already exists")
    }

    // Create new user
    const newUser: DemoUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: email.toLowerCase().trim(),
      password: password,
      fullName: fullName.trim(),
      created_at: new Date().toISOString(),
    }

    // Add to users list
    existingUsers.push(newUser)

    // Save to localStorage
    localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(existingUsers))

    console.log("Demo user registered successfully:", { email: newUser.email, id: newUser.id })
    return true
  } catch (error) {
    console.error("Failed to register demo user:", error)
    return false
  }
}

// Login demo user
export function loginDemoUser(email: string, password: string): DemoSession | null {
  try {
    const normalizedEmail = email.toLowerCase().trim()

    // Check for default demo account
    if (normalizedEmail === "demo@securetasker.com" && password === "SecureDemo123!") {
      const session: DemoSession = {
        id: "demo-user-default",
        email: normalizedEmail,
        name: "Demo User",
      }

      // Clear any existing session first
      localStorage.removeItem(DEMO_SESSION_KEY)

      // Set new session
      localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session))
      console.log("Default demo user logged in, session stored:", session)

      // Verify session was stored
      const storedSession = localStorage.getItem(DEMO_SESSION_KEY)
      console.log("Verification - stored session:", storedSession)

      return session
    }

    // Get all registered users
    const users = getDemoUsers()
    console.log("Looking for user:", normalizedEmail)
    console.log(
      "Available users:",
      users.map((u) => ({ email: u.email, id: u.id })),
    )

    // Find user by email
    const user = users.find((u) => u.email === normalizedEmail)

    if (!user) {
      console.log("User not found")
      return null
    }

    // Check password
    if (user.password !== password) {
      console.log("Password mismatch")
      return null
    }

    // Create session
    const session: DemoSession = {
      id: user.id,
      email: user.email,
      name: user.fullName,
    }

    // Clear any existing session first
    localStorage.removeItem(DEMO_SESSION_KEY)

    // Save session
    localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session))
    console.log("Demo user logged in successfully:", session)

    // Verify session was stored
    const storedSession = localStorage.getItem(DEMO_SESSION_KEY)
    console.log("Verification - stored session:", storedSession)

    return session
  } catch (error) {
    console.error("Failed to login demo user:", error)
    return null
  }
}

// Get current demo session
export function getDemoSession(): DemoSession | null {
  try {
    const sessionData = localStorage.getItem(DEMO_SESSION_KEY)
    console.log("Getting demo session, raw data:", sessionData)

    if (!sessionData) {
      console.log("No session data found")
      return null
    }

    const session = JSON.parse(sessionData)
    console.log("Parsed session:", session)
    return session
  } catch (error) {
    console.error("Failed to get demo session:", error)
    return null
  }
}

// Logout demo user
export function logoutDemoUser(): void {
  try {
    localStorage.removeItem(DEMO_SESSION_KEY)
    console.log("Demo user logged out")
  } catch (error) {
    console.error("Failed to logout demo user:", error)
  }
}

// Get all demo users
export function getDemoUsers(): DemoUser[] {
  try {
    const usersData = localStorage.getItem(DEMO_USERS_KEY)
    if (!usersData) return []

    return JSON.parse(usersData)
  } catch (error) {
    console.error("Failed to get demo users:", error)
    return []
  }
}

// Check if user exists
export function demoUserExists(email: string): boolean {
  const users = getDemoUsers()
  return users.some((user) => user.email === email.toLowerCase().trim())
}

// Clear all demo data
export function clearDemoData(): void {
  try {
    localStorage.removeItem(DEMO_USERS_KEY)
    localStorage.removeItem(DEMO_SESSION_KEY)
    localStorage.removeItem("demo_tasks") // Clear tasks too
    console.log("All demo data cleared")
  } catch (error) {
    console.error("Failed to clear demo data:", error)
  }
}
