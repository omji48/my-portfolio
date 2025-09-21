import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Environment, 
  PerspectiveCamera,
  Html
} from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollController } from '../lib/scrollController'
import { useCameraRig } from '../lib/cameraRig'

// Timeline Node Component
const TimelineNode = ({ 
  position, 
  index, 
  isActive, 
  isVisible,
  onHover,
  onLeave,
  data 
}) => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current && isVisible) {
      // Pulsing animation for active node
      if (isActive) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
        meshRef.current.scale.setScalar(scale)
      } else {
        meshRef.current.scale.lerp({ x: 1, y: 1, z: 1 }, 0.1)
      }
      
      // Hover effect
      if (hovered) {
        meshRef.current.position.y = position[1] + 0.2
      } else {
        meshRef.current.position.y = position[1]
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

  if (!isVisible) return null

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* Node Sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color={isActive ? "#00d4ff" : hovered ? "#ffffff" : "#666666"}
          emissive={isActive ? "#00d4ff" : "#000000"}
          emissiveIntensity={isActive ? 0.3 : 0}
        />
      </mesh>
      
      {/* Node Label - Using HTML overlay */}
      <Html position={[0, -0.8, 0]} center>
        <div className="text-white text-sm font-bold">{data.title}</div>
      </Html>
    </group>
  )
}

// Product Mock Component
const ProductMock = ({ position, isActive, onInteraction }) => {
  const meshRef = useRef()
  const [rotation, setRotation] = useState(0)
  const [textureIndex, setTextureIndex] = useState(0)

  // Use geometric shapes instead of loading GLB

  useFrame((state) => {
    if (meshRef.current) {
      // Idle rotation
      meshRef.current.rotation.y += 0.01
      
      // Active state animation
      if (isActive) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1
      }
    }
  })

  const handleClick = () => {
    setTextureIndex((prev) => (prev + 1) % 3)
    onInteraction?.(textureIndex)
  }

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={handleClick}
    >
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color={textureIndex === 0 ? "#ff6b6b" : textureIndex === 1 ? "#4ecdc4" : "#45b7d1"}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

// Timeline Component
const Timeline = ({ 
  nodes, 
  activeNode, 
  onNodeHover, 
  onNodeLeave,
  scrollProgress 
}) => {
  const { cameraRef } = useThree()
  
  // Calculate node positions along a horizontal line
  const nodePositions = useMemo(() => {
    return nodes.map((_, index) => {
      const x = (index - (nodes.length - 1) / 2) * 4
      return [x, 0, 0]
    })
  }, [nodes.length])

  // Camera movement based on active node
  useFrame(() => {
    if (cameraRef.current && activeNode !== null) {
      const targetX = nodePositions[activeNode][0]
      const currentX = cameraRef.current.position.x
      cameraRef.current.position.x += (targetX - currentX) * 0.05
      cameraRef.current.lookAt(targetX, 0, 0)
    }
  })

  return (
    <>
      {nodes.map((node, index) => {
        const isActive = activeNode === index
        const isVisible = scrollProgress >= 0.55 + (index * 0.1)
        
        return (
          <TimelineNode
            key={index}
            position={nodePositions[index]}
            index={index}
            isActive={isActive}
            isVisible={isVisible}
            onHover={onNodeHover}
            onLeave={onNodeLeave}
            data={node}
          />
        )
      })}
      
      {/* Connection Lines */}
      {nodePositions.map((pos, index) => {
        if (index === nodePositions.length - 1) return null
        
        const nextPos = nodePositions[index + 1]
        const midX = (pos[0] + nextPos[0]) / 2
        const midY = (pos[1] + nextPos[1]) / 2
        const length = Math.abs(nextPos[0] - pos[0])
        
        return (
          <mesh key={`line-${index}`} position={[midX, midY, 0]}>
            <boxGeometry args={[length, 0.02, 0.02]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
        )
      })}
    </>
  )
}

// Camera Controller for Case Study
const CaseStudyCamera = () => {
  const { cameraRef } = useCameraRig(useScrollController().scrollProgress)
  
  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 1, 6]}
      fov={50}
    />
  )
}

// Main Case Study Component
const CaseStudy = () => {
  const [activeNode, setActiveNode] = useState(null)
  const [hoveredNode, setHoveredNode] = useState(null)
  const [productInteraction, setProductInteraction] = useState(0)
  const { scrollProgress } = useScrollController()

  const timelineData = [
    {
      title: 'Research',
      description: 'User research and market analysis to understand the problem space and identify opportunities.',
      duration: '2 weeks',
      deliverables: ['User personas', 'Competitive analysis', 'Problem statement']
    },
    {
      title: 'Design',
      description: 'Creating wireframes, prototypes, and visual designs based on research insights.',
      duration: '3 weeks',
      deliverables: ['Wireframes', 'High-fidelity designs', 'Interactive prototype']
    },
    {
      title: 'Development',
      description: 'Building the product using modern web technologies and best practices.',
      duration: '6 weeks',
      deliverables: ['Frontend application', 'Backend API', 'Database design']
    },
    {
      title: 'Testing',
      description: 'Quality assurance, user testing, and performance optimization.',
      duration: '2 weeks',
      deliverables: ['Test reports', 'Performance metrics', 'User feedback']
    },
    {
      title: 'Launch',
      description: 'Deployment, monitoring, and iterative improvements based on user feedback.',
      duration: 'Ongoing',
      deliverables: ['Live product', 'Analytics dashboard', 'Support system']
    }
  ]

  const handleNodeHover = (index) => {
    setHoveredNode(index)
  }

  const handleNodeLeave = () => {
    setHoveredNode(null)
  }

  const handleProductInteraction = (textureIndex) => {
    setProductInteraction(textureIndex)
  }

  // Auto-advance timeline based on scroll
  useMemo(() => {
    const caseStudyStart = 0.55
    const caseStudyEnd = 0.85
    const caseStudyProgress = Math.max(0, Math.min(1, (scrollProgress - caseStudyStart) / (caseStudyEnd - caseStudyStart)))
    
    const nodeIndex = Math.floor(caseStudyProgress * timelineData.length)
    setActiveNode(Math.min(nodeIndex, timelineData.length - 1))
  }, [scrollProgress, timelineData.length])

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
        
        <CaseStudyCamera />
        <Timeline 
          nodes={timelineData}
          activeNode={activeNode}
          onNodeHover={handleNodeHover}
          onNodeLeave={handleNodeLeave}
          scrollProgress={scrollProgress}
        />
        
        {/* Product Mock */}
        <ProductMock 
          position={[0, 2, 2]}
          isActive={activeNode !== null}
          onInteraction={handleProductInteraction}
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
          Process
        </h2>
        <p className="text-white/60 font-mono text-lg">
          Design & Development Timeline
        </p>
      </motion.div>

      {/* Timeline Details Overlay */}
      <AnimatePresence>
        {hoveredNode !== null && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 left-10 z-10"
          >
            <div className="glass-card p-6 rounded-lg max-w-md">
              <h3 className="text-2xl font-bold text-accent mb-2">
                {timelineData[hoveredNode]?.title}
              </h3>
              <p className="text-white/80 mb-4">
                {timelineData[hoveredNode]?.description}
              </p>
              <div className="text-sm text-white/60 mb-3">
                Duration: {timelineData[hoveredNode]?.duration}
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2">Deliverables:</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  {timelineData[hoveredNode]?.deliverables.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1 h-1 bg-accent rounded-full mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Node Indicator */}
      <AnimatePresence>
        {activeNode !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 right-10 transform -translate-y-1/2 z-10"
          >
            <div className="glass-card p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-accent mb-2">
                {activeNode + 1}
              </div>
              <div className="text-sm text-white/60">
                of {timelineData.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CaseStudy
