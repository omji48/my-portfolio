import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Camera positions for each chapter
const CHAPTER_POSITIONS = [
  // Hero chapter (0-0.25)
  {
    position: [0, 5, 15],
    target: [0, 0, 0],
    fov: 75,
    dof: { focus: 10, aperture: 0.1, maxblur: 0.01 }
  },
  // Work gallery (0.25-0.55)
  {
    position: [0, 2, 8],
    target: [0, 0, 0],
    fov: 60,
    dof: { focus: 8, aperture: 0.05, maxblur: 0.02 }
  },
  // Case study (0.55-0.85)
  {
    position: [0, 1, 6],
    target: [0, 0, 0],
    fov: 50,
    dof: { focus: 6, aperture: 0.02, maxblur: 0.03 }
  },
  // Contact (0.85-1.0)
  {
    position: [0, 0, 4],
    target: [0, 0, 0],
    fov: 45,
    dof: { focus: 4, aperture: 0.01, maxblur: 0.04 }
  }
]

// Smooth interpolation between camera positions
const lerp = (a, b, t) => {
  return a + (b - a) * t
}

// Easing function for smooth camera movement
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export const useCameraRig = (scrollProgress) => {
  const cameraRef = useRef()
  const targetRef = useRef(new THREE.Vector3())

  const currentChapter = useMemo(() => {
    if (scrollProgress <= 0.25) return 0
    if (scrollProgress <= 0.55) return 1
    if (scrollProgress <= 0.85) return 2
    return 3
  }, [scrollProgress])

  const chapterProgress = useMemo(() => {
    if (scrollProgress <= 0.25) return scrollProgress / 0.25
    if (scrollProgress <= 0.55) return (scrollProgress - 0.25) / 0.3
    if (scrollProgress <= 0.85) return (scrollProgress - 0.55) / 0.3
    return (scrollProgress - 0.85) / 0.15
  }, [scrollProgress])

  useFrame(() => {
    if (!cameraRef.current) return

    const camera = cameraRef.current
    const current = CHAPTER_POSITIONS[currentChapter]
    const next = CHAPTER_POSITIONS[Math.min(currentChapter + 1, CHAPTER_POSITIONS.length - 1)]
    
    const easedProgress = easeInOutCubic(chapterProgress)
    
    // Interpolate position
    const pos = current.position.map((val, i) => 
      lerp(val, next.position[i], easedProgress)
    )
    
    // Interpolate target
    const target = current.target.map((val, i) => 
      lerp(val, next.target[i], easedProgress)
    )
    
    // Interpolate FOV
    const fov = lerp(current.fov, next.fov, easedProgress)
    
    // Apply camera changes
    camera.position.set(...pos)
    targetRef.current.set(...target)
    camera.lookAt(targetRef.current)
    camera.fov = fov
    camera.updateProjectionMatrix()
  })

  return {
    cameraRef,
    targetRef,
    currentChapter,
    chapterProgress,
    dofSettings: CHAPTER_POSITIONS[currentChapter].dof
  }
}

// Camera controller for manual navigation
export const useCameraController = () => {
  const cameraRef = useRef()
  const isDragging = useRef(false)
  const previousMousePosition = useRef({ x: 0, y: 0 })

  const onMouseDown = (event) => {
    isDragging.current = true
    previousMousePosition.current = { x: event.clientX, y: event.clientY }
  }

  const onMouseMove = (event) => {
    if (!isDragging.current || !cameraRef.current) return

    const deltaX = event.clientX - previousMousePosition.current.x
    const deltaY = event.clientY - previousMousePosition.current.y

    // Rotate camera around target
    const camera = cameraRef.current
    const target = new THREE.Vector3(0, 0, 0)
    
    // Horizontal rotation
    const horizontalAngle = deltaX * 0.01
    const verticalAngle = deltaY * 0.01

    // Apply rotation
    camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), horizontalAngle)
    camera.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), verticalAngle)
    
    camera.lookAt(target)

    previousMousePosition.current = { x: event.clientX, y: event.clientY }
  }

  const onMouseUp = () => {
    isDragging.current = false
  }

  return {
    cameraRef,
    onMouseDown,
    onMouseMove,
    onMouseUp
  }
}
