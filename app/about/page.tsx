'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { 
  BsCode, 
  BsLightbulb, 
  BsBook, 
  BsController,
  BsMusicNoteBeamed,
  BsSpeedometer2,
  BsTrophy
} from 'react-icons/bs'

// Calculate age dynamically
const birthDate = new Date('2002-04-11') // April 11, 2002
const currentDate = new Date()
const age = currentDate.getFullYear() - birthDate.getFullYear()

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
    "Strong Communication Skills", 
    "Public Speaking",
    "Team Collaboration", 
    "Project Management", 
    "Autonomy",
    "Curiosity"
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
  { 
    name: "Music", 
    details: "Piano and Guitar",
    icon: BsMusicNoteBeamed,
    color: "text-blue-400"
  },
  { 
    name: "Motorsports", 
    details: "Formula 1",
    icon: BsSpeedometer2,
    color: "text-blue-500"
  },
  { 
    name: "Sports", 
    details: "Badminton, Football",
    icon: BsTrophy,
    color: "text-accent-blue"
  }
]

export default function About() {
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
          {/* Left Column */}
          <div className="space-y-8">
            {/* Introduction Section */}
            <FloatingElement>
              <div className="relative">
                {/* Animated halo effect */}
                <motion.div
                  className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-accent-blue/30 via-blue-500/30 to-blue-400/30 blur-lg"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="relative p-8">
                  <h1 className="mb-6 text-4xl font-bold tracking-tight text-cupertino-50">
                    About Me
                  </h1>
                  <p className="text-lg text-cupertino-200">
                    Hi! 👋 I'm Mathéo Gonnet, a {age}-year-old student pursuing a Master's in Data & Artificial Intelligence at ECE Paris. Passionate about data science, web development, and AI, I'm constantly seeking to learn and take on new challenges. 🚀
                  </p>
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
                      className="group flex items-center rounded-lg bg-cupertino-500/40 px-4 py-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <BsLightbulb className="mr-2 text-accent-blue transition-all duration-300 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
                      </motion.div>
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
                      whileHover={{ scale: 1.05, color: "#60A5FA" }}
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
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-3 top-0 h-full w-0.5 bg-gradient-to-b from-accent-blue via-blue-500 to-blue-400" />
                  
                  <div className="space-y-8">
                    {education.map((edu, index) => (
                      <motion.a
                        href={edu.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="group relative flex items-start pl-10"
                        transition={{ delay: index * 0.1 }}
                      >
                        {/* Dot */}
                        <div 
                          className="absolute left-[0.3rem] top-[1.125rem] h-4 w-4 rounded-full bg-accent-blue transition-colors duration-200 group-hover:bg-blue-400"
                        />
                        
                        {/* Content */}
                        <div className="w-full transform-gpu rounded-lg bg-cupertino-500/40 p-4 transition-all duration-200 hover:bg-cupertino-500/60">
                          <h3 className="font-semibold text-accent-blue">{edu.school}</h3>
                          <p className="text-sm text-cupertino-200">{edu.period}</p>
                          <p className="mt-1 text-cupertino-100">{edu.degree}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
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
                      className="group rounded-lg bg-cupertino-500/40 p-4"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className={`flex h-10 w-10 items-center justify-center rounded-full bg-cupertino-500/40 ${interest.color}`}
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <interest.icon className="h-5 w-5" />
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-accent-blue">{interest.name}</h3>
                          <p className="text-sm text-cupertino-200">{interest.details}</p>
                        </div>
                      </div>
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