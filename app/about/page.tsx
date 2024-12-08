'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { BsCode, BsLightbulb, BsBook, BsController } from 'react-icons/bs'

const FloatingElement = ({ delay = 0, children }: { delay?: number, children: React.ReactNode }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      delay,
      duration: 0.8,
      y: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }}
  >
    {children}
  </motion.div>
)

const skills = {
  technical: [
    "Python", "R", "C", "C++", "Java", "JavaScript", "HTML", "CSS",
    "SQL (MySQL)", "NoSQL (MongoDB, Elasticsearch)",
    "Power BI", "Apache Spark (Databricks)", "Docker", "Kubernetes",
    "CI/CD", "GitHub", "Machine Learning", "Deep Learning"
  ],
  soft: [
    "Curiosity", "Team Collaboration", "Project Management", "Autonomy"
  ]
}

const education = [
  {
    school: "ECE Paris",
    period: "2020-2025",
    degree: "Master in Engineering, specializing in Data & AI",
    link: "https://www.ece.fr/"
  },
  {
    school: "University of Malta",
    period: "2023",
    degree: "Semester abroad focusing on Machine Learning and Discrete Mathematics",
    link: "https://www.um.edu.mt/"
  },
  {
    school: "Lycée Pierre Termier",
    period: "2020",
    degree: "Scientific Baccalaureate with Honors",
    link: "https://www.etablissement-pierretermier.com/"
  }
]

const interests = [
  { name: "Music", details: "Piano and Guitar" },
  { name: "Motorsports", details: "Formula 1" },
  { name: "Sports", details: "Badminton" }
]

export default function About() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-cupertino-600">
      {/* Background gradient elements */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-accent-blue/20 blur-[100px]" />
        <div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-accent-purple/20 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent-indigo/20 blur-[100px]" />
      </div>

      <Navigation />
      
      <div className="container relative z-10 mx-auto px-4 pt-32">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Introduction Section */}
            <FloatingElement>
              <div className="relative">
                {/* Animated halo effect */}
                <motion.div
                  className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-accent-blue/30 via-accent-purple/30 to-accent-indigo/30 blur-sm"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="glass-card relative p-8">
                  <h1 className="mb-6 font-['Manifesto'] text-4xl font-bold tracking-tight text-cupertino-50">
                    About Me
                  </h1>
                  <p className="text-lg text-cupertino-200">
                  Hi! 👋 I'm Mathéo Gonnet, a 22-year-old student pursuing a Master's in Data & Artificial Intelligence at ECE Paris. Passionate about data science, web development, and AI, I'm constantly seeking to learn and take on new challenges. 🚀                  </p>
                </div>
              </div>
            </FloatingElement>

            {/* Soft Skills Section */}
            <FloatingElement delay={0.2}>
              <div className="glass-card p-8">
                <h2 className="mb-6 text-2xl font-bold text-cupertino-50">Soft Skills</h2>
                <div className="flex flex-wrap gap-4">
                  {skills.soft.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center rounded-lg bg-cupertino-500/40 px-4 py-2"
                    >
                      <BsLightbulb className="mr-2 text-accent-purple" />
                      <span className="text-cupertino-100">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FloatingElement>

            {/* Technical Skills Section */}
            <FloatingElement delay={0.3}>
              <div className="glass-card p-8">
                <h2 className="mb-6 text-2xl font-bold text-cupertino-50">Technical Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.technical.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ color: "#A78BFA" }}
                      transition={{ 
                        delay: index * 0.05,
                        color: { duration: 0.1 }
                      }}
                      className="rounded-full bg-accent-blue/10 px-3 py-1 text-sm text-accent-blue hover:cursor-pointer"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FloatingElement>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Education Section */}
            <FloatingElement delay={0.4}>
              <div className="glass-card p-8">
                <h2 className="mb-6 text-2xl font-bold text-cupertino-50">Education</h2>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <motion.a
                      href={edu.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ delay: index * 0.1 }}
                      className="block rounded-lg bg-cupertino-500/40 p-4 transition-all hover:bg-cupertino-500/60 transform-gpu"
                    >
                      <h3 className="font-semibold text-accent-blue">{edu.school}</h3>
                      <p className="text-sm text-cupertino-200">{edu.period}</p>
                      <p className="mt-1 text-cupertino-100">{edu.degree}</p>
                    </motion.a>
                  ))}
                </div>
              </div>
            </FloatingElement>

            {/* Interests Section */}
            <FloatingElement delay={0.5}>
              <div className="glass-card p-8">
                <h2 className="mb-6 text-2xl font-bold text-cupertino-50">Interests</h2>
                <div className="grid gap-4">
                  {interests.map((interest, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-lg bg-cupertino-500/40 p-4"
                    >
                      <h3 className="font-semibold text-accent-indigo">{interest.name}</h3>
                      <p className="text-sm text-cupertino-200">{interest.details}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FloatingElement>
          </div>
        </div>
      </div>
    </main>
  )
} 