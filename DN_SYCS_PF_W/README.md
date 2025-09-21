# 3D Portfolio Website

A production-ready, cinematic 3D portfolio website built with React, Three.js, and modern web technologies. Features a 4-chapter scroll experience with 3D scenes, custom shaders, and accessibility features.

## 🎯 Design Goals

This project implements modern "mind-blowing 3D site" design patterns inspired by top-tier 3D websites:

- **Cinematic 4-Chapter Scroll**: Hero → Work Gallery → Case Study Timeline → Contact
- **Layered Depth**: Foreground 3D objects, mid-ground floating cards, background panoramas
- **High-Polish Micro-interactions**: Shader-driven sheen effects, glassmorphism, bloom highlights
- **Stealthy UI**: Minimal chrome with icon-only navigation and monochrome typography
- **Performance & Accessibility**: WebGL fallbacks, reduced-motion support, keyboard navigation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Modern browser with WebGL support

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd 3d-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

```bash
# Start with hot reload
npm run dev

# Lint code
npm run lint
```

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 18 + Vite
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + GSAP
- **Scroll**: Locomotive Scroll + ScrollTrigger
- **Post-processing**: R3F Postprocessing
- **Shaders**: Custom GLSL shaders

### Project Structure

```
src/
├── components/           # React components
│   ├── Hero3D.jsx       # 3D hero section with sculpture
│   ├── WorkGrid3D.jsx   # 3D work gallery with glass cards
│   ├── CaseStudy.jsx    # Timeline with interactive nodes
│   ├── ContactForm.jsx  # Contact form with validation
│   ├── Nav.jsx          # Navigation with chapter indicators
│   ├── Footer.jsx       # Footer with links and info
│   └── UI/              # UI components
│       ├── PerfToggle.jsx    # Performance mode toggle
│       └── MotionToggle.jsx  # Reduced motion toggle
├── lib/                 # Utilities and hooks
│   ├── cameraRig.js     # Camera positioning and movement
│   ├── scrollController.js  # Scroll management
│   └── utils/
│       ├── loadGLTF.js      # 3D model loading
│       └── shaderMaterials.js  # Custom shaders
├── styles/
│   └── global.css       # Global styles and Tailwind
└── App.jsx              # Main app component

public/
├── assets/              # 3D models and textures
│   ├── sculpture.glb    # Hero sculpture model
│   ├── product.glb      # Product mock model
│   └── *-thumb.jpg      # Project thumbnails
└── fonts/               # 3D text fonts
    └── helvetiker_regular.typeface.json
```

## 🎨 Design Implementation

### 4-Chapter Scroll System

1. **Hero (0-25%)**: Cinematic entrance with 3D sculpture
   - Camera starts wide & high, dollies in
   - DOF tightens, vignette increases
   - Interactive sculpture with cursor influence

2. **Work Gallery (25-55%)**: Floating glass cards in arc
   - Cards animate in sequentially
   - Hover effects with DOM overlays
   - Parallax movement for depth

3. **Case Study (55-85%)**: Horizontal timeline
   - Pinned section with camera travel
   - Interactive nodes with tooltips
   - Product mock with texture swapping

4. **Contact (85-100%)**: Contact form
   - Clean form with validation
   - Social links and info cards

### Custom Shaders

#### Sheen Shader
- Cursor-influenced specular highlights
- Fresnel effects for realistic reflections
- Smooth transitions between states

#### Glass Shader
- Rim lighting for depth
- Alpha blending for transparency
- Refraction effects

#### Blur Shader
- Gaussian blur for vignette
- Performance-optimized kernel
- Configurable radius and center

### Camera System

- **Smooth Interpolation**: Eased transitions between chapters
- **DOF Control**: Dynamic focus distance and aperture
- **Parallax**: Different movement speeds for depth layers
- **Performance**: Optimized for 60fps on modern devices

## 🎛️ Performance & Accessibility

### Performance Features

- **WebGL Detection**: Graceful fallback for unsupported browsers
- **Performance Mode**: Toggle for heavy post-processing effects
- **Model Optimization**: Draco compression for GLB files
- **Texture Optimization**: KTX2 support for compressed textures
- **LOD System**: Level-of-detail for complex models

### Accessibility Features

- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and live regions
- **High Contrast**: Fallback for low-vision users
- **Focus Management**: Clear focus indicators

### Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **WebGL 2.0**: Required for advanced features
- **ES2020**: Modern JavaScript features
- **CSS Grid**: Layout system

## 🔧 Configuration

### Environment Variables

```env
VITE_APP_TITLE=3D Portfolio
VITE_APP_DESCRIPTION=A cinematic 3D portfolio website
VITE_APP_URL=https://your-domain.com
```

### Performance Settings

```javascript
// In src/App.jsx
const performanceSettings = {
  dpr: performanceMode ? 1 : [1, 2],
  antialias: !performanceMode,
  postprocessing: !performanceMode
}
```

### Model Optimization

```bash
# Install gltf-pipeline
npm install -g gltf-pipeline

# Compress GLB with Draco
gltf-pipeline -i sculpture.glb -o sculpture.glb --draco

# Convert textures to KTX2
# Use basisu or similar tool
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Netlify

```bash
# Build project
npm run build

# Deploy dist folder to Netlify
# Or connect GitHub repository
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🎨 Customization

### Adding New Projects

1. Add project data to `WorkGrid3D.jsx`:
```javascript
const projects = [
  {
    id: 4,
    title: 'New Project',
    category: 'Category',
    description: 'Project description',
    thumbnail: '/assets/new-project-thumb.jpg',
    technologies: ['React', 'Three.js']
  }
]
```

2. Create thumbnail image (1200x800px)
3. Add to `public/assets/`

### Swapping 3D Models

1. Replace `public/assets/sculpture.glb` with your model
2. Ensure model is optimized (< 2MB)
3. Test in different browsers
4. Update materials in `Hero3D.jsx` if needed

### Custom Shaders

1. Add shader code to `src/lib/utils/shaderMaterials.js`
2. Extend R3F with `extend({ YourShader })`
3. Use in components: `<YourShader />`

### Styling

- **Colors**: Update Tailwind config in `tailwind.config.cjs`
- **Fonts**: Add to `public/index.html` and update CSS
- **Animations**: Modify Framer Motion configs

## 🐛 Troubleshooting

### Common Issues

**WebGL not working:**
- Check browser WebGL support
- Update graphics drivers
- Try different browser

**Performance issues:**
- Enable Performance Mode
- Reduce model complexity
- Check device capabilities

**Models not loading:**
- Verify file paths
- Check CORS settings
- Ensure GLB format

**Scroll not smooth:**
- Check for conflicting CSS
- Verify scroll controller setup
- Test on different devices

### Debug Mode

```javascript
// Enable Three.js debug info
import { Stats } from '@react-three/drei'

<Stats />
```

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

For questions or support:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the documentation

## 🙏 Acknowledgments

- **Three.js** community for excellent 3D library
- **React Three Fiber** for React integration
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **GSAP** for advanced scroll animations

---

Built with ❤️ using modern web technologies. Designed for performance, accessibility, and user experience.
