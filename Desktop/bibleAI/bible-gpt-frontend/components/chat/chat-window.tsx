"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Send } from "lucide-react"

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to Bible GPT! Ask me anything about scripture, passages, theological concepts, or biblical stories. I'm here to help you explore and understand the Bible.",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [
            ...messages.map(m => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text
            })),
            { role: "user", content: input }
          ]
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Failed to parse error response" }))
        throw new Error(errorData.error || "Failed to get response")
      }

      const data = await response.json()
      const aiText = data.response

      const botMessage: Message = {
        id: messages.length + 2,
        text: aiText || "Sorry, I couldn't generate a response.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, I encountered an error processing your question. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 flex items-center justify-between bg-card">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Scripture Explorer</h2>
          <p className="text-xs text-muted-foreground">Ask questions about the Bible</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-lg hover:bg-accent/20">
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-background">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`rounded-xl px-4 py-3 max-w-md ${
              message.sender === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-accent/20"
            }`}>
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-accent/20 rounded-xl px-4 py-3 max-w-md">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse animation-delay-200"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse animation-delay-400"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border px-6 py-4 bg-card">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Ask about verses, topics, or ask for explanations..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
            disabled={loading}
            className="flex-1 bg-input border-border rounded-xl placeholder:text-muted-foreground"
          />
          <Button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-4"
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
