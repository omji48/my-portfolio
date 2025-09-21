import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const PerfToggle = ({ onToggle, initialMode = false }) => {
  const [isPerformanceMode, setIsPerformanceMode] = useState(initialMode)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show toggle after 3 seconds
    const timer = setTimeout(() => setIsVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleToggle = () => {
    const newMode = !isPerformanceMode
    setIsPerformanceMode(newMode)
    onToggle?.(newMode)
  }

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.button
        onClick={handleToggle}
        className="glass-card p-4 rounded-lg flex items-center space-x-3 hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={isPerformanceMode ? 'Switch to Quality Mode' : 'Switch to Performance Mode'}
      >
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full transition-colors ${
            isPerformanceMode ? 'bg-yellow-400' : 'bg-green-400'
          }`} />
          <span className="text-sm font-mono text-white">
            {isPerformanceMode ? 'Perf' : 'Quality'}
          </span>
        </div>
        
        <motion.div
          animate={{ rotate: isPerformanceMode ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white/60"
        >
          ⚡
        </motion.div>
      </motion.button>
    </motion.div>
  )
}

export default PerfToggle
