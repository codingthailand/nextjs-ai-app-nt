import { Suspense } from "react"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { DashboardClient } from "./dashboard-client"
import { Spinner } from "@/components/ui/spinner"

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Spinner className="size-8" />
        </div>
      }
    >
      <DashboardGuard />
    </Suspense>
  )
}

async function DashboardGuard() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session || session.user.role !== "admin") {
    redirect("/login")
  }

  return <DashboardClient />
}
