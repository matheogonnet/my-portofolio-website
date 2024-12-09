'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { BsEnvelope, BsLinkedin, BsGithub, BsCheckCircle, BsExclamationCircle, BsFileEarmarkPdf, BsGlobe } from 'react-icons/bs'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

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
      // Here you would typically send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated delay
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setFormErrors({})
    } catch (error) {
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-cupertino-600">
      {/* Background gradient elements */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-accent-blue/20 blur-[100px]" />
        <div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-400/20 blur-[100px]" />
      </div>

      <Navigation />
      
      <div className="container relative z-10 mx-auto px-4 pt-32">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-card p-8">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-cupertino-50">
                Get in Touch
              </h1>
              <p className="mb-8 text-lg text-cupertino-200">
                Feel free to reach out! I'm always open to discussing new projects, opportunities, or just having a chat.
              </p>

              <div className="space-y-4">
                <motion.a
                  href="mailto:matheo.gonnet@yahoo.fr"
                  className="flex items-center space-x-4 rounded-lg bg-cupertino-500/40 p-4 transition-all hover:bg-cupertino-500/60"
                  whileHover={{ x: 10, backgroundColor: "rgba(96, 165, 250, 0.2)" }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-blue/20">
                    <BsEnvelope className="h-6 w-6 text-accent-blue" />
                  </div>
                  <div>
                    <p className="text-sm text-cupertino-200">Email</p>
                    <p className="text-cupertino-50">matheo.gonnet@yahoo.fr</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://github.com/matheogonnet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 rounded-lg bg-cupertino-500/40 p-4 transition-all hover:bg-cupertino-500/60"
                  whileHover={{ x: 10, backgroundColor: "rgba(96, 165, 250, 0.2)" }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                    <BsGithub className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-cupertino-200">GitHub</p>
                    <p className="text-cupertino-50">github.com/matheogonnet</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/matheo-gonnet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 rounded-lg bg-cupertino-500/40 p-4 transition-all hover:bg-cupertino-500/60"
                  whileHover={{ x: 10, backgroundColor: "rgba(96, 165, 250, 0.2)" }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-400/20">
                    <BsLinkedin className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-cupertino-200">LinkedIn</p>
                    <p className="text-cupertino-50">linkedin.com/in/matheo-gonnet</p>
                  </div>
                </motion.a>

                <div className="rounded-lg bg-cupertino-500/40 p-4">
                  <div className="mb-2 flex items-center space-x-2">
                    <BsFileEarmarkPdf className="h-5 w-5 text-accent-blue" />
                    <h3 className="text-lg font-semibold text-cupertino-50">Resume</h3>
                  </div>
                  
                  <div className="grid gap-2 sm:grid-cols-2">
                    <motion.a
                      href="/documents/gonnet_matheo_cv_fr.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 rounded-lg bg-cupertino-500/40 p-3 transition-all hover:bg-cupertino-500/60"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(96, 165, 250, 0.2)" }}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue/20">
                        <span className="text-sm font-bold text-accent-blue">FR</span>
                      </div>
                      <div>
                        <p className="text-sm text-cupertino-200">Version Française</p>
                        <p className="text-xs text-cupertino-300">Voir le CV</p>
                      </div>
                    </motion.a>

                    <motion.a
                      href="/documents/gonnet_matheo_cv_en.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 rounded-lg bg-cupertino-500/40 p-3 transition-all hover:bg-cupertino-500/60"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(96, 165, 250, 0.2)" }}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                        <span className="text-sm font-bold text-blue-500">EN</span>
                      </div>
                      <div>
                        <p className="text-sm text-cupertino-200">English Version</p>
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
          >
            <div className="glass-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
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