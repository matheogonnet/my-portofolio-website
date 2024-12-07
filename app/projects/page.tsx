'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { BsGithub } from 'react-icons/bs'

interface Project {
  name: string
  description: string
  technologies: string
  githubLink: string
  icon: string
}

const projects: Project[] = [
  {
    name: "Predict House",
    description: "A machine learning project designed to predict real estate prices based on various property features. This project involves data preprocessing, feature engineering, and applying regression models to provide accurate price predictions.",
    technologies: "Python, Scikit-Learn, Pandas, Matplotlib",
    githubLink: "https://github.com/matheogonnet/predict-house",
    icon: "🏠"
  },
  {
    name: "Best Keyboard Layout",
    description: "This project uses a genetic algorithm to determine the most efficient keyboard layout that minimizes typing effort. By analyzing a given text corpus, it evolves layouts through mutation, crossover, and selection to optimize typing speed and comfort.",
    technologies: "Python, Genetic Algorithms, NumPy",
    githubLink: "https://github.com/matheogonnet/best-keyboard-layout",
    icon: "⌨️"
  },
  {
    name: "Smart File Search",
    description: "A desktop application that allows users to search and preview files quickly. The tool supports filtering by file types and offers previews for images, texts, PDFs, code files, and videos, making file management more efficient.",
    technologies: "Python, Custom Tkinter, OS Libraries",
    githubLink: "https://github.com/matheogonnet/smart-file-search",
    icon: "🔍"
  },
  {
    name: "Cluedo Board Game",
    description: "A digital adaptation of the classic Cluedo board game. This project focuses on implementing game logic, player interactions, and a graphical interface to provide an engaging mystery-solving experience.",
    technologies: "C++, SFML (Simple and Fast Multimedia Library)",
    githubLink: "https://github.com/matheogonnet/cluedo-board-game",
    icon: "🎲"
  },
  {
    name: "Buzzbox Instant Messaging",
    description: "A Java-based instant messaging application that supports real-time chat between users. This project features user authentication, message encryption, and a responsive client-server architecture.",
    technologies: "Java, MySQL, JDBC",
    githubLink: "https://github.com/matheogonnet/buzzbox-instant-messaging",
    icon: "💬"
  },
  {
    name: "Ferrarinews Blogging App",
    description: "A blogging application where users can create, publish, and manage blog articles. The app includes features for commenting, liking posts, and user authentication to enhance interaction and content management.",
    technologies: "JavaScript, Next.js, Tailwind CSS, Supabase",
    githubLink: "https://github.com/matheogonnet/ferrarinews-blogging-app",
    icon: "📝"
  },
  {
    name: "The Safe Place",
    description: "A web application developed as a group project, focusing on providing a secure platform for specific user needs. Details are limited, but the project showcases collaborative development and secure web practices.",
    technologies: "PHP, MySQL",
    githubLink: "https://github.com/matheogonnet/the-safe-place",
    icon: "🛡️"
  }
]

export default function Projects() {
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
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center font-['Manifesto'] text-4xl font-bold text-cupertino-50 md:text-5xl"
        >
          My Projects
        </motion.h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <div className="glass-card h-full overflow-hidden p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{project.icon}</span>
                    <h2 className="text-xl font-bold text-cupertino-50">
                      {project.name}
                    </h2>
                  </div>
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-cupertino-500/40 p-2 transition-colors hover:bg-cupertino-500/60"
                  >
                    <BsGithub className="h-5 w-5 text-cupertino-200" />
                  </Link>
                </div>
                
                <p className="mb-4 text-cupertino-200">
                  {project.description}
                </p>

                <div className="mt-auto">
                  <h3 className="mb-2 font-semibold text-accent-purple">
                    Technologies
                  </h3>
                  <p className="text-sm text-cupertino-300">
                    {project.technologies}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
} 