"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type UserRole = "admin" | "user"

interface AuthContextType {
  isAuthenticated: boolean
  userRole: UserRole | null
  username: string | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hardcoded credentials
const CREDENTIALS = {
  admin: { password: "admin123", role: "admin" as UserRole },
  user: { password: "user123", role: "user" as UserRole },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [username, setUsername] = useState<string | null>(null)

  const login = (inputUsername: string, password: string): boolean => {
    const userCredentials = CREDENTIALS[inputUsername as keyof typeof CREDENTIALS]
    
    if (userCredentials && userCredentials.password === password) {
      setIsAuthenticated(true)
      setUserRole(userCredentials.role)
      setUsername(inputUsername)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
    setUsername(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
