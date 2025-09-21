import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // EmailJS configuration
      const serviceId = 'service_e8plzek'
      const templateId = 'template_c88xuj7'
      const publicKey = 'NfsOTMi6JE1dMH_P-'
      
      // Initialize EmailJS
      emailjs.init(publicKey)
      
      // Send email
      const result = await emailjs.send(serviceId, templateId, {
        name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        time: new Date().toLocaleString()
      })
      
      console.log('Email sent successfully:', result)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="max-w-4xl mx-auto p-8"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-bold font-mono mb-4">
          <span className="text-green-400">[</span>
          <span className="text-white">SECURE_CONTACT</span>
          <span className="text-green-400">]</span>
        </h2>
        <p className="text-green-300 font-mono text-lg mb-4">
          → Establish encrypted communication channel
        </p>
        <div className="text-gray-400 font-mono text-sm">
          All communications are end-to-end encrypted using AES-256.
        </div>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6 border border-green-400/30 bg-black/80 p-8 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        {/* Terminal header */}
        <div className="border-b border-green-400/30 pb-4 mb-6">
          <div className="font-mono text-green-400 text-sm">
            <span className="text-red-500">root@secure-contact</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~/contact</span>
            <span className="text-white">$ ./initiate_contact.sh</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-mono text-green-400 mb-2">
              [IDENTITY]:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black border border-green-400/50 rounded text-green-300 placeholder-green-600 focus:outline-none focus:border-green-400 focus:bg-gray-900/50 transition-colors font-mono"
              placeholder="Enter your alias..."
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-mono text-green-400 mb-2">
              [SECURE_CHANNEL]:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black border border-green-400/50 rounded text-green-300 placeholder-green-600 focus:outline-none focus:border-green-400 focus:bg-gray-900/50 transition-colors font-mono"
              placeholder="encrypted@email.onion"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-mono text-green-400 mb-2">
            [OPERATION_CODE]:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-black border border-green-400/50 rounded text-green-300 placeholder-green-600 focus:outline-none focus:border-green-400 focus:bg-gray-900/50 transition-colors font-mono"
            placeholder="Operation codename..."
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-mono text-green-400 mb-2">
            [ENCRYPTED_PAYLOAD]:
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 bg-black border border-green-400/50 rounded text-green-300 placeholder-green-600 focus:outline-none focus:border-green-400 focus:bg-gray-900/50 transition-colors resize-none font-mono"
            placeholder="BEGIN ENCRYPTED MESSAGE\n---\nDescribe your security requirements, project scope, or consultation needs...\n---\nEND ENCRYPTED MESSAGE"
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-green-600 hover:bg-green-500 text-black font-semibold font-mono rounded border border-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? '[TRANSMITTING...]' : '[SEND_ENCRYPTED_MESSAGE]'}
        </motion.button>

        {/* Submit Status */}
        <AnimatePresence>
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`text-center p-4 rounded-lg ${
                submitStatus === 'success' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
            >
              {submitStatus === 'success' 
                ? 'Message sent successfully! I\'ll get back to you soon.'
                : 'Something went wrong. Please try again.'
              }
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="mt-12 text-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-green-400/30 bg-black/60 p-8 rounded-lg text-center">
            <div className="text-2xl mb-2">📧</div>
            <h3 className="font-semibold mb-2 text-green-400 font-mono">[SECURE_EMAIL]</h3>
            <a href="mailto:shadowextractorarise@proton.me" className="text-gray-400 text-sm font-mono hover:text-green-400 transition-colors break-words">
              shadowextractorarise@proton.me
            </a>
          </div>
          
          <div className="border border-blue-400/30 bg-black/60 p-8 rounded-lg text-center">
            <div className="text-2xl mb-2">🐙</div>
            <h3 className="font-semibold mb-2 text-blue-400 font-mono">[GITHUB]</h3>
            <a href="https://github.com/omji48" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm font-mono hover:text-blue-400 transition-colors break-words">
              https://github.com/omji48
            </a>
          </div>
          
          <div className="border border-red-400/30 bg-black/60 p-8 rounded-lg text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold mb-3 text-red-400 font-mono text-xl">[HACKERONE]</h3>
            <a href="https://hackerone.com/creative_bug" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-base font-mono hover:text-red-400 transition-colors break-words">
              https://hackerone.com/creative_bug
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ContactForm
