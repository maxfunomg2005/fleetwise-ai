"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AlertTriangle, BarChart3, Calendar, ClipboardList, FileText, Home, Settings, Truck, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function DashboardSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      title: "Fleet Management",
      href: "/fleet",
      icon: Truck,
    },
    {
      title: "Maintenance",
      href: "/maintenance",
      icon: ClipboardList,
    },
    {
      title: "Calendar",
      href: "/calendar",
      icon: Calendar,
    },
    {
      title: "Reports",
      href: "/reports",
      icon: BarChart3,
    },
    {
      title: "Alerts",
      href: "/alerts",
      icon: AlertTriangle,
    },
    {
      title: "Drivers",
      href: "/drivers",
      icon: User,
    },
    {
      title: "Documents",
      href: "/documents",
      icon: FileText,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="hidden border-r bg-muted/40 lg:block lg:w-64">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Truck className="h-6 w-6" />
            <span>FleetWise</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {routes.map((route) => (
              <Button
                key={route.href}
                asChild
                variant="ghost"
                className={cn(
                  "flex h-9 items-center justify-start gap-2 px-3 hover:bg-muted",
                  pathname === route.href && "bg-muted font-medium",
                )}
              >
                <Link href={route.href}>
                  <route.icon className="h-4 w-4" />
                  {route.title}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
