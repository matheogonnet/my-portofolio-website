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
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 }
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
}

const itemVariants = {
  closed: { opacity: 0, x: -10 },
  open: { opacity: 1, x: 0 }
}

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20)
  })

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
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cupertino-200/20 to-transparent" />
          
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
                              className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-accent-blue to-accent-purple"
                              initial={false}
                              transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 30
                              }}
                            />
                          )}
                          <motion.div
                            className="absolute inset-0 -z-10 rounded-lg"
                            initial={false}
                            whileHover={{ 
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
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

              <motion.button
                className={`glass-button p-2 transition-all duration-300 md:hidden ${
                  isOpen ? 'bg-accent-blue/20' : ''
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
              >
                <motion.div
                  animate={isOpen ? "open" : "closed"}
                  className="relative h-5 w-5"
                >
                  <motion.span
                    className="absolute left-0 top-0 h-0.5 w-5 bg-gradient-to-r from-cupertino-50 to-cupertino-200"
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 2 }
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="absolute left-0 top-2 h-0.5 w-5 bg-gradient-to-r from-cupertino-50 to-cupertino-200"
                    variants={{
                      closed: { opacity: 1, x: 0 },
                      open: { opacity: 0, x: 20 }
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="absolute left-0 top-4 h-0.5 w-5 bg-gradient-to-r from-cupertino-50 to-cupertino-200"
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
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="absolute left-0 right-0 top-[56px] glass-effect backdrop-blur-2xl md:hidden"
            >
              <motion.div 
                className="container mx-auto px-4 py-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul className="space-y-2">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.path
                    return (
                      <motion.li
                        key={item.path}
                        variants={itemVariants}
                        custom={index}
                        whileHover={{ x: 10 }}
                        className="transform transition-all duration-200"
                      >
                        <Link
                          href={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`block rounded-lg px-4 py-2 text-sm transition-all duration-300 ${
                            isActive
                              ? 'bg-accent-blue/20 text-accent-blue'
                              : 'text-cupertino-200 hover:bg-cupertino-500/40 hover:text-cupertino-50'
                          }`}
                        >
                          <motion.span
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {item.name}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
} 