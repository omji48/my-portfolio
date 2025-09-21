import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// import { useScrollController } from '../lib/scrollController'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [currentChapter, setCurrentChapter] = useState(0)
  // const { currentChapter, scrollToChapter } = useScrollController()

  const chapters = [
    { id: 0, name: 'Home', icon: '🏠', label: '[HOME]' },
    { id: 1, name: 'About', icon: '👤', label: '[ABOUT]' },
    { id: 2, name: 'Skills', icon: '⚡', label: '[SKILLS]' },
    { id: 3, name: 'Exploits', icon: '⚔️', label: '[EXPLOITS]' },
    { id: 4, name: 'Methodology', icon: '🔧', label: '[METHOD]' },
    { id: 5, name: 'Contact', icon: '📞', label: '[CONTACT]' }
  ]

  // Hide nav on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleChapterClick = (chapterId) => {
    const targets = ['#hero', '#about', '#skills', '#work', '#process', '#contact']
    const targetElement = document.querySelector(targets[chapterId])
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
      setCurrentChapter(chapterId)
    }
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 p-6"
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const el = document.querySelector('#hero')
            el?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="text-green-400 text-lg font-mono cursor-pointer font-bold"
        >
          <span className="text-red-500">[</span>OM VIVEK MEHTA<span className="text-red-500">]</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {chapters.map((chapter) => (
            <motion.button
              key={chapter.id}
              onClick={() => handleChapterClick(chapter.id)}
              className={`text-sm font-mono transition-colors duration-300 ${
                currentChapter === chapter.id
                  ? 'text-green-400'
                  : 'text-gray-400 hover:text-green-300'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {chapter.label}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-green-400 text-2xl font-mono"
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? '[X]' : '[☰]'}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 bg-black/80 border border-green-400/30 backdrop-blur-sm rounded-lg overflow-hidden"
          >
            {chapters.map((chapter) => (
              <motion.button
                key={chapter.id}
                onClick={() => handleChapterClick(chapter.id)}
                className={`w-full text-left px-6 py-3 text-sm font-mono transition-colors duration-300 ${
                  currentChapter === chapter.id
                    ? 'text-green-400 bg-green-400/10 border-l-2 border-green-400'
                    : 'text-gray-400 hover:text-green-300 hover:bg-green-400/5'
                }`}
                whileHover={{ x: 10 }}
              >
                {chapter.icon} {chapter.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapter Indicator */}
      <div className="hidden md:block absolute right-6 top-1/2 transform -translate-y-1/2">
        <div className="flex flex-col space-y-2">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                currentChapter === chapter.id
                  ? 'bg-green-400'
                  : 'bg-gray-600'
              }`}
              whileHover={{ scale: 1.5 }}
            />
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

export default Nav
