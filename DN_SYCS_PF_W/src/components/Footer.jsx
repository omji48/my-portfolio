import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="bg-black border-t border-green-400/30 py-12"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold font-mono text-green-400 mb-4">
              <span className="text-red-500">[</span>CYBER_PORTFOLIO<span className="text-red-500">]</span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-md font-mono text-sm leading-relaxed">
              Professional ethical hacker and penetration testing specialist. 
              Dedicated to securing digital infrastructure through responsible disclosure 
              and comprehensive security assessments.
            </p>
          </div>

          {/* Security Links */}
          <div>
            <h4 className="text-lg font-semibold text-red-400 font-mono mb-4">[SECURITY]</h4>
            <ul className="space-y-2 text-sm font-mono">
              <li>
                <motion.a
                  href="#hero"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  → Home
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#about"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  → About
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#skills"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  → Skills
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#work"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  → Exploits
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#process"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  → Methodology
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#contact"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  → Contact
                </motion.a>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-lg font-semibold text-blue-400 font-mono mb-4">[TECH_STACK]</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-mono">
              <li>→ React + Vite</li>
              <li>→ Three.js + R3F</li>
              <li>→ Tailwind CSS</li>
              <li>→ Framer Motion</li>
              <li>→ WebGL Shaders</li>
            </ul>
          </div>
        </div>

        {/* Terminal-style bottom bar */}
        <div className="border-t border-green-400/30 pt-8">
          <div className="bg-black border border-green-400/30 p-4 rounded font-mono text-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div className="text-green-400">
                <span className="text-red-500">root@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-white">$ echo "Copyright © {currentYear} - All rights reserved"</span>
              </div>
              
            </div>
            
            <div className="mt-4 text-xs text-gray-600">
              → This portfolio demonstrates ethical hacking skills for educational and professional purposes only.
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
