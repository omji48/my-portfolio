import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// import { useScrollController } from '../lib/scrollController'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [currentChapter, setCurrentChapter] = useState(0)
  // const { currentChapter, scrollToChapter } = useScrollController()

  const chapters = [
    { id: 0, name: 'Home', icon: '🏠', label: '[HOME]', target: '#hero' },
    { id: 1, name: 'About', icon: '👤', label: '[ABOUT]', target: '#about' },
    { id: 2, name: 'Experience', icon: '💼', label: '[EXPERIENCE]', target: '#experience' },
    { id: 3, name: 'Projects', icon: '📂', label: '[PROJECTS]', target: '#projects' },
    { id: 4, name: 'Skills', icon: '⚡', label: '[SKILLS]', target: '#skills' },
    { id: 5, name: 'Methodology', icon: '🔧', label: '[METHOD]', target: '#process' },
    { id: 6, name: 'Contact', icon: '📞', label: '[CONTACT]', target: '#contact' }
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
    const targetSelector = chapters[chapterId]?.target
    const targetElement = document.querySelector(targetSelector)
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
        <div className="hidden lg:flex items-center space-x-6">
          {chapters.map((chapter) => (
            <motion.button
              key={chapter.id}
              onClick={() => handleChapterClick(chapter.id)}
              className={`text-xs font-mono transition-colors duration-300 ${
                currentChapter === chapter.id
                  ? 'text-green-400 font-bold'
                  : 'text-gray-400 hover:text-green-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {chapter.label}
            </motion.button>
          ))}

          {/* Resume CTA Button */}
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-400/60 rounded font-mono text-xs font-bold transition-all duration-200 flex items-center gap-1 shadow-[0_0_10px_rgba(0,255,65,0.2)]"
          >
            <span>📄</span> [RESUME]
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-green-400 text-2xl font-mono"
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
            className="lg:hidden mt-4 bg-black/90 border border-green-400/30 backdrop-blur-md rounded-lg overflow-hidden p-2 space-y-1"
          >
            {chapters.map((chapter) => (
              <motion.button
                key={chapter.id}
                onClick={() => handleChapterClick(chapter.id)}
                className={`w-full text-left px-4 py-2.5 text-xs font-mono rounded transition-colors duration-300 ${
                  currentChapter === chapter.id
                    ? 'text-green-400 bg-green-400/10 border-l-2 border-green-400'
                    : 'text-gray-400 hover:text-green-300 hover:bg-green-400/5'
                }`}
                whileHover={{ x: 6 }}
              >
                {chapter.icon} {chapter.label}
              </motion.button>
            ))}

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-left px-4 py-2.5 text-xs font-mono rounded text-green-400 bg-green-500/20 border border-green-400/40 hover:bg-green-500/30 transition-colors flex items-center gap-2 mt-2"
            >
              <span>📄</span> [DOWNLOAD_RESUME]
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapter Indicator */}
      <div className="hidden lg:block absolute right-6 top-1/2 transform -translate-y-1/2">
        <div className="flex flex-col space-y-2">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              onClick={() => handleChapterClick(chapter.id)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-colors duration-300 ${
                currentChapter === chapter.id
                  ? 'bg-green-400 scale-125'
                  : 'bg-gray-600 hover:bg-gray-400'
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
