import { Suspense } from "react"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { ProductsClient } from "./products-client"
import { Spinner } from "@/components/ui/spinner"

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Spinner className="size-8" />
        </div>
      }
    >
      <ProductsGuard />
    </Suspense>
  )
}

async function ProductsGuard() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session || session.user.role !== "admin") {
    redirect("/login")
  }

  return <ProductsClient />
}
