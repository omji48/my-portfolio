import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Environment, 
  PerspectiveCamera,
  Html
} from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassMaterial } from '../lib/utils/shaderMaterials'
import { useScrollController } from '../lib/scrollController'
import { useCameraRig } from '../lib/cameraRig'

// Work Card Component
const WorkCard = ({ 
  position, 
  rotation, 
  project, 
  index, 
  onHover, 
  onLeave,
  isHovered 
}) => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.1
      
      // Hover lift effect
      if (hovered || isHovered) {
        meshRef.current.position.z = position[2] + 0.5
        meshRef.current.rotation.x = rotation[0] + 0.1
      } else {
        meshRef.current.position.z = position[2]
        meshRef.current.rotation.x = rotation[0]
      }
    }
  })

  const handlePointerEnter = () => {
    setHovered(true)
    onHover?.(index)
  }

  const handlePointerLeave = () => {
    setHovered(false)
    onLeave?.()
  }

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* Card Geometry */}
      <mesh>
        <planeGeometry args={[3, 4]} />
        <GlassMaterial 
          uOpacity={hovered || isHovered ? 0.9 : 0.6}
          uRimColor={[0.0, 0.8, 1.0]}
        />
      </mesh>
      
      {/* Project Title - Using HTML overlay instead of 3D text */}
      <Html position={[0, 0.5, 0.01]} center>
        <div className="text-center">
          <div className="text-white text-lg font-bold">{project.title}</div>
          <div className="text-gray-400 text-sm">{project.category}</div>
        </div>
      </Html>
    </group>
  )
}

// Work Grid Component
const WorkGrid = ({ projects, onCardHover, onCardLeave, hoveredCard }) => {
  const { scrollProgress } = useScrollController()
  
  // Calculate card positions in an arc
  const cardPositions = useMemo(() => {
    return projects.map((_, index) => {
      const angle = (index / (projects.length - 1)) * Math.PI - Math.PI / 2
      const radius = 8
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = Math.sin(index * 0.5) * 0.5
      
      return {
        position: [x, y, z],
        rotation: [0, angle + Math.PI / 2, 0]
      }
    })
  }, [projects.length])

  // Animate cards in based on scroll progress
  const cardVisibility = useMemo(() => {
    const workStart = 0.25
    const workEnd = 0.55
    const workProgress = Math.max(0, Math.min(1, (scrollProgress - workStart) / (workEnd - workStart)))
    
    return projects.map((_, index) => {
      const delay = index * 0.1
      return Math.max(0, Math.min(1, (workProgress - delay) * 2))
    })
  }, [scrollProgress, projects.length])

  return (
    <>
      {projects.map((project, index) => {
        const { position, rotation } = cardPositions[index]
        const visibility = cardVisibility[index]
        
        if (visibility === 0) return null
        
        return (
          <WorkCard
            key={project.id}
            position={position}
            rotation={rotation}
            project={project}
            index={index}
            onHover={onCardHover}
            onLeave={onCardLeave}
            isHovered={hoveredCard === index}
          />
        )
      })}
    </>
  )
}

// Camera Controller for Work Section
const WorkCamera = () => {
  const { cameraRef } = useCameraRig(useScrollController().scrollProgress)
  
  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 2, 8]}
      fov={60}
    />
  )
}

// Main Work Grid 3D Component
const WorkGrid3D = () => {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: 'Synthesis',
      category: 'Data Visualization',
      description: 'Interactive data visualization platform with real-time analytics and immersive 3D charts.',
      thumbnail: '/assets/synthesis-thumb.jpg',
      technologies: ['React', 'Three.js', 'D3.js', 'WebGL']
    },
    {
      id: 2,
      title: 'Echo',
      category: 'Audio Processing',
      description: 'Real-time audio processing system with spatial audio and interactive sound design.',
      thumbnail: '/assets/echo-thumb.jpg',
      technologies: ['Web Audio API', 'WebGL', 'Node.js', 'WebRTC']
    },
    {
      id: 3,
      title: 'Orbit',
      category: 'Space Interface',
      description: '3D space exploration interface with procedural generation and physics simulation.',
      thumbnail: '/assets/orbit-thumb.jpg',
      technologies: ['Three.js', 'Cannon.js', 'GLSL', 'WebAssembly']
    }
  ]

  const handleCardHover = (index) => {
    setHoveredCard(index)
  }

  const handleCardLeave = () => {
    setHoveredCard(null)
  }

  const handleCardClick = (project) => {
    setSelectedProject(project)
  }

  return (
    <div className="relative w-full h-screen">
      {/* 3D Canvas */}
      <Canvas
        className="w-full h-full"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Environment preset="studio" />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />
        
        <WorkCamera />
        <WorkGrid 
          projects={projects}
          onCardHover={handleCardHover}
          onCardLeave={handleCardLeave}
          hoveredCard={hoveredCard}
        />
      </Canvas>

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-20 left-10 z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
          Work
        </h2>
        <p className="text-white/60 font-mono text-lg">
          Interactive 3D Projects
        </p>
      </motion.div>

      {/* Project Details Overlay */}
      <AnimatePresence>
        {hoveredCard !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 left-10 right-10 z-10"
          >
            <div className="glass-card p-6 rounded-lg max-w-md">
              <h3 className="text-2xl font-bold text-accent mb-2">
                {projects[hoveredCard]?.title}
              </h3>
              <p className="text-white/80 mb-4">
                {projects[hoveredCard]?.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {projects[hoveredCard]?.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-card p-8 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold text-accent">
                  {selectedProject.title}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-white/60 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <p className="text-white/80 mb-6 text-lg">
                {selectedProject.description}
              </p>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-white/10 rounded-full text-sm font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-accent text-black font-semibold rounded-lg hover:bg-accent/80 transition-colors">
                  View Project
                </button>
                <button className="px-6 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors">
                  View Code
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default WorkGrid3D
