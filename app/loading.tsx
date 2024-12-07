'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <motion.div
        className="h-16 w-16 rounded-full border-4 border-cupertino-200 border-t-accent-blue"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
} 