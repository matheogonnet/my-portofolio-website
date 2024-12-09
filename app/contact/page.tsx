'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { BsEnvelope, BsLinkedin, BsGithub, BsCheckCircle, BsExclamationCircle, BsFileEarmarkPdf, BsGlobe, BsArrowRightCircle, BsStar, BsStarFill } from 'react-icons/bs'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

const contactMethods = [
  {
    id: 'email',
    icon: <BsEnvelope className="h-6 w-6" />,
    title: 'Email',
    value: 'matheo.gonnet@yahoo.fr',
    isPreferred: true,
    link: 'mailto:matheo.gonnet@yahoo.fr'
  },
  {
    id: 'github',
    icon: <BsGithub className="h-6 w-6" />,
    title: 'GitHub',
    value: 'github.com/matheogonnet',
    isPreferred: false,
    link: 'https://github.com/matheogonnet'
  },
  {
    id: 'linkedin',
    icon: <BsLinkedin className="h-6 w-6" />,
    title: 'LinkedIn',
    value: 'linkedin.com/in/matheo-gonnet',
    isPreferred: false,
    link: 'https://linkedin.com/in/matheo-gonnet'
  }
]

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = (): boolean => {
    const errors: FormErrors = {}
    
    if (!formData.name.trim()) {
      errors.name = 'Please enter your name'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Please enter your message'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setFormErrors({})
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const ContactMethodCard = ({ method }: { method: typeof contactMethods[0] }) => {
    return (
      <motion.a
        href={method.link}
        target={method.id !== 'email' ? '_blank' : undefined}
        rel={method.id !== 'email' ? 'noopener noreferrer' : undefined}
        className="group relative flex items-center space-x-4 rounded-lg bg-cupertino-500/40 p-4 pl-4 transition-all hover:bg-cupertino-500/60"
        whileHover={{ x: 10, backgroundColor: "rgba(96, 165, 250, 0.2)" }}
        style={{ width: '100%' }}
      >
        {method.isPreferred && (
          <div className="absolute -right-2 -top-2 rounded-full bg-accent-blue/20 p-1.5">
            <BsStarFill className="h-3 w-3 text-accent-blue" />
          </div>
        )}
        <div 
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
            method.id === 'email' 
              ? 'bg-accent-blue/20' 
              : method.id === 'github'
                ? 'bg-blue-500/20'
                : 'bg-blue-400/20'
          }`}
          style={{ marginLeft: '0' }}
        >
          <motion.div
            className={
              method.id === 'email' 
                ? 'text-accent-blue' 
                : method.id === 'github'
                  ? 'text-blue-500'
                  : 'text-blue-400'
            }
            whileHover={{ 
              rotate: method.isPreferred ? [0, -10, 10, -10, 0] : 0,
              scale: 1.1
            }}
            transition={{ duration: 0.3 }}
          >
            {method.icon}
          </motion.div>
        </div>
        <div className="flex-1 min-w-0" style={{ marginLeft: '1rem' }}>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-cupertino-200">{method.title}</p>
            {method.isPreferred && (
              <p className="text-xs text-accent-blue">
                Preferred
              </p>
            )}
          </div>
          <p className="text-cupertino-50 truncate">{method.value}</p>
        </div>
      </motion.a>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-cupertino-600">
      {/* Background gradient elements */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-accent-blue/20 blur-[100px]" />
        <div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-400/20 blur-[100px]" />
      </div>

      <Navigation />
      
      <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8 pt-32 pb-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-xl mx-auto lg:max-w-none"
          >
            <div className="glass-card overflow-hidden p-3 sm:p-6 md:p-8">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-cupertino-50">
                  Get in Touch
                </h1>
                <motion.div
                  animate={{
                    x: [0, 5, 0],
                    rotate: [0, 10, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <BsArrowRightCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-accent-blue" />
                </motion.div>
              </div>
              <p className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg text-cupertino-200">
                Feel free to reach out! I'm always open to discussing new projects, opportunities, or just having a chat.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {contactMethods.map((method) => (
                  <ContactMethodCard key={method.id} method={method} />
                ))}

                <div className="rounded-lg bg-cupertino-500/40 p-3 sm:p-4">
                  <div className="mb-2 flex items-center space-x-2">
                    <BsFileEarmarkPdf className="h-4 w-4 sm:h-5 sm:w-5 text-accent-blue" />
                    <h3 className="text-base sm:text-lg font-semibold text-cupertino-50">Resume</h3>
                  </div>
                  
                  <div className="grid gap-2 sm:grid-cols-2">
                    <motion.a
                      href="/documents/gonnet_matheo_cv_fr.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 sm:space-x-3 rounded-lg bg-cupertino-500/40 p-2 sm:p-3 transition-all hover:bg-cupertino-500/60"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(96, 165, 250, 0.2)" }}
                    >
                      <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-accent-blue/20">
                        <span className="text-xs sm:text-sm font-bold text-accent-blue">FR</span>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-cupertino-200">Version Française</p>
                        <p className="text-xs text-cupertino-300">Voir le CV</p>
                      </div>
                    </motion.a>

                    <motion.a
                      href="/documents/gonnet_matheo_cv_en.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 sm:space-x-3 rounded-lg bg-cupertino-500/40 p-2 sm:p-3 transition-all hover:bg-cupertino-500/60"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(96, 165, 250, 0.2)" }}
                    >
                      <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                        <span className="text-xs sm:text-sm font-bold text-blue-500">EN</span>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-cupertino-200">English Version</p>
                        <p className="text-xs text-cupertino-300">View Resume</p>
                      </div>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-xl mx-auto lg:max-w-none"
          >
            <div className="glass-card overflow-hidden p-3 sm:p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm text-cupertino-200">
                    Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full rounded-lg bg-cupertino-500/40 px-4 py-2 text-cupertino-50 outline-none transition-all focus:bg-cupertino-500/60 focus:ring-2 ${
                      formErrors.name ? 'ring-2 ring-blue-500' : 'ring-accent-blue'
                    }`}
                    placeholder="Your name"
                  />
                  <AnimatePresence>
                    {formErrors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 flex items-center space-x-1 text-sm text-blue-500"
                      >
                        <BsExclamationCircle className="h-4 w-4" />
                        <span>{formErrors.name}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm text-cupertino-200">
                    Email
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full rounded-lg bg-cupertino-500/40 px-4 py-2 text-cupertino-50 outline-none transition-all focus:bg-cupertino-500/60 focus:ring-2 ${
                      formErrors.email ? 'ring-2 ring-blue-500' : 'ring-accent-blue'
                    }`}
                    placeholder="Your email"
                  />
                  <AnimatePresence>
                    {formErrors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 flex items-center space-x-1 text-sm text-blue-500"
                      >
                        <BsExclamationCircle className="h-4 w-4" />
                        <span>{formErrors.email}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm text-cupertino-200">
                    Message
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={`w-full rounded-lg bg-cupertino-500/40 px-4 py-2 text-cupertino-50 outline-none transition-all focus:bg-cupertino-500/60 focus:ring-2 ${
                      formErrors.message ? 'ring-2 ring-blue-500' : 'ring-accent-blue'
                    }`}
                    placeholder="Your message"
                  />
                  <AnimatePresence>
                    {formErrors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 flex items-center space-x-1 text-sm text-blue-500"
                      >
                        <BsExclamationCircle className="h-4 w-4" />
                        <span>{formErrors.message}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full rounded-lg bg-accent-blue px-6 py-3 font-semibold text-cupertino-50 transition-all hover:bg-blue-500 disabled:opacity-50`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                <AnimatePresence>
                  {submitStatus !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`mt-4 flex items-center space-x-2 rounded-lg p-3 ${
                        submitStatus === 'success'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {submitStatus === 'success' ? (
                        <>
                          <BsCheckCircle className="h-5 w-5" />
                          <span>Message sent successfully!</span>
                        </>
                      ) : (
                        <>
                          <BsExclamationCircle className="h-5 w-5" />
                          <span>Failed to send message. Please try again.</span>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
} 