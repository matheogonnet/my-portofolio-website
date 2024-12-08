'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cupertino-600">
      <div className="relative flex flex-col items-center">
        {/* Logo animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-['Manifesto'] text-4xl text-cupertino-50">
            Matheo
          </h1>
        </motion.div>

        {/* Loading bar */}
        <div className="h-1 w-48 overflow-hidden rounded-full bg-cupertino-500/40">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-indigo"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: 'linear'
            }}
          />
        </div>

        {/* Loading dots */}
        <div className="mt-4 flex space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="h-2 w-2 rounded-full bg-accent-purple"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: index * 0.2,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>

      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-accent-blue/20 blur-[100px]" />
        <div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-accent-purple/20 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent-indigo/20 blur-[100px]" />
      </div>
    </div>
  )
} 