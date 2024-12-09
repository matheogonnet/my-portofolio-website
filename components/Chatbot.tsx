'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BsRobot, BsX, BsSend } from 'react-icons/bs'

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
  isError?: boolean
  isHtml?: boolean
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Mathéo's AI assistant. How can I help you learn more about him? 😊",
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      isBot: false,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setNewMessage("")
    setIsLoading(true)

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response')
      }

      // Check if response contains HTML-like content
      const hasHtml = data.reply.includes('<a href=') || data.reply.includes('<br>')

      const botMessage: Message = {
        id: messages.length + 2,
        text: data.reply,
        isBot: true,
        timestamp: new Date(),
        isHtml: hasHtml
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        isBot: true,
        timestamp: new Date(),
        isError: true
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Animation variants for the chat bubble
  const bubbleVariants = {
    attention: {
      scale: [1, 1.05, 1],
      rotate: [0, -3, 3, -3, 0],
      transition: {
        scale: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
          repeatDelay: 3
        },
        rotate: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
          repeatDelay: 3,
          times: [0, 0.2, 0.5, 0.8, 1]
        }
      }
    },
    idle: {
      scale: 1,
      rotate: 0
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 mb-2 w-[350px] overflow-hidden rounded-2xl bg-cupertino-500/40 backdrop-blur-md"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-cupertino-500/30 p-4">
              <div className="flex items-center space-x-2">
                <BsRobot className="h-6 w-6 text-accent-blue" />
                <h2 className="text-xl text-cupertino-50">Ask Me Anything!</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-cupertino-200 transition-colors hover:bg-cupertino-500/40 hover:text-cupertino-50"
              >
                <BsX className="h-6 w-6" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="h-[400px] overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.isBot
                          ? message.isError
                            ? 'bg-red-500/20 text-red-200'
                            : 'bg-cupertino-500/40 text-cupertino-200'
                          : 'bg-accent-blue text-cupertino-50'
                      }`}
                    >
                      {message.isHtml ? (
                        <div 
                          dangerouslySetInnerHTML={{ 
                            __html: message.text.replace(
                              /<a href=/g, 
                              '<a class="text-accent-blue hover:underline" target="_blank" rel="noopener noreferrer" href='
                            )
                          }} 
                        />
                      ) : (
                        message.text
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="border-t border-cupertino-500/30 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={isLoading ? "Waiting for response..." : "Type your message..."}
                  disabled={isLoading}
                  className="flex-1 rounded-full bg-cupertino-500/40 px-4 py-2 text-cupertino-50 placeholder-cupertino-300 outline-none ring-accent-blue transition-shadow focus:ring-2 disabled:opacity-50"
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue text-cupertino-50 transition-transform hover:scale-105 disabled:opacity-50"
                  disabled={!newMessage.trim() || isLoading}
                >
                  <BsSend className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Bubble */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-blue text-cupertino-50 shadow-lg transition-colors hover:bg-accent-blue/90"
        variants={bubbleVariants}
        animate={isOpen ? "idle" : "attention"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <BsRobot className="h-6 w-6" />
        {!isOpen && (
          <motion.div
            className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-blue-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.button>
    </div>
  )
} 