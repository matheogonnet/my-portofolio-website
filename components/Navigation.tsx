'use client'

import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Experiences', path: '/experiences' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
]

const menuVariants = {
  closed: {
    x: "100%",
    opacity: 0,
    transition: { 
      duration: 0.4,
      type: "spring",
      damping: 25,
      stiffness: 200
    }
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      type: "spring",
      damping: 25,
      stiffness: 200,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
}

const itemVariants = {
  closed: { 
    opacity: 0,
    x: 20,
    transition: { duration: 0.2 }
  },
  open: { 
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 }
  }
}

const overlayVariants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.3 }
  },
  open: {
    opacity: 1,
    transition: { duration: 0.4 }
  }
}

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20)
  })

  const pulseVariants = {
    initial: { scale: 1, opacity: 0 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0, 0.3, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3,
      }
    }
  }

  return (
    <>
      <motion.nav 
        className="fixed top-0 z-50 w-full"
        animate={{
          height: isScrolled ? "70px" : "80px",
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className={`relative h-full glass-effect backdrop-blur-2xl transition-all duration-300 ${
            isScrolled ? 'bg-cupertino-600/80' : 'bg-transparent'
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent" />
          
          <div className="container mx-auto h-full px-4">
            <div className="flex h-full items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative ml-[-100px]"
              >
                <Link href="/">
                  <Image
                    src="/images/matheo-gonnet-typo.png"
                    alt="Mathéo Gonnet Logo"
                    width={480}
                    height={200}
                    className="object-contain"
                  />
                </Link>
              </motion.div>
              
              <div className="hidden md:block">
                <motion.ul 
                  className="flex space-x-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.path
                    return (
                      <motion.li 
                        key={item.path}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative"
                      >
                        <Link
                          href={item.path}
                          className={`group relative px-3 py-2 text-sm transition-all duration-300 ${
                            isActive 
                              ? 'text-accent-blue' 
                              : 'text-cupertino-200 hover:text-cupertino-50'
                          }`}
                        >
                          <span className="relative z-10">{item.name}</span>
                          {isActive && (
                            <motion.div
                              layoutId="underline"
                              className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-accent-blue to-blue-400"
                              initial={false}
                              transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 30
                              }}
                            />
                          )}
                          <motion.div
                            className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-accent-blue/5 to-blue-400/5"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileHover={{ 
                              opacity: 1,
                              scale: 1.05
                            }}
                            transition={{ duration: 0.2 }}
                          />
                        </Link>
                      </motion.li>
                    )
                  })}
                </motion.ul>
              </div>

              <div className="relative md:hidden">
                <motion.button
                  className={`glass-button relative p-2 transition-all duration-300 ${
                    isOpen ? 'bg-accent-blue/20' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsOpen(!isOpen)
                    setHasInteracted(true)
                  }}
                  aria-label="Toggle navigation menu"
                >
                  {!hasInteracted && !isOpen && (
                    <motion.div
                      className="absolute -inset-1 rounded-lg border-2 border-accent-blue"
                      variants={pulseVariants}
                      initial="initial"
                      animate="animate"
                    />
                  )}
                  <motion.div
                    animate={isOpen ? "open" : "closed"}
                    className="relative h-5 w-5"
                  >
                    <motion.span
                      className="absolute left-0 top-0 h-0.5 w-5 bg-gradient-to-r from-accent-blue to-blue-400"
                      variants={{
                        closed: { rotate: 0, y: 0 },
                        open: { rotate: 45, y: 2 }
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      className="absolute left-0 top-2 h-0.5 w-5 bg-gradient-to-r from-accent-blue to-blue-400"
                      variants={{
                        closed: { opacity: 1, x: 0 },
                        open: { opacity: 0, x: 20 }
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      className="absolute left-0 top-4 h-0.5 w-5 bg-gradient-to-r from-accent-blue to-blue-400"
                      variants={{
                        closed: { rotate: 0, y: 0 },
                        open: { rotate: -45, y: -2 }
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed right-4 top-[85px] h-auto max-h-[calc(90vh-85px)] w-[280px] overflow-hidden rounded-2xl bg-cupertino-600/70 shadow-lg backdrop-blur-xl md:hidden"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent" />
              <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent" />
              
              <motion.div 
                className="flex h-full flex-col px-6 py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ul className="space-y-4">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.path
                    return (
                      <motion.li
                        key={item.path}
                        variants={itemVariants}
                        custom={index}
                        className="transform"
                      >
                        <Link
                          href={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`group relative block rounded-xl px-4 py-3 text-base font-medium transition-all duration-300 ${
                            isActive
                              ? 'text-accent-blue'
                              : 'text-cupertino-200 hover:text-cupertino-50'
                          }`}
                        >
                          <motion.div
                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-blue/10 to-blue-400/10"
                            initial={false}
                            animate={{
                              opacity: isActive ? 1 : 0,
                              scale: isActive ? 1 : 0.95
                            }}
                            transition={{ duration: 0.2 }}
                          />
                          <motion.span
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative z-10 flex items-center"
                          >
                            {item.name}
                            <motion.div
                              className="ml-2 h-1 w-1 rounded-full bg-accent-blue"
                              initial={{ scale: 0 }}
                              animate={{ scale: isActive ? 1 : 0 }}
                              transition={{ duration: 0.2 }}
                            />
                          </motion.span>
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
} 