'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { 
  BsBriefcase, 
  BsHeart, 
  BsBicycle, 
  BsPeople, 
  BsThreeDots,
  BsChevronDown,
  BsBuilding,
  BsShop,
  BsGift,
  BsHandThumbsUp,
  BsCloud,
  BsGlobe,
  BsGraphUp,
  BsKanban,
  BsLightning,
  BsAward
} from 'react-icons/bs'

interface Experience {
  title: string
  company: string
  year: string
  description: string[]
  icon: React.ReactNode
}

interface Certification {
  title: string
  issueDate: string
  icon: React.ReactNode
}

interface ExperienceSection {
  title: string
  icon: React.ReactNode
  experiences: Experience[]
}

const certifications: Certification[] = [
  {
    title: "AWS Academy Cloud Architecting",
    issueDate: "December 2024",
    icon: <BsCloud className="h-6 w-6" />
  },
  {
    title: "Test of English for International Communication (TOEIC)",
    issueDate: "November 2023",
    icon: <BsGlobe className="h-6 w-6" />
  },
  {
    title: "Python for Data Analysts",
    issueDate: "September 2023",
    icon: <BsGraphUp className="h-6 w-6" />
  },
  {
    title: "Tools and Methods for Project Management",
    issueDate: "April 2023",
    icon: <BsKanban className="h-6 w-6" />
  },
  {
    title: "Understanding Nanosciences",
    issueDate: "March 2023",
    icon: <BsLightning className="h-6 w-6" />
  }
]

const experienceSections: ExperienceSection[] = [
  {
    title: "Professional Experiences",
    icon: <BsBriefcase className="h-6 w-6" />,
    experiences: [
      {
        title: "Full-Stack Engineer Intern",
        company: "Bouygues Telecom",
        year: "2024",
        description: [
          "Developed a full-stack web tool that automated the creation of PowerPoint presentations, reducing preparation time by over 95%.",
          "Integrated REST APIs for real-time retrieval and parsing of 50+ KPIs.",
          "Designed a scalable SQL database to manage and process large datasets.",
          "Created an intuitive UI/UX that was fully adopted by the management teams.",
          "Utilized technologies such as Python, Next.js, SQL, and Docker."
        ],
        icon: <BsBuilding className="h-6 w-6" />
      },
      {
        title: "Store Assistant",
        company: "Carrefour City",
        year: "2022-2023",
        description: [
          "Assisted in managing store inventory and ensuring product availability.",
          "Provided customer support in a fast-paced environment.",
          "Developed skills in organization, communication, and teamwork.",
          "Gained experience in handling day-to-day operations efficiently."
        ],
        icon: <BsShop className="h-6 w-6" />
      },
      {
        title: "Bicycle Delivery Rider",
        company: "Gorillas",
        year: "2021-2022",
        description: [
          "Delivered goods to customers promptly and accurately.",
          "Enhanced skills in time management, navigation, and problem-solving.",
          "Worked independently and adapted to dynamic environments."
        ],
        icon: <BsBicycle className="h-6 w-6" />
      }
    ]
  },
  {
    title: "Volunteer Works",
    icon: <BsHandThumbsUp className="h-6 w-6" />,
    experiences: [
      {
        title: "Volunteer Youth Leader",
        company: "Scouts & Guides of France",
        year: "2012-2022",
        description: [
          "Planned and led community service projects and educational activities.",
          "Developed strong skills in leadership, creativity, and event organization.",
          "Fostered teamwork and collaboration among young participants."
        ],
        icon: <BsPeople className="h-6 w-6" />
      },
      {
        title: "Volunteer",
        company: "Mécénat Chirurgie Cardiaque",
        year: "2023",
        description: [
          "Assisted with fundraising activities at a Christmas charity market.",
          "Enhanced skills in organization, teamwork, and customer engagement.",
          "Contributed to raising awareness and supporting children in need of heart surgery."
        ],
        icon: <BsGift className="h-6 w-6" />
      }
    ]
  }
]

const ExperienceCard = ({ experience }: { experience: Experience }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    whileHover={{ 
      scale: 1.005,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }}
    className="glass-card transform-gpu overflow-hidden p-6 bg-cupertino-500/30"
  >
    <div className="flex items-start space-x-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-blue/20">
        <motion.div
          className="text-accent-blue"
          whileHover={{ 
            scale: 1.05,
            transition: {
              duration: 0.2,
              ease: "easeOut"
            }
          }}
        >
          {experience.icon}
        </motion.div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-xl font-bold text-cupertino-50 line-clamp-2">
            {experience.title}
          </h3>
          <span className="rounded-full bg-accent-blue/10 px-3 py-1 text-sm text-accent-blue whitespace-nowrap">
            {experience.year}
          </span>
        </div>
        <p className="mt-1 text-lg text-blue-400">{experience.company}</p>
        <ul className="mt-4 list-inside list-disc space-y-2 text-cupertino-200">
          {experience.description.map((item, i) => (
            <li key={i} className="line-clamp-3 hover:line-clamp-none transition-all duration-200">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </motion.div>
)

const CertificationCard = ({ certification }: { certification: Certification }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    whileHover={{ 
      scale: 1.005,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }}
    className="glass-card transform-gpu overflow-hidden p-6 bg-cupertino-500/30"
  >
    <div className="flex items-center space-x-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-blue/20">
        <motion.div
          className="text-accent-blue"
          whileHover={{ 
            scale: 1.05,
            transition: {
              duration: 0.2,
              ease: "easeOut"
            }
          }}
        >
          {certification.icon}
        </motion.div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-lg font-semibold text-cupertino-50 line-clamp-2">
            {certification.title}
          </h3>
          <p className="text-sm text-blue-400 whitespace-nowrap">{certification.issueDate}</p>
        </div>
      </div>
    </div>
  </motion.div>
)

const Section = ({ section }: { section: ExperienceSection }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-6">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-card flex w-full items-center justify-between p-6"
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center space-x-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-blue/20">
            <span className="text-accent-blue">
              {section.icon}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-cupertino-50">{section.title}</h2>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-accent-blue"
        >
          <BsChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-4 overflow-hidden pl-4 sm:pl-8"
          >
            {section.experiences.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const CertificationsSection = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-6">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-card flex w-full items-center justify-between p-6"
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center space-x-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-blue/20">
            <span className="text-accent-blue">
              <BsAward className="h-6 w-6" />
            </span>
          </div>
          <h2 className="text-2xl font-bold text-cupertino-50">Certifications</h2>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-accent-blue"
        >
          <BsChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-4 overflow-hidden pl-4 sm:pl-8"
          >
            {certifications.map((certification, index) => (
              <CertificationCard key={index} certification={certification} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Experiences() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-cupertino-600">
      {/* Background gradient elements */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-accent-blue/20 blur-[100px]" />
        <div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-400/20 blur-[100px]" />
      </div>

      <Navigation />
      
      <div className="container relative z-10 mx-auto px-4 pt-32 pb-8">
        {/* Next Experience Loading Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent-blue/10 via-blue-500/10 to-blue-400/10 p-6 sm:p-8">
            <div className="absolute inset-0 bg-cupertino-600/50 backdrop-blur-sm" />
            <div className="relative flex flex-col sm:flex-row items-center gap-6">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent-blue/30 backdrop-blur-xl"
              >
                <BsThreeDots className="h-8 w-8 text-accent-blue" />
              </motion.div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-cupertino-50">🚀 Next Experience Loading...</h2>
                <p className="mt-2 text-base sm:text-lg text-cupertino-200">Stay tuned for my upcoming professional adventure!</p>
                <motion.div
                  className="mt-4 h-1.5 w-48 mx-auto sm:mx-0 overflow-hidden rounded-full bg-cupertino-500/40"
                >
                  <motion.div
                    className="h-full bg-accent-blue"
                    animate={{
                      x: [-192, 192],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Experience Sections */}
        <div className="space-y-6">
          {experienceSections.map((section, index) => (
            <Section key={index} section={section} />
          ))}
          <CertificationsSection />
        </div>
      </div>
    </main>
  )
} 