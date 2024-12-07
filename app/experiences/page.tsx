'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { BsBriefcase, BsHeart, BsBicycle, BsPeople, BsThreeDots } from 'react-icons/bs'

interface Experience {
  title: string
  company: string
  year: string
  description: string[]
  icon: React.ReactNode
}

const experiences: Experience[] = [
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
    icon: <BsBriefcase className="h-6 w-6" />
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
    icon: <BsBriefcase className="h-6 w-6" />
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
  },
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
    icon: <BsHeart className="h-6 w-6" />
  }
]

export default function Experiences() {
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
        {/* Next Experience Loading Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="glass-card overflow-hidden p-8">
            <div className="flex items-center space-x-4">
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
                className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-purple/20"
              >
                <BsThreeDots className="h-6 w-6 text-accent-purple" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-cupertino-50">🚀 Next Experience is Loading...</h2>
                <motion.div
                  className="mt-2 h-1 w-32 overflow-hidden rounded-full bg-cupertino-500/40"
                >
                  <motion.div
                    className="h-full bg-accent-purple"
                    animate={{
                      x: [-100, 100],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card transform-gpu overflow-hidden p-8"
            >
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-blue/20">
                  {experience.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-cupertino-50">
                      {experience.title}
                    </h3>
                    <span className="rounded-full bg-accent-purple/10 px-3 py-1 text-sm text-accent-purple">
                      {experience.year}
                    </span>
                  </div>
                  <p className="mt-1 text-lg text-accent-blue">{experience.company}</p>
                  <ul className="mt-4 list-inside list-disc space-y-2 text-cupertino-200">
                    {experience.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
} 