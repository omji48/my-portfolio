import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'

// GLTF loader with Draco compression support
export const useGLTFWithDraco = (url) => {
  const gltf = useGLTF(url, '/draco/')
  return useMemo(() => gltf, [gltf])
}

// Texture loader with KTX2 support
export const loadTexture = (url, loader) => {
  return new Promise((resolve, reject) => {
    loader.load(url, resolve, undefined, reject)
  })
}

// Model preloader for performance
export const preloadModels = (urls) => {
  urls.forEach(url => {
    useGLTF.preload(url, '/draco/')
  })
}

// Fallback for when WebGL is not available
export const createFallbackModel = () => {
  return {
    scene: null,
    animations: [],
    cameras: [],
    asset: { generator: 'fallback' }
  }
}
