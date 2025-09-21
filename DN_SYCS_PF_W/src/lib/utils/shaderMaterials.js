import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Sheen shader material for interactive reflections
const SheenMaterial = shaderMaterial(
  {
    uTime: 0,
    uCursorInfluence: 0,
    uColor: new THREE.Color(1, 1, 1),
    uRoughness: 0.5,
    uMetalness: 0.8,
    uEnvMapIntensity: 1.0,
  },
  // Vertex shader
  `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform float uCursorInfluence;
    uniform vec3 uColor;
    uniform float uRoughness;
    uniform float uMetalness;
    uniform float uEnvMapIntensity;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    void main() {
      vec3 normal = normalize(vNormal);
      
      // Base material properties
      float roughness = uRoughness * (1.0 - uCursorInfluence * 0.7);
      float metalness = uMetalness + uCursorInfluence * 0.3;
      
      // Sheen effect based on cursor influence
      float sheen = pow(1.0 - roughness, 2.0) * (1.0 + uCursorInfluence * 2.0);
      
      // Fresnel effect
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 2.0);
      
      // Combine base color with sheen
      vec3 baseColor = uColor;
      vec3 sheenColor = mix(baseColor, vec3(1.0), sheen * fresnel);
      
      // Final color
      vec3 finalColor = mix(baseColor, sheenColor, uCursorInfluence);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
)

// Glass shader material for cards
const GlassMaterial = shaderMaterial(
  {
    uTime: 0,
    uOpacity: 0.8,
    uRimPower: 2.0,
    uRimColor: new THREE.Color(0.0, 0.8, 1.0),
  },
  // Vertex shader
  `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform float uOpacity;
    uniform float uRimPower;
    uniform vec3 uRimColor;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      
      // Rim lighting
      float rim = 1.0 - max(dot(normal, viewDirection), 0.0);
      rim = pow(rim, uRimPower);
      
      // Glass effect
      float fresnel = 1.0 - max(dot(normal, viewDirection), 0.0);
      
      // Combine effects
      vec3 rimColor = uRimColor * rim;
      float alpha = uOpacity * (0.1 + fresnel * 0.9);
      
      gl_FragColor = vec4(rimColor, alpha);
    }
  `
)

// Gaussian blur shader for vignette
const BlurMaterial = shaderMaterial(
  {
    uTexture: null,
    uResolution: new THREE.Vector2(1, 1),
    uRadius: 0.5,
    uCenter: new THREE.Vector2(0.5, 0.5),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform sampler2D uTexture;
    uniform vec2 uResolution;
    uniform float uRadius;
    uniform vec2 uCenter;
    
    varying vec2 vUv;
    
    void main() {
      vec2 texelSize = 1.0 / uResolution;
      vec4 color = vec4(0.0);
      float total = 0.0;
      
      // Gaussian blur kernel
      for(int x = -4; x <= 4; x++) {
        for(int y = -4; y <= 4; y++) {
          vec2 offset = vec2(float(x), float(y)) * texelSize;
          float weight = exp(-(float(x*x + y*y)) / (2.0 * uRadius * uRadius));
          color += texture2D(uTexture, vUv + offset) * weight;
          total += weight;
        }
      }
      
      color /= total;
      
      // Vignette effect
      float dist = distance(vUv, uCenter);
      float vignette = 1.0 - smoothstep(0.0, uRadius, dist);
      
      gl_FragColor = color * vignette;
    }
  `
)

// Extend R3F with custom materials
extend({ SheenMaterial, GlassMaterial, BlurMaterial })

export { SheenMaterial, GlassMaterial, BlurMaterial }
