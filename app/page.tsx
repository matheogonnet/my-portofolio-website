'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'

const ConsoleText = ({ text, delay = 0 }: { text: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-center space-x-2"
  >
    <span className="text-accent-purple">{'>'}</span>
    <span className="text-cupertino-200">{text}</span>
  </motion.div>
)

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-cupertino-600">
      {/* Background gradient elements */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-accent-blue/20 blur-[100px]" />
        <div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-accent-purple/20 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent-indigo/20 blur-[100px]" />
      </div>

      <Navigation />
      
      <div className="container relative z-10 mx-auto flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="mb-8 bg-gradient-to-b from-cupertino-50 to-cupertino-200 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl">
            Hi! I'm Mathéo
          </h1>

          {/* Console Simulation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mx-auto max-w-lg"
          >
            <div className="glass-card overflow-hidden rounded-lg p-4">
              <div className="flex items-center space-x-2 border-b border-cupertino-500/30 pb-2">
                <div className="h-3 w-3 rounded-full bg-red-500/50" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                <div className="h-3 w-3 rounded-full bg-green-500/50" />
                <span className="ml-2 text-sm text-cupertino-300">Terminal</span>
              </div>
              
              <div className="mt-4 space-y-2 font-mono text-sm">
                <ConsoleText text="C:\>" delay={0.8} />
                <ConsoleText text="C:\> cd Engineering_Student" delay={1.2} />
                <ConsoleText text="C:\Engineering_Student> cd 22yo" delay={1.6} />
                <ConsoleText text="C:\Engineering_Student\22yo> Open_to_work" delay={2} />
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="mt-1 h-4 w-2 bg-accent-purple"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
} 