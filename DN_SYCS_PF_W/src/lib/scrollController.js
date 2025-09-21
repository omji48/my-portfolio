import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'

// Scroll controller for 4-chapter navigation
export const useScrollController = () => {
  const scrollRef = useRef(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [currentChapter, setCurrentChapter] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / documentHeight, 1)
      
      scrollRef.current = progress
      setScrollProgress(progress)
      setIsScrolling(true)

      // Determine current chapter
      if (progress <= 0.25) setCurrentChapter(0)
      else if (progress <= 0.55) setCurrentChapter(1)
      else if (progress <= 0.85) setCurrentChapter(2)
      else setCurrentChapter(3)

      // Clear scrolling flag after a delay
      setTimeout(() => setIsScrolling(false), 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll to chapter
  const scrollToChapter = (chapterIndex) => {
    const chapterPositions = [0, 0.25, 0.55, 0.85]
    const targetProgress = chapterPositions[chapterIndex] || 0
    
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight
    const targetScrollTop = targetProgress * documentHeight
    
    window.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    })
  }

  // Get chapter progress within current chapter
  const getChapterProgress = () => {
    if (scrollProgress <= 0.25) return scrollProgress / 0.25
    if (scrollProgress <= 0.55) return (scrollProgress - 0.25) / 0.3
    if (scrollProgress <= 0.85) return (scrollProgress - 0.55) / 0.3
    return (scrollProgress - 0.85) / 0.15
  }

  return {
    scrollProgress,
    currentChapter,
    isScrolling,
    scrollToChapter,
    getChapterProgress
  }
}

// Parallax controller for layered depth
export const useParallaxController = (scrollProgress) => {
  const parallaxRefs = useRef({})

  const registerParallax = (id, speed = 1) => {
    parallaxRefs.current[id] = { speed, offset: 0 }
  }

  const updateParallax = (id, offset) => {
    if (parallaxRefs.current[id]) {
      parallaxRefs.current[id].offset = offset * parallaxRefs.current[id].speed
    }
  }

  useFrame(() => {
    Object.keys(parallaxRefs.current).forEach(id => {
      const { speed } = parallaxRefs.current[id]
      const offset = scrollProgress * speed
      updateParallax(id, offset)
    })
  })

  return {
    registerParallax,
    updateParallax,
    getParallaxOffset: (id) => parallaxRefs.current[id]?.offset || 0
  }
}

// Scroll-triggered animations
export const useScrollAnimations = (scrollProgress) => {
  const [animations, setAnimations] = useState({})

  const triggerAnimation = (id, triggerPoint, duration = 0.1) => {
    const isActive = scrollProgress >= triggerPoint && scrollProgress <= triggerPoint + duration
    setAnimations(prev => ({ ...prev, [id]: isActive }))
  }

  const getAnimationProgress = (id, triggerPoint, duration = 0.1) => {
    if (scrollProgress < triggerPoint) return 0
    if (scrollProgress > triggerPoint + duration) return 1
    return (scrollProgress - triggerPoint) / duration
  }

  return {
    animations,
    triggerAnimation,
    getAnimationProgress
  }
}

// Performance-optimized scroll handler
export const useOptimizedScroll = () => {
  const [scrollData, setScrollData] = useState({
    progress: 0,
    velocity: 0,
    direction: 1
  })

  const lastScrollTime = useRef(0)
  const lastScrollTop = useRef(0)

  useEffect(() => {
    let ticking = false

    const updateScrollData = () => {
      const now = Date.now()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / documentHeight, 1)
      
      const velocity = now - lastScrollTime.current > 0 
        ? (scrollTop - lastScrollTop.current) / (now - lastScrollTime.current)
        : 0
      
      const direction = velocity > 0 ? 1 : velocity < 0 ? -1 : scrollData.direction

      setScrollData({
        progress,
        velocity: Math.abs(velocity),
        direction
      })

      lastScrollTime.current = now
      lastScrollTop.current = scrollTop
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollData)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollData.direction])

  return scrollData
}
