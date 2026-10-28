import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const subjectsData = [
  {
    id: 'acd',
    code: 'ACD',
    title: 'Automata and Compiler Design',
    videoFile: 'TYCS_25_ACD_SLA_01.mp4',
    videoSrc: '/videos/TYCS_25_ACD_SLA_01.mp4',
    size: '775 MB',
    badge: 'STAGE 01'
  },
  {
    id: 'dmw',
    code: 'DMW',
    title: 'Data Mining and Warehousing',
    videoFile: 'TYCS_25_DMW_SLA_01.mp4',
    videoSrc: '/videos/TYCS_25_DMW_SLA_01.mp4',
    size: '754 MB',
    badge: 'STAGE 01'
  },
  {
    id: 'cse',
    code: 'CSE',
    title: 'Cyber Security Essentials',
    videoFile: 'TYCS_25_CSE_SLA_01.mp4',
    videoSrc: '/videos/TYCS_25_CSE_SLA_01.mp4',
    size: '771 MB',
    badge: 'STAGE 01'
  },
  {
    id: 'cf',
    code: 'CF',
    title: 'Cyber Forensics',
    videoFile: 'TYCS_25_CF_SLA_01.mp4',
    videoSrc: '/videos/TYCS_25_CF_SLA_01.mp4',
    size: '758 MB',
    badge: 'STAGE 01'
  }
]

const CollegeSLA = ({ onBack }) => {
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [theaterVideo, setTheaterVideo] = useState(null)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const theaterVideoRef = useRef(null)

  // Filter subjects based on selection & search query
  const filteredSubjects = subjectsData.filter((sub) => {
    const matchesFilter = selectedSubject === 'all' || sub.id === selectedSubject
    const matchesSearch =
      sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.videoFile.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Handle theater playback speed
  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed)
    if (theaterVideoRef.current) {
      theaterVideoRef.current.playbackRate = speed
    }
  }

  // Close theater on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setTheaterVideo(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white selection:bg-green-500 selection:text-black">
      {/* Background Matrix Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px] z-0" />
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-green-950/20 via-transparent to-black z-0" />

      {/* Top Header / Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/85 border-b border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="px-3.5 py-1.5 rounded bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/40 font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_12px_rgba(34,197,94,0.15)]"
            >
              <span>←</span> [RETURN TO PORTFOLIO]
            </motion.button>
            <div className="hidden md:flex items-center space-x-2 text-xs font-mono text-gray-400 border-l border-green-500/20 pl-4">
              <span className="text-red-500">[</span>
              <span className="text-green-400 font-bold">TYCS_25</span>
              <span className="text-red-500">]</span>
              <span>//</span>
              <span className="text-gray-300">COLLEGE SLA MODULES</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>4 OF 4 MODULES SUBMITTED</span>
            </div>
            <a
              href="https://github.com/omji48"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 font-mono text-xs transition-colors"
            >
              github.com/omji48
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Banner Section */}
        <div className="relative rounded-2xl border border-green-500/30 bg-gradient-to-br from-black via-gray-950 to-green-950/20 p-6 sm:p-10 mb-10 overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.1)]">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 transform -translate-x-8 translate-y-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-500/15 border border-green-400/30 text-green-300 font-mono text-xs mb-4">
              <span className="text-green-400 font-bold">●</span>
              <span>ACADEMIC EVALUATION // THIRD YEAR COMPUTER SCIENCE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight mb-4">
              <span className="text-red-500">[</span>
              <span className="text-white">COLLEGE SELF LEARNING ACTIVITY</span>
              <span className="text-red-500">]</span>
            </h1>

            <p className="text-gray-300 font-mono text-sm sm:text-base max-w-3xl leading-relaxed mb-6">
              Official video submissions and detailed architectural summaries prepared for third-year curriculum
              evaluations. Each module comprises comprehensive technical walkthroughs, slide explanations, and
              algorithmic breakdowns.
            </p>

            {/* Quick Metadata Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-green-500/20 text-xs font-mono">
              <div className="p-3 rounded-lg bg-black/60 border border-green-500/20">
                <div className="text-gray-400">CANDIDATE</div>
                <div className="text-green-400 font-bold text-sm">OM VIVEK MEHTA</div>
              </div>
              <div className="p-3 rounded-lg bg-black/60 border border-green-500/20">
                <div className="text-gray-400">STUDENT ROLL</div>
                <div className="text-green-400 font-bold text-sm">TYCS_25</div>
              </div>
              <div className="p-3 rounded-lg bg-black/60 border border-green-500/20">
                <div className="text-gray-400">SUBMISSION FORMAT</div>
                <div className="text-green-400 font-bold text-sm">MP4 Full HD (1080p)</div>
              </div>
              <div className="p-3 rounded-lg bg-black/60 border border-green-500/20">
                <div className="text-gray-400">EVALUATION STAGE</div>
                <div className="text-green-400 font-bold text-sm">Stage 01 Verified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Subject Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setSelectedSubject('all')}
              className={`px-3 py-1.5 rounded font-mono text-xs font-semibold transition-all ${
                selectedSubject === 'all'
                  ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                  : 'bg-black/60 text-gray-300 border border-green-500/20 hover:border-green-400/60 hover:text-green-300'
              }`}
            >
              [ALL SUBJECTS (4)]
            </button>
            {subjectsData.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubject(sub.id)}
                className={`px-3 py-1.5 rounded font-mono text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedSubject === sub.id
                    ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                    : 'bg-black/60 text-gray-300 border border-green-500/20 hover:border-green-400/60 hover:text-green-300'
                }`}
              >
                <span>[{sub.code}]</span>
                <span className="hidden sm:inline">{sub.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-green-500 text-xs font-mono">
              &gt;
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, keywords..."
              className="w-full bg-black/80 border border-green-500/30 rounded pl-8 pr-4 py-1.5 text-xs font-mono text-green-300 placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredSubjects.map((sub, index) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl border border-green-500/30 bg-gray-950/80 backdrop-blur-sm overflow-hidden hover:border-green-400/80 transition-all duration-300 flex flex-col group shadow-[0_0_20px_rgba(0,0,0,0.8)]"
            >
              {/* Card Header Bar */}
              <div className="p-4 sm:p-5 border-b border-green-500/20 bg-black/60 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-1 rounded bg-green-500/15 border border-green-400/40 text-green-400 font-mono text-xs font-bold">
                    {sub.code}
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-mono font-bold text-white group-hover:text-green-300 transition-colors">
                      {sub.title}
                    </h2>
                    <p className="text-xs font-mono text-gray-400">File: {sub.videoFile}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/30">
                    [{sub.badge}]
                  </span>
                  <div className="text-[11px] font-mono text-gray-500 mt-0.5">{sub.size}</div>
                </div>
              </div>

              {/* Video Player Container */}
              <div className="relative bg-black aspect-video flex items-center justify-center border-b border-green-500/20 group/player">
                <video
                  src={sub.videoSrc}
                  controls
                  preload="metadata"
                  className="w-full h-full object-contain bg-black"
                >
                  Your browser does not support the video tag.
                </video>

                {/* Quick overlay buttons */}
                <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover/player:opacity-100 transition-opacity pointer-events-none">
                  <button
                    onClick={() => setTheaterVideo(sub)}
                    className="pointer-events-auto px-2 py-1 rounded bg-black/80 hover:bg-green-500 hover:text-black border border-green-400/50 text-green-400 font-mono text-[11px] transition-all flex items-center gap-1 shadow-lg"
                    title="Open in Cinema Mode"
                  >
                    <span>⛶</span> Cinema Mode
                  </button>
                </div>
              </div>

              {/* Bottom Action Strip */}
              <div className="p-4 bg-black/60 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="text-gray-400">
                    Subject Code: <span className="text-green-400 font-bold">[{sub.code}]</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTheaterVideo(sub)}
                      className="px-3 py-1.5 rounded bg-black border border-green-500/40 hover:border-green-400 text-green-400 hover:text-white transition-all flex items-center gap-1"
                    >
                      <span>🎬</span>
                      <span>Theater View</span>
                    </button>

                    <a
                      href={sub.videoSrc}
                      download={sub.videoFile}
                      className="px-3 py-1.5 rounded bg-green-500/15 hover:bg-green-500 hover:text-black border border-green-400/50 text-green-400 font-bold transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(34,197,94,0.15)]"
                    >
                      <span>⬇</span>
                      <span>Download Video</span>
                    </a>
                  </div>
                </div>
            </motion.div>
          ))}
        </div>

        {filteredSubjects.length === 0 && (
          <div className="text-center py-20 border border-green-500/20 rounded-xl bg-black/60 font-mono">
            <div className="text-green-400 text-3xl mb-2">🔍</div>
            <div className="text-white text-base font-bold mb-1">NO MATCHING SUBJECTS FOUND</div>
            <div className="text-gray-400 text-xs">Try searching for other keywords like "compiler", "clustering", "memory", etc.</div>
            <button
              onClick={() => {
                setSelectedSubject('all')
                setSearchQuery('')
              }}
              className="mt-4 px-4 py-1.5 rounded bg-green-500/20 text-green-400 border border-green-500/40 text-xs hover:bg-green-500/30"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Verification and Submission Footer Box */}
        <div className="mt-16 p-6 rounded-xl border border-green-500/30 bg-black/70 backdrop-blur-md font-mono text-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-green-400 font-bold text-sm mb-1">
                [COLLEGE_SELF_LEARNING_ACTIVITY_SUBMISSION_PORTAL]
              </div>
              <div className="text-gray-400">
                All 4 SLA sessions are hosted directly from local assets. Each video is rendered in Full HD with stereo audio.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="px-4 py-2 rounded bg-green-500 text-black font-bold hover:bg-green-400 transition-colors shadow-[0_0_15px_rgba(34,197,94,0.4)]"
              >
                ← Return to Portfolio
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Theater / Cinema Mode Modal */}
      <AnimatePresence>
        {theaterVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col p-4 sm:p-6"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-green-500/30 max-w-7xl mx-auto w-full">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-green-500 text-black font-mono text-xs font-bold">
                  {theaterVideo.code}
                </span>
                <div>
                  <h3 className="text-white font-mono font-bold text-sm sm:text-base">
                    {theaterVideo.title}
                  </h3>
                  <p className="text-gray-400 font-mono text-xs hidden sm:block">
                    {theaterVideo.videoFile} ({theaterVideo.size})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Playback speed selector */}
                <div className="hidden sm:flex items-center gap-1 bg-black/60 border border-green-500/30 rounded px-2 py-1 text-xs font-mono">
                  <span className="text-gray-400 mr-1">Speed:</span>
                  {[1, 1.25, 1.5, 2].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`px-1.5 py-0.5 rounded ${
                        playbackSpeed === speed
                          ? 'bg-green-500 text-black font-bold'
                          : 'text-gray-300 hover:text-green-400'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>

                <a
                  href={theaterVideo.videoSrc}
                  download={theaterVideo.videoFile}
                  className="px-3 py-1.5 rounded bg-green-500/20 hover:bg-green-500/30 border border-green-400/50 text-green-400 font-mono text-xs transition-colors flex items-center gap-1"
                >
                  <span>⬇</span>
                  <span className="hidden sm:inline">Download</span>
                </a>

                <button
                  onClick={() => setTheaterVideo(null)}
                  className="px-3 py-1.5 rounded bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-black border border-red-500/50 font-mono text-xs font-bold transition-all ml-2"
                >
                  [ESC ✕]
                </button>
              </div>
            </div>

            {/* Cinema Video Viewport */}
            <div className="flex-1 flex items-center justify-center py-4 max-w-7xl mx-auto w-full">
              <div className="w-full h-full max-h-[75vh] bg-black rounded-xl overflow-hidden border border-green-500/40 shadow-[0_0_50px_rgba(34,197,94,0.2)] flex items-center justify-center">
                <video
                  ref={theaterVideoRef}
                  src={theaterVideo.videoSrc}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Modal Bottom Information */}
            <div className="max-w-7xl mx-auto w-full pt-3 border-t border-green-500/20 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-400 gap-2">
              <div>
                Candidate: <span className="text-green-400 font-bold">Om Vivek Mehta (TYCS_25)</span> | Stage 01 Self Learning Activity
              </div>
              <div className="text-gray-500">
                Press <kbd className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-300">Esc</kbd> to exit cinema mode
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CollegeSLA
