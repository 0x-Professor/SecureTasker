import { redirect } from "next/navigation"
import TaskManager from "@/components/task-manager"
import DashboardHeader from "@/components/dashboard-header"
import { createSupabaseServerClient, isDemoMode } from "@/lib/supabase"

export default async function DashboardPage() {
  if (isDemoMode()) {
    // In demo mode, we'll handle authentication on the client side
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader user={null} />
        <main className="container mx-auto px-4 py-8">
          <TaskManager />
        </main>
      </div>
    )
  }

  try {
    const supabase = createSupabaseServerClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      redirect("/auth/login")
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader user={session.user} />
        <main className="container mx-auto px-4 py-8">
          <TaskManager />
        </main>
      </div>
    )
  } catch (error) {
    redirect("/auth/login")
  }
}
