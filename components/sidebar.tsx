"use client"

import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, CheckCircle, CreditCard, ListChecks, LogOut, Wallet } from "lucide-react"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: any) => void
  onLogout: () => void
}

export function Sidebar({ currentPage, onPageChange, onLogout }: SidebarProps) {
  const { userRole, username } = useAuth()

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      visible: true,
    },
    {
      id: "request-form",
      label: "Request Form",
      icon: FileText,
      visible: true,
    },
    {
      id: "payment-approval",
      label: "Payment Approval",
      icon: CheckCircle,
      visible: userRole === "admin",
    },
    {
      id: "make-payment",
      label: "Make Payment",
      icon: CreditCard,
      visible: userRole === "admin",
    },
    {
      id: "tally-entry",
      label: "Tally Entry",
      icon: ListChecks,
      visible: userRole === "admin",
    },
  ]

  return (
    <aside className="w-72 bg-white border-r border-sky-100 flex flex-col shadow-lg shadow-sky-100/30">
      {/* Header */}
      <div className="p-6 border-b border-sky-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-md shadow-sky-200">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Payment Workflow</h2>
            <p className="text-xs text-gray-500">{userRole === "admin" ? "Administrator" : "User"} • {username}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5">
        {menuItems
          .filter((item) => item.visible)
          .map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md shadow-sky-200"
                    : "text-gray-600 hover:bg-sky-50 hover:text-sky-600"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                )}
              </button>
            )
          })}
      </nav>

      {/* Footer with logout */}
      <div className="p-4 border-t border-sky-100">
        <Button 
          onClick={onLogout} 
          variant="outline" 
          className="w-full justify-start gap-3 border-sky-200 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200"
        >
          <LogOut size={18} />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
