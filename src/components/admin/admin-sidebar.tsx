"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { RiDashboardLine, RiLogoutBoxRLine, RiStoreLine, RiShoppingCartLine, RiUserLine } from "@remixicon/react"

const navItems = [
  { href: "/dashboard", label: "ภาพรวม", icon: RiDashboardLine },
  { href: "/dashboard/products", label: "สินค้า", icon: RiStoreLine },
  { href: "/dashboard/orders", label: "ออเดอร์", icon: RiShoppingCartLine },
  { href: "/dashboard/users", label: "ผู้ใช้", icon: RiUserLine },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <RiStoreLine className="size-6 text-primary" />
        <span className="text-lg font-bold">Admin</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={isActive}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground data-[active=true]:bg-accent data-[active=true]:text-primary"
            >
              <Icon className="size-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  window.location.href = "/login"
                },
              },
            })
          }}
        >
          <RiLogoutBoxRLine className="size-5" />
          ออกจากระบบ
        </Button>
      </div>
    </aside>
  )
}
