"use client"

import { useNotification } from "@/context/NotificationContext"
import { X } from "lucide-react"

export default function Notifications() {
  const { notifications, removeNotification } = useNotification()

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`mb-2 p-4 rounded-md shadow-md flex justify-between items-center ${
            notification.type === "success"
              ? "bg-green-500"
              : notification.type === "error"
                ? "bg-red-500"
                : notification.type === "warning"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
          } text-white`}
        >
          <span>{notification.message}</span>
          <button onClick={() => removeNotification(notification.id)} className="ml-4">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}

