import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Environment, 
  OrbitControls, 
  useGLTF, 
  PerspectiveCamera,
  useTexture
} from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import { SheenMaterial } from '../lib/utils/shaderMaterials'
import { useCameraRig } from '../lib/cameraRig'
import { useScrollController } from '../lib/scrollController'

// 3D Sculpture Component
const Sculpture = ({ onPointerMove, onPointerLeave }) => {
  const meshRef = useRef()
  const [cursorInfluence, setCursorInfluence] = useState(0)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Idle rotation
      meshRef.current.rotation.y += 0.005
      
      // Hover effect
      if (hovered) {
        meshRef.current.rotation.x += (state.mouse.y * 0.1 - meshRef.current.rotation.x) * 0.1
        meshRef.current.rotation.y += (state.mouse.x * 0.1 - meshRef.current.rotation.y) * 0.1
      }
    }
  })

  const handlePointerMove = (event) => {
    const distance = event.distance
    const influence = Math.max(0, 1 - distance / 5) // Influence based on distance
    setCursorInfluence(influence)
    onPointerMove?.(event)
  }

  const handlePointerLeave = () => {
    setCursorInfluence(0)
    setHovered(false)
    onPointerLeave?.()
  }

  const handlePointerEnter = () => {
    setHovered(true)
  }

  return (
    <group 
      ref={meshRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
    >
      {/* Create a geometric sculpture instead of loading GLB */}
      <mesh>
        <torusKnotGeometry args={[2, 0.5, 100, 16]} />
        <SheenMaterial 
          uCursorInfluence={cursorInfluence}
          uColor={[0.8, 0.8, 0.9]}
          uRoughness={0.3}
          uMetalness={0.9}
        />
      </mesh>
      
      {/* Add some floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} position={[
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial 
            color="#00d4ff" 
            emissive="#00d4ff"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

// Environment and Lighting
const SceneSetup = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />
      
      {/* Environment Map */}
      <Environment preset="studio" />
    </>
  )
}

// Camera Controller
const CameraController = () => {
  const { cameraRef, dofSettings } = useCameraRig(useScrollController().scrollProgress)
  
  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 5, 15]}
      fov={75}
    />
  )
}

// Main Hero Component
const Hero3D = () => {
  const [isWebGLSupported, setIsWebGLSupported] = useState(true)
  const [performanceMode, setPerformanceMode] = useState(false)

  // Check WebGL support
  useEffect(() => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    setIsWebGLSupported(!!gl)
  }, [])

  // WebGL Fallback
  if (!isWebGLSupported) {
    return (
      <div className="webgl-fallback">
        <h1>3D Portfolio</h1>
        <p>
          Your browser doesn't support WebGL, which is required for the 3D experience. 
          Please update your browser or enable hardware acceleration.
        </p>
        <div className="mt-8 space-y-4">
          <div className="text-lg">Featured Projects</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="text-accent mb-2">Synthesis</h3>
              <p className="text-sm text-gray-300">Interactive data visualization platform</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="text-accent mb-2">Echo</h3>
              <p className="text-sm text-gray-300">Real-time audio processing system</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="text-accent mb-2">Orbit</h3>
              <p className="text-sm text-gray-300">3D space exploration interface</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen">
      {/* 3D Canvas */}
      <Canvas
        className="w-full h-full"
        dpr={performanceMode ? 1 : [1, 2]}
        performance={{ min: 0.5 }}
        gl={{ 
          antialias: !performanceMode,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <SceneSetup />
        <CameraController />
        <Sculpture />
        
        {/* Post-processing Effects */}
        {!performanceMode && (
          <EffectComposer>
            <Bloom 
              intensity={0.5} 
              luminanceThreshold={0.9}
              luminanceSmoothing={0.025}
            />
            <DepthOfField 
              focusDistance={0.1}
              focalLength={0.02}
              bokehScale={2}
            />
            <Vignette 
              eskil={false}
              offset={0.1}
              darkness={0.5}
            />
          </EffectComposer>
        )}
      </Canvas>

      {/* Hero Text Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="text-center max-w-4xl px-6">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-6xl md:text-8xl font-bold text-gradient mb-6"
          >
            Creative
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-xl md:text-2xl text-white/80 font-mono"
          >
            Interactive 3D Portfolio
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Performance Toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setPerformanceMode(!performanceMode)}
          className="text-xs font-mono text-white/60 hover:text-white transition-colors"
        >
          {performanceMode ? 'Performance Mode' : 'Quality Mode'}
        </button>
      </div>
    </div>
  )
}

export default Hero3D
