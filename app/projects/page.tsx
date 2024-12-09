'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { 
  BsGithub, 
  BsFilter, 
  BsSearch,
  BsX,
  BsCheck2,
  BsTrash,
  BsChevronDown
} from 'react-icons/bs'

interface Project {
  name: string
  description: string
  technologies: string
  githubLink: string | null
  icon: string
  category: string
  year: string
}

interface Filters {
  categories: string[]
  technologies: string[]
  years: string[]
}

const projects: Project[] = [
  {
    name: "Velocity Bike",
    description: "A comprehensive Power BI report for Velocity Bike, a chain of bike shops. The report includes insights on sales performance, product performance, customer insights, and inventory management, built using various visualizations and data preprocessing techniques.",
    technologies: "Power BI, Power Query",
    githubLink: null,
    icon: "🚴‍♂️",
    category: "Data Visualization",
    year: "2024"
  },
  {
    name: "Multi-Modal Classification",
    description: "A deep learning project designed to classify data using both image and text inputs. The project involves training a CNN for image classification, an RNN for text analysis, and combining these models into a multi-modal pipeline to improve accuracy.",
    technologies: "Python, TensorFlow, Keras, CNN, RNN, LSTM",
    githubLink: "https://github.com/matheogonnet/multi_modal_project",
    icon: "🧠",
    category: "Deep Learning",
    year: "2024"
  },
  {
    name: "Predict House",
    description: "A machine learning project designed to predict real estate prices based on various property features. This project involves data preprocessing, feature engineering, and applying regression models to provide accurate price predictions.",
    technologies: "Python, Scikit-Learn, Pandas, Matplotlib",
    githubLink: "https://github.com/matheogonnet/predict-house",
    icon: "🏠",
    category: "Machine Learning",
    year: "2024"
  },
  {
    name: "Best Keyboard Layout",
    description: "This project uses a genetic algorithm to determine the most efficient keyboard layout that minimizes typing effort. By analyzing a given text corpus, it evolves layouts through mutation, crossover, and selection to optimize typing speed and comfort.",
    technologies: "Python, Genetic Algorithms, NumPy",
    githubLink: "https://github.com/matheogonnet/best-keyboard-layout",
    icon: "⌨️",
    category: "Machine Learning",
    year: "2022"
  },
  {
    name: "Smart File Search",
    description: "A desktop application that allows users to search and preview files quickly. The tool supports filtering by file types and offers previews for images, texts, PDFs, code files, and videos, making file management more efficient.",
    technologies: "Python, Custom Tkinter, OS Libraries",
    githubLink: "https://github.com/matheogonnet/smart-file-search",
    icon: "🔍",
    category: "Desktop App",
    year: "2023"
  },
  {
    name: "Cluedo Board Game",
    description: "A digital adaptation of the classic Cluedo board game. This project focuses on implementing game logic, player interactions, and a graphical interface to provide an engaging mystery-solving experience.",
    technologies: "C++, SFML (Simple and Fast Multimedia Library)",
    githubLink: "https://github.com/matheogonnet/cluedo-board-game",
    icon: "🎲",
    category: "Game",
    year: "2021"
  },
  {
    name: "Buzzbox Instant Messaging",
    description: "A Java-based instant messaging application that supports real-time chat between users. This project features user authentication, message encryption, and a responsive client-server architecture.",
    technologies: "Java, MySQL, JDBC",
    githubLink: "https://github.com/matheogonnet/buzzbox-instant-messaging",
    icon: "💬",
    category: "Web App",
    year: "2022"
  },
  {
    name: "Ferrarinews Blogging App",
    description: "A blogging application where users can create, publish, and manage blog articles. The app includes features for commenting, liking posts, and user authentication to enhance interaction and content management.",
    technologies: "JavaScript, Next.js, Tailwind CSS, Supabase",
    githubLink: "https://github.com/matheogonnet/ferrarinews-blogging-app",
    icon: "🏎️",
    category: "Web App",
    year: "2023"
  },
  {
    name: "The Safe Place",
    description: "A web application developed as a group project, focusing on providing a secure platform for specific user needs. Details are limited, but the project showcases collaborative development and secure web practices.",
    technologies: "PHP, MySQL",
    githubLink: "https://github.com/matheogonnet/the-safe-place",
    icon: "🛡️",
    category: "Web App",
    year: "2024"
  }
]

const techCategories = {
  'Languages': ['Python', 'Java', 'JavaScript', 'PHP', 'C++'],
  'Frameworks/Libraries': ['TensorFlow', 'Keras', 'Scikit-Learn', 'NumPy', 'Tailwind CSS', 'Next.js', 'SFML', 'Custom Tkinter'],
  'Databases': ['MySQL', 'JDBC', 'Supabase'],
  'ML/DL': ['CNN', 'RNN', 'LSTM', 'Genetic Algorithms'],
  'Analysis/Visualization': ['Power BI', 'Power Query', 'Matplotlib', 'Pandas'],
  'Other': ['OS Libraries']
}

const FilterPopup = ({ 
  isOpen, 
  onClose,
  filters,
  setFilters,
  searchTerm,
  setSearchTerm
}: { 
  isOpen: boolean
  onClose: () => void
  filters: Filters
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
}) => {
  const [expandedTechCategory, setExpandedTechCategory] = useState<string | null>(null)
  const [showMoreFilters, setShowMoreFilters] = useState(false)
  const allCategories = Array.from(new Set(projects.map(p => p.category)))
  const allTechnologies = Array.from(new Set(projects.flatMap(p => p.technologies.split(', '))))
  const allYears = Array.from(new Set(projects.map(p => p.year)))
    .sort((a, b) => parseInt(b) - parseInt(a))

  const toggleFilter = (type: keyof Filters, value: string) => {
    setFilters((prev: Filters) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item: string) => item !== value)
        : [...prev[type], value]
    }))
  }

  const resetFilters = () => {
    setFilters({
      categories: [],
      technologies: [],
      years: []
    })
    setSearchTerm('')
    setShowMoreFilters(false)
    onClose()
  }

  const hasActiveFilters = filters.categories.length > 0 || 
                          filters.technologies.length > 0 ||
                          filters.years.length > 0 ||
                          searchTerm.length > 0

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed md:absolute left-4 right-4 md:left-auto md:right-4 top-20 md:top-12 z-50 md:w-[320px] mx-auto overflow-hidden rounded-xl bg-gradient-to-br from-cupertino-500/95 to-cupertino-600/95 backdrop-blur-xl shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-blue-500/5" />
            
            <div className="relative p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BsFilter className="h-5 w-5 text-accent-blue" />
                  <h3 className="text-lg font-semibold text-cupertino-50">Filters</h3>
                </div>
                <div className="flex items-center space-x-2">
                  {hasActiveFilters && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={resetFilters}
                      className="flex items-center space-x-1 rounded-full bg-accent-blue/10 px-3 py-1 text-xs text-accent-blue hover:bg-accent-blue/20"
                    >
                      <BsTrash className="h-3 w-3" />
                      <span>Reset</span>
                    </motion.button>
                  )}
                  <button
                    onClick={onClose}
                    className="rounded-full bg-cupertino-400/20 p-1 text-cupertino-200 hover:bg-cupertino-400/30 hover:text-accent-blue"
                  >
                    <BsX className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg bg-cupertino-400/20 px-4 py-2 pl-10 text-sm text-cupertino-50 placeholder-cupertino-300 ring-1 ring-accent-blue/10 transition-all focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                  />
                  <BsSearch className="absolute left-3 top-2.5 h-4 w-4 text-accent-blue" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 flex items-center space-x-2 text-sm font-medium text-accent-blue">
                    <span>Category</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-accent-blue/20 to-transparent" />
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {allCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => toggleFilter('categories', category)}
                        className={`rounded-full px-3 py-1 text-xs transition-all ${
                          filters.categories.includes(category)
                            ? 'bg-gradient-to-r from-accent-blue to-blue-500 text-white shadow-lg shadow-accent-blue/20'
                            : 'bg-cupertino-400/20 text-cupertino-200 hover:bg-accent-blue/10 hover:text-accent-blue'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  onClick={() => setShowMoreFilters(!showMoreFilters)}
                  className="flex w-full items-center justify-center space-x-2 rounded-lg bg-cupertino-400/20 p-2 text-sm text-cupertino-200 hover:bg-accent-blue/10 hover:text-accent-blue"
                >
                  <span>{showMoreFilters ? 'Show Less' : 'Show More Filters'}</span>
                  <motion.div
                    animate={{ rotate: showMoreFilters ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BsChevronDown className="h-4 w-4" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {showMoreFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <div>
                        <h4 className="mb-2 flex items-center space-x-2 text-sm font-medium text-accent-blue">
                          <span>Technology</span>
                          <div className="h-px flex-1 bg-gradient-to-r from-accent-blue/20 to-transparent" />
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(techCategories).map(([category, techs]) => (
                            <div key={category} className="overflow-hidden rounded-lg bg-gradient-to-br from-cupertino-400/10 to-cupertino-400/5">
                              <button
                                onClick={() => setExpandedTechCategory(
                                  expandedTechCategory === category ? null : category
                                )}
                                className="flex w-full items-center justify-between p-2 text-sm text-cupertino-100 transition-colors hover:text-accent-blue"
                              >
                                <span>{category}</span>
                                <motion.div
                                  animate={{ rotate: expandedTechCategory === category ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="text-accent-blue"
                                >
                                  <BsChevronDown className="h-4 w-4" />
                                </motion.div>
                              </button>
                              <AnimatePresence>
                                {expandedTechCategory === category && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="flex flex-wrap gap-2 p-2 pt-0">
                                      {techs.filter(tech => allTechnologies.includes(tech)).map((tech) => (
                                        <button
                                          key={tech}
                                          onClick={() => toggleFilter('technologies', tech)}
                                          className={`rounded-full px-3 py-1 text-xs transition-all ${
                                            filters.technologies.includes(tech)
                                              ? 'bg-gradient-to-r from-accent-blue to-blue-500 text-white shadow-lg shadow-accent-blue/20'
                                              : 'bg-cupertino-400/20 text-cupertino-200 hover:bg-accent-blue/10 hover:text-accent-blue'
                                          }`}
                                        >
                                          {tech}
                                        </button>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-2 flex items-center space-x-2 text-sm font-medium text-accent-blue">
                          <span>Year</span>
                          <div className="h-px flex-1 bg-gradient-to-r from-accent-blue/20 to-transparent" />
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {allYears.map((year) => (
                            <button
                              key={year}
                              onClick={() => toggleFilter('years', year)}
                              className={`rounded-full px-3 py-1 text-xs transition-all ${
                                filters.years.includes(year)
                                  ? 'bg-gradient-to-r from-accent-blue to-blue-500 text-white shadow-lg shadow-accent-blue/20'
                                  : 'bg-cupertino-400/20 text-cupertino-200 hover:bg-accent-blue/10 hover:text-accent-blue'
                              }`}
                            >
                              {year}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Projects() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    technologies: [],
    years: []
  })

  const filteredProjects = useMemo(() => {
    return projects
      .sort((a, b) => parseInt(b.year) - parseInt(a.year))
      .filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.technologies.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory = filters.categories.length === 0 || 
                              filters.categories.includes(project.category)

        const matchesTechnology = filters.technologies.length === 0 ||
                                filters.technologies.some(tech => 
                                  project.technologies.includes(tech))

        const matchesYear = filters.years.length === 0 ||
                           filters.years.includes(project.year)

        return matchesSearch && matchesCategory && matchesTechnology && matchesYear
      })
  }, [searchTerm, filters])

  const hasActiveFilters = searchTerm || 
                          filters.categories.length > 0 || 
                          filters.technologies.length > 0 ||
                          filters.years.length > 0

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
        <div className="mb-12 flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-cupertino-50 md:text-5xl"
          >
            My Projects
          </motion.h1>

          <div className="relative z-50">
            <motion.div
              className="absolute -inset-[2px] rounded-full bg-accent-blue/30 blur-sm hidden md:block"
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                hasActiveFilters ? 'bg-accent-blue text-white' : 'bg-cupertino-500/40 text-cupertino-200 hover:bg-cupertino-500/60'
              }`}
            >
              {hasActiveFilters ? <BsCheck2 className="h-5 w-5" /> : <BsFilter className="h-5 w-5" />}
            </motion.button>

            <FilterPopup
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              filters={filters}
              setFilters={setFilters}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                backgroundColor: "rgba(96, 165, 250, 0.1)"
              }}
              className="group relative rounded-xl"
            >
              <motion.div
                className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-accent-blue/30 to-blue-400/30 opacity-0 blur transition duration-300 group-hover:opacity-100"
                initial={false}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              
              <div className="glass-card relative h-full overflow-hidden p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{project.icon}</span>
                    <h2 className="text-xl font-bold text-cupertino-50">
                      {project.name}
                    </h2>
                  </div>
                  {project.githubLink && (
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-cupertino-500/40 p-2 transition-all hover:bg-cupertino-500/60 hover:scale-110"
                    >
                      <BsGithub className="h-5 w-5 text-cupertino-200" />
                    </Link>
                  )}
                </div>
                
                <p className="mb-4 text-cupertino-200">
                  {project.description}
                </p>

                <div className="mt-auto space-y-2">
                  <div>
                    <h3 className="mb-1 font-semibold text-accent-blue">
                      Category
                    </h3>
                    <p className="text-sm text-cupertino-300">
                      {project.category}
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-1 font-semibold text-accent-blue">
                      Technologies
                    </h3>
                    <p className="text-sm text-cupertino-300">
                      {project.technologies}
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-1 font-semibold text-accent-blue">
                      Year
                    </h3>
                    <p className="text-sm text-cupertino-300">
                      {project.year}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
} 