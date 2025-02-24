"use client"

import type React from "react"
import { createContext, useState } from "react"

type Notification = {
  id: number
  message: string
  type: "success" | "error" | "info"
}

type NotificationContextType = {
  notifications: Notification[]
  addNotification: (message: string, type: "success" | "error" | "info") => void
  removeNotification: (id: number) => void
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (message: string, type: "success" | "error" | "info") => {
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

