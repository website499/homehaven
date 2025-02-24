"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Notification = {
  id: number
  message: string
  type: "info" | "success" | "warning" | "error"
}

type NotificationContextType = {
  notifications: Notification[]
  addNotification: (message: string, type: "info" | "success" | "warning" | "error") => void
  removeNotification: (id: number) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (message: string, type: "info" | "success" | "warning" | "error") => {
    const id = Date.now()
    setNotifications((prev) => [...prev, { id, message, type }])
    setTimeout(() => removeNotification(id), 5000) // Auto-remove after 5 seconds
  }

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}

