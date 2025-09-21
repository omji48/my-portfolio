import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const MotionToggle = ({ onToggle, initialReduced = false }) => {
  const [isReducedMotion, setIsReducedMotion] = useState(initialReduced)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check user's motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setIsReducedMotion(prefersReduced)
    
    // Show toggle after 5 seconds
    const timer = setTimeout(() => setIsVisible(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleToggle = () => {
    const newReduced = !isReducedMotion
    setIsReducedMotion(newReduced)
    onToggle?.(newReduced)
    
    // Apply reduced motion class to document
    if (newReduced) {
      document.documentElement.classList.add('reduced-motion')
    } else {
      document.documentElement.classList.remove('reduced-motion')
    }
  }

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="fixed bottom-6 right-24 z-50"
    >
      <motion.button
        onClick={handleToggle}
        className="glass-card p-4 rounded-lg flex items-center space-x-3 hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={isReducedMotion ? 'Enable Animations' : 'Reduce Motion'}
      >
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full transition-colors ${
            isReducedMotion ? 'bg-blue-400' : 'bg-purple-400'
          }`} />
          <span className="text-sm font-mono text-white">
            {isReducedMotion ? 'Static' : 'Motion'}
          </span>
        </div>
        
        <motion.div
          animate={{ 
            scale: isReducedMotion ? 0.8 : 1,
            opacity: isReducedMotion ? 0.5 : 1
          }}
          transition={{ duration: 0.3 }}
          className="text-white/60"
        >
          🎬
        </motion.div>
      </motion.button>
    </motion.div>
  )
}

export default MotionToggle
