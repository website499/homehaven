"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: number
  senderId: string
  receiverId: string
  content: string
  timestamp: string
}

export default function Chat({ receiverId }: { receiverId: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const { user } = useAuth()

  useEffect(() => {
    // In a real app, you'd fetch messages from an API
    // This is just a mock implementation
    setMessages([
      {
        id: 1,
        senderId: user?.id || "",
        receiverId,
        content: "Hello, I'm interested in your apartment.",
        timestamp: new Date().toISOString(),
      },
      {
        id: 2,
        senderId: receiverId,
        receiverId: user?.id || "",
        content: "Great! What would you like to know?",
        timestamp: new Date().toISOString(),
      },
    ])
  }, [user, receiverId])

  const handleSendMessage = () => {
    if (newMessage.trim() && user) {
      const message: Message = {
        id: Date.now(),
        senderId: user.id,
        receiverId,
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, message])
      setNewMessage("")
      // In a real app, you'd send this message to an API
    }
  }

  return (
    <div className="border rounded-lg p-4 h-[400px] flex flex-col">
      <ScrollArea className="flex-grow mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 p-2 rounded-lg ${
              message.senderId === user?.id ? "bg-primary text-primary-foreground ml-auto" : "bg-secondary"
            }`}
          >
            <p>{message.content}</p>
            <small className="text-xs opacity-50">{new Date(message.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </ScrollArea>
      <div className="flex">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow mr-2"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  )
}

