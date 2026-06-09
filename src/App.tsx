import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import config, { type SocialLink } from './config'

// ─── Social Icon Map ──────────────────────────────────
const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  GitHub: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  Twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Bilibili: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907.25-.248.556-.373.907-.373.357 0 .66.124.907.373l2.853 2.747h6.586l2.853-2.747c.25-.249.557-.373.907-.373.349 0 .654.124.906.373.25.249.374.551.374.907 0 .355-.124.657-.374.906l-1.173 1.12zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zM8 11.107c.373 0 .684.124.933.373.25.249.383.557.4.926v1.987c-.017.369-.15.677-.4.927-.25.249-.56.374-.933.374s-.684-.125-.933-.374c-.25-.25-.383-.558-.4-.927V12.4c0-.369.133-.677.4-.926.25-.249.56-.373.933-.373zm8 0c.373 0 .683.124.933.373.249.249.383.557.4.926v1.987c-.017.369-.151.677-.4.927-.25.249-.56.374-.933.374s-.684-.125-.933-.374c-.25-.25-.384-.558-.4-.927V12.4c0-.369.134-.677.4-.926.249-.249.56-.373.933-.373z"/>
    </svg>
  ),
  Email: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  WeChat: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zm-2.036 2.84c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.983.97-.983zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.97.983.976.976 0 0 1-.968-.983c0-.542.434-.983.969-.983z"/>
    </svg>
  ),
  LinkedIn: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
}

function getSocialIcon(name: string): React.ReactNode {
  return SOCIAL_ICONS[name] || (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  )
}

// ─── Hooks ────────────────────────────────────────────
function useTypeWriter(text: string, speed: number = 100) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let index = 0
    setDisplayText('')
    setIsComplete(false)
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])

  return { displayText, isComplete }
}

function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])
  return pos
}

function useClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => {
      const d = new Date()
      setTime(
        d.toLocaleTimeString('en-US', {
          hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
        })
      )
    }
    update()
    const t = setInterval(update, 1000)
    return () => clearInterval(t)
  }, [])
  return time
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (scrolled / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return progress
}

// ─── Background Layer (dark + grid + scan + mesh) ─────
function Background() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          zIndex: 0,
          background: `
            radial-gradient(ellipse at top right, rgba(40, 20, 5, 1) 0%, rgba(10, 5, 0, 1) 50%),
            linear-gradient(135deg, #0a0500 0%, #1a0a05 50%, #0a0500 100%)
          `,
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        <div
          className="absolute rounded-full"
          style={{
            top: '-180px', right: '-100px',
            width: '700px', height: '700px',
            background: `radial-gradient(circle, ${config.theme.warmGlow} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            animation: 'pulseGlow 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: '-200px', left: '-150px',
            width: '700px', height: '700px',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'pulseGlow 10s ease-in-out 2s infinite',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: '30%', left: '20%',
            width: '500px', height: '500px',
            background: `radial-gradient(circle, ${config.theme.coolGlow} 0%, transparent 70%)`,
            filter: 'blur(50px)',
            animation: 'pulseGlow 12s ease-in-out 4s infinite',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: '60%', right: '30%',
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'pulseGlow 14s ease-in-out 6s infinite',
          }}
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage: `
            linear-gradient(rgba(251, 191, 36, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251, 191, 36, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '70px 70px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          zIndex: 1,
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(251, 191, 36, 0.03) 100px, rgba(251, 191, 36, 0.03) 101px)',
        }}
      />
    </>
  )
}

// ─── Character as full background image ───────────────
function CharacterBackground() {
  const { x, y } = useMousePosition()
  const containerRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (x - centerX) / window.innerWidth
    const deltaY = (y - centerY) / window.innerHeight
    setTilt({ x: deltaY * -4, y: deltaX * 4 })
  }, [x, y])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{
        zIndex: 2,
        perspective: '1000px',
        animation: 'floatCharacter 7s ease-in-out infinite',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(1.05) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundImage: `url(${config.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: config.backgroundPosition,
          backgroundRepeat: 'no-repeat',
          maskImage: 'linear-gradient(180deg, black 0%, black 60%, rgba(0,0,0,0.7) 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, black 0%, black 60%, rgba(0,0,0,0.7) 85%, transparent 100%)',
          filter: 'drop-shadow(0 0 60px rgba(0, 0, 0, 0.5))',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          background: 'linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, 0) 40%, rgba(255, 200, 100, 0.35) 50%, rgba(255, 255, 255, 0) 60%, transparent 70%)',
          backgroundSize: '300% 100%',
          animation: 'colorSweep 6s ease-in-out infinite',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{
          background: 'linear-gradient(180deg, rgba(251, 113, 60, 0.18) 0%, transparent 40%, rgba(245, 158, 11, 0.12) 100%)',
          animation: 'colorBreathe 5s ease-in-out infinite',
        }}
      />

      <div
        className="absolute pointer-events-none"
        style={{
          top: '15%', right: '15%',
          width: '500px', height: '500px',
          background: `radial-gradient(circle, ${config.theme.warmGlow} 0%, rgba(245, 158, 11, 0.1) 30%, transparent 65%)`,
          filter: 'blur(40px)',
          animation: 'pulseGlow 5s ease-in-out infinite',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '30%', right: '25%',
          width: '400px', height: '400px',
          background: `radial-gradient(circle, ${config.theme.coolGlow} 0%, transparent 60%)`,
          filter: 'blur(35px)',
          animation: 'pulseGlow 6s ease-in-out 1.5s infinite',
        }}
      />

      <div
        className="absolute inset-y-0 left-0 w-2/3 pointer-events-none hidden md:block"
        style={{
          background: 'linear-gradient(90deg, rgba(10, 5, 0, 0.85) 0%, rgba(10, 5, 0, 0.55) 35%, rgba(10, 5, 0, 0.15) 60%, transparent 100%)',
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(10, 5, 0, 0.7) 0%, transparent 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(10, 5, 0, 0.95) 0%, rgba(10, 5, 0, 0.5) 50%, transparent 100%)',
        }}
      />

      <div
        className="absolute top-[18%] right-[12%] w-3 h-3 rounded-full pointer-events-none"
        style={{
          background: '#fbbf24',
          boxShadow: '0 0 30px 8px rgba(251, 191, 36, 0.6)',
          animation: 'floatOrb 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-[40%] right-[8%] w-2 h-2 rounded-full pointer-events-none"
        style={{
          background: '#f87171',
          boxShadow: '0 0 25px 6px rgba(248, 113, 113, 0.5)',
          animation: 'floatOrb 10s ease-in-out 2s infinite',
        }}
      />
      <div
        className="absolute top-[55%] right-[20%] w-2.5 h-2.5 rounded-full pointer-events-none"
        style={{
          background: '#fde68a',
          boxShadow: '0 0 28px 7px rgba(253, 230, 138, 0.5)',
          animation: 'floatOrb 9s ease-in-out 4s infinite',
        }}
      />
    </div>
  )
}

function Particles({ count = 30 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 8 + Math.random() * 10,
    size: 1.5 + Math.random() * 4,
    opacity: 0.2 + Math.random() * 0.5,
  }))
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 6 }}>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            background: ['#fbbf24', '#f97316', '#ef4444', '#fde68a'][p.id % 4],
            boxShadow: `0 0 ${p.size * 4}px ${p.size}px currentColor`,
            color: ['#fbbf24', '#f97316', '#ef4444', '#fde68a'][p.id % 4],
            animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

function MouseGlow() {
  const { x, y } = useMousePosition()
  return (
    <div
      className="absolute pointer-events-none transition-opacity duration-300 hidden md:block"
      style={{
        zIndex: 7,
        left: `${x}px`, top: `${y}px`,
        width: '700px', height: '700px',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(251, 146, 60, 0.1) 0%, transparent 60%)',
      }}
    />
  )
}

// ─── Top Bar ──────────────────────────────────────────
function TopBar() {
  const time = useClock()
  const progress = useScrollProgress()
  return (
    <>
      <div
        className="fixed top-0 left-0 h-[2px] z-50 transition-all duration-200"
        style={{
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${config.theme.primary}, ${config.theme.accent}, ${config.theme.primary})`,
          boxShadow: `0 0 10px ${config.theme.primary}99`,
        }}
      />
      <nav
        className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 py-5 flex items-center justify-between"
        style={{ animation: 'slideDown 0.6s ease-out 0.1s both' }}
      >
        <a href="#" className="group flex items-center gap-2.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-lg relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${config.theme.primary} 0%, ${config.theme.accent} 100%)`,
              boxShadow: `0 4px 14px ${config.theme.primary}66`,
            }}
          >
            {config.initials}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
            />
          </div>
          <div className="hidden sm:block">
            <div className="text-white font-bold text-sm">{config.brandName}</div>
            <div className="text-amber-300/60 text-[10px] font-mono">{config.brandSub}</div>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-4 px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(251, 191, 36, 0.15)', backdropFilter: 'blur(10px)' }}>
          {/* Decorative signal bars */}
          <div className="flex items-end gap-[3px]">
            {[6, 9, 12, 15].map((h, i) => (
              <span
                key={i}
                className="w-[3px] rounded-sm"
                style={{
                  height: `${h}px`,
                  background: i < 3 ? '#fbbf24' : 'rgba(251, 191, 36, 0.3)',
                  boxShadow: i < 3 ? '0 0 6px rgba(251, 191, 36, 0.5)' : 'none',
                }}
              />
            ))}
          </div>
          {/* Divider */}
          <span className="w-px h-4 bg-amber-400/20" />
          {/* System label */}
          <span className="text-amber-300/60 text-[10px] font-mono tracking-widest uppercase">System Online</span>
          {/* Decorative dot trio */}
          <div className="flex items-center gap-1.5">
            {['#fbbf24', '#f97316', '#ef4444'].map((c, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: c,
                  boxShadow: `0 0 6px ${c}80`,
                  animation: `pulseGlow ${2 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(251, 191, 36, 0.15)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-amber-100/80 text-xs font-mono">{time}</span>
            <span className="text-amber-300/40 text-[10px]">CST</span>
          </div>
          <a
            href={config.contactEmail}
            className="px-4 py-2 rounded-full text-xs font-semibold text-white transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${config.theme.primary}, ${config.theme.accent})`,
              boxShadow: `0 4px 14px ${config.theme.primary}4D`,
            }}
          >
            {config.ctaText}
          </a>
        </div>
      </nav>
    </>
  )
}

// ─── Marquee ──────────────────────────────────────────
function Marquee() {
  return (
    <div
      className="absolute top-20 left-0 right-0 z-10 overflow-hidden"
      style={{ animation: 'fadeIn 1s ease-out 0.5s both' }}
    >
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: 'marquee 40s linear infinite' }}
      >
        {[...config.marqueeItems, ...config.marqueeItems, ...config.marqueeItems].map((item, i) => (
          <span
            key={i}
            className="text-amber-300/40 text-sm font-mono tracking-wider flex items-center gap-12"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Counter ──────────────────────────────────────────
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let s: number | null = null
    const startTime = performance.now()
    const duration = 1800
    const animate = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(target * eased))
      if (p < 1) s = requestAnimationFrame(animate)
    }
    s = requestAnimationFrame(animate)
    return () => { if (s) cancelAnimationFrame(s) }
  }, [started, target])

  return <span ref={ref}>{count}{suffix}</span>
}

// ─── Stat Card ────────────────────────────────────────
function StatCard({ value, suffix, label, color, delay }: {
  value: number; suffix: string; label: string; color: string; delay: number
}) {
  return (
    <div
      className="relative group p-4 rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(0, 0, 0, 0.55)',
        border: '1px solid rgba(251, 191, 36, 0.2)',
        backdropFilter: 'blur(10px)',
        animation: `slideUp 0.7s ease-out ${delay}s both`,
      }}
    >
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        style={{ background: color, filter: 'blur(30px)' }}
      />
      <div
        className="text-2xl md:text-3xl font-black tracking-tight"
        style={{ background: `linear-gradient(135deg, ${color}, #fef3c7)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        <Counter target={value} suffix={suffix} />
      </div>
      <div className="text-amber-200/60 text-[10px] mt-1.5 uppercase tracking-widest">{label}</div>
    </div>
  )
}

// ─── Project Card ─────────────────────────────────────
function ProjectCard({ title, desc, tag, color, delay }: {
  title: string; desc: string; tag: string; color: string; delay: number
}) {
  return (
    <div
      className="group relative p-4 rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(0, 0, 0, 0.55)',
        border: '1px solid rgba(251, 191, 36, 0.18)',
        backdropFilter: 'blur(10px)',
        animation: `slideUp 0.7s ease-out ${delay}s both`,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.4)'
        e.currentTarget.style.boxShadow = '0 20px 50px -20px rgba(245, 158, 11, 0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.18)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"
        style={{ background: color, filter: 'blur(40px)' }}
      />
      <div className="relative z-10 flex flex-col h-full justify-between gap-3">
        <div>
          <div
            className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider mb-2.5"
            style={{ background: `${color}30`, color: '#fde68a', border: `1px solid ${color}50` }}
          >
            {tag}
          </div>
          <h3 className="text-white font-bold text-base mb-1 group-hover:text-amber-200 transition-colors">
            {title}
          </h3>
          <p className="text-amber-100/60 text-xs leading-relaxed">{desc}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: i === 0 ? color : 'rgba(251, 191, 36, 0.2)' }}
              />
            ))}
          </div>
          <span className="text-amber-300/60 text-xs group-hover:text-amber-200 group-hover:translate-x-1 transition-all inline-flex items-center gap-1">
            View
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Terminal Card ────────────────────────────────────
function TerminalCard() {
  const [lines, setLines] = useState<string[]>([])
  useEffect(() => {
    let cancelled = false
    let i = 0
    let timerId: ReturnType<typeof setTimeout> | null = null // 存储 timer ID 以便 cleanup 清理

    const run = () => {
      if (cancelled) return
      // 防御：确保 i 在有效范围内
      if (i >= config.terminalLines.length) return
      const line = config.terminalLines[i]
      if (line == null) return // 防御：行数据为空则跳过
      setLines((prev) => [...prev, line])
      i++
      if (!cancelled) {
        timerId = setTimeout(run, 600)
      }
    }

    timerId = setTimeout(run, 800)
    return () => {
      cancelled = true
      if (timerId != null) clearTimeout(timerId) // 确保清理所有 pending timer
    }
  }, [])

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(0, 0, 0, 0.7)',
        border: '1px solid rgba(251, 191, 36, 0.25)',
        boxShadow: '0 20px 60px -20px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(251, 191, 36, 0.1)' }}
      >
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-amber-200/40 text-xs font-mono">{config.terminalTitle}</span>
      </div>
      <div className="p-4 font-mono text-sm space-y-1.5 min-h-[160px]">
        {lines.map((line, i) => {
          if (line == null) return null // 防御：跳过 undefined 行
          const isCommand = line.startsWith('$')
          const isOutput = line.startsWith('>')
          return (
            <div key={i} style={{ animation: 'fadeInUp 0.4s ease-out both' }}>
              {isCommand ? (
                <span className="text-amber-300">{line}</span>
              ) : isOutput ? (
                <span className="text-amber-100/70">{line}</span>
              ) : (
                <span className="text-white">{line}</span>
              )}
            </div>
          )
        })}
        <span
          className="inline-block w-2 h-4 bg-amber-300 align-middle"
          style={{ animation: 'blink 0.8s step-end infinite' }}
        />
      </div>
    </div>
  )
}

// ─── Main Hero Section ────────────────────────────────
function Hero() {
  const { displayText } = useTypeWriter(config.name, 150)
  const [hoveredTag, setHoveredTag] = useState<number | null>(null)
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null)

  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      <Background />
      <CharacterBackground />
      <Particles count={30} />
      <MouseGlow />
      <TopBar />
      <Marquee />

      {/* Decorative corner brackets */}
      <div className="absolute top-24 left-6 md:left-12 w-12 h-12 border-l-2 border-t-2 border-amber-500/40 z-10 pointer-events-none" />
      <div className="absolute top-24 right-6 md:right-12 w-12 h-12 border-r-2 border-t-2 border-amber-500/40 z-10 pointer-events-none" />
      <div className="absolute bottom-24 left-6 md:left-12 w-12 h-12 border-l-2 border-b-2 border-amber-500/40 z-10 pointer-events-none" />
      <div className="absolute bottom-24 right-6 md:right-12 w-12 h-12 border-r-2 border-b-2 border-amber-500/40 z-10 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-6 lg:py-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6 lg:gap-8 min-h-[calc(100vh-160px)]">

          {/* LEFT BLOCK */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 lg:pr-12">
            {/* Status row */}
            <div
              className="flex flex-wrap items-center gap-3"
              style={{ animation: 'slideInLeft 0.7s ease-out 0.3s both' }}
            >
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.22), rgba(245, 158, 11, 0.1))',
                  border: '1px solid rgba(251, 191, 36, 0.4)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full w-2 h-2 bg-amber-400" />
                </span>
                <span className="text-amber-200 text-xs font-medium tracking-wide">{config.statusText}</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300/70 text-xs font-mono">
                <span className="w-6 h-px bg-amber-400/50" />
                <span>{config.serialLabel}</span>
              </div>
            </div>

            {/* Name */}
            <div style={{ animation: 'slideInLeft 0.9s ease-out 0.5s both' }}>
              <div className="text-amber-300/80 text-sm md:text-base font-mono tracking-[0.3em] mb-2 uppercase">
                Hello, I'm
              </div>
              <h1 className="relative inline-block">
                <span
                  className="block text-[4.5rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[9rem] font-black leading-[0.85] tracking-tighter"
                  style={{
                    background: `linear-gradient(135deg, #fef3c7 0%, #fde68a 20%, #fbbf24 40%, ${config.theme.primary} 60%, ${config.theme.accent} 90%)`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: `drop-shadow(0 0 40px ${config.theme.primary}66)`,
                  }}
                >
                  {displayText}
                </span>
                <span
                  className="absolute -right-3 sm:-right-4 top-2 inline-block w-2 h-14 sm:h-20 md:h-24 lg:h-28 bg-amber-400"
                  style={{
                    animation: 'blink 0.7s step-end infinite',
                    boxShadow: '0 0 30px rgba(251, 191, 36, 0.9)',
                  }}
                />
              </h1>
            </div>

            {/* Tagline */}
            <div
              className="text-xl md:text-2xl text-white font-light italic tracking-wide"
              style={{ animation: 'slideInLeft 0.8s ease-out 0.7s both' }}
            >
              "{config.tagline}"
            </div>

            {/* Description */}
            <p
              className="text-amber-50/80 text-sm md:text-base leading-relaxed max-w-xl"
              style={{ animation: 'slideInLeft 0.8s ease-out 0.8s both' }}
            >
              {config.description}
            </p>

            {/* Tags */}
            <div
              className="flex flex-wrap gap-2"
              style={{ animation: 'slideInLeft 0.8s ease-out 0.9s both' }}
            >
              {config.tags.slice(0, 6).map((tag, i) => (
                <span
                  key={i}
                  onMouseEnter={() => setHoveredTag(i)}
                  onMouseLeave={() => setHoveredTag(null)}
                  className="relative px-3 py-1 rounded-full text-xs font-medium text-amber-100/90 cursor-default overflow-hidden"
                  style={{
                    background: hoveredTag === i ? 'rgba(251, 191, 36, 0.2)' : 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid ' + (hoveredTag === i ? 'rgba(251, 191, 36, 0.6)' : 'rgba(251, 191, 36, 0.2)'),
                    transform: hoveredTag === i ? 'translateY(-3px)' : 'translateY(0)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: hoveredTag === i ? '0 8px 20px rgba(251, 191, 36, 0.25)' : 'none',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="flex flex-wrap items-center gap-3"
              style={{ animation: 'slideInLeft 0.8s ease-out 1.0s both' }}
            >
              <a
                href={config.contactEmail}
                className="group relative px-6 py-3 text-white font-semibold rounded-xl overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${config.theme.primary} 0%, #ea580c 50%, ${config.theme.accent} 100%)`,
                  boxShadow: `0 12px 30px -8px ${config.theme.primary}99, inset 0 1px 0 rgba(255,255,255,0.2)`,
                }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', animation: 'shimmer 2s linear infinite' }}
                />
                <span className="relative z-10 flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Start a Project
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>

              <a
                href="#"
                className="px-6 py-3 text-sm font-semibold rounded-xl transition-all"
                style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(251, 191, 36, 0.35)',
                  color: '#fde68a',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </span>
              </a>
            </div>

            {/* Social row */}
            <div
              className="flex items-center gap-3"
              style={{ animation: 'slideInLeft 0.8s ease-out 1.1s both' }}
            >
              <span className="text-amber-300/70 text-[10px] uppercase tracking-[0.3em] font-mono">Find me</span>
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-amber-400/50 to-transparent" />
              <div className="flex gap-2">
                {config.socialLinks.map((link: SocialLink, i: number) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredSocial(i)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg transition-all"
                    style={{
                      background: hoveredSocial === i ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(245, 158, 11, 0.12))' : 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid ' + (hoveredSocial === i ? 'rgba(251, 191, 36, 0.65)' : 'rgba(251, 191, 36, 0.2)'),
                      color: '#fde68a',
                      transform: hoveredSocial === i ? 'translateY(-3px) scale(1.1)' : 'translateY(0) scale(1)',
                      boxShadow: hoveredSocial === i ? '0 8px 18px rgba(251, 191, 36, 0.35)' : 'none',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      backdropFilter: 'blur(8px)',
                    }}
                    aria-label={link.name}
                  >
                    {getSocialIcon(link.name)}
                  </a>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-3 max-w-md pt-2"
              style={{ animation: 'slideUp 0.7s ease-out 1.2s both' }}
            >
              {config.stats.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  color={stat.color}
                  delay={1.3 + i * 0.1}
                />
              ))}
            </div>
          </div>

          {/* RIGHT BLOCK */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div
              className="absolute bottom-0 right-0 z-20 w-full max-w-md"
              style={{ animation: 'slideUp 0.8s ease-out 1.4s both' }}
            >
              <TerminalCard />
            </div>
          </div>
        </div>

        {/* MOBILE TERMINAL */}
        <div className="lg:hidden mt-6 max-w-md mx-auto" style={{ animation: 'slideUp 0.8s ease-out 1.4s both' }}>
          <TerminalCard />
        </div>

        {/* BOTTOM ROW — Projects */}
        <div className="max-w-7xl mx-auto mt-8">
          <div
            className="flex items-center justify-between mb-3"
            style={{ animation: 'slideUp 0.7s ease-out 1.5s both' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <h2 className="text-white font-bold text-sm tracking-widest uppercase">Selected Work</h2>
              <span className="text-amber-300/50 text-xs font-mono">2024 — 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {config.projects.map((project, i) => (
              <div
                key={project.title}
                onClick={() => window.open(project.url, '_blank', 'noopener,noreferrer')}
                className="cursor-pointer"
              >
                <ProjectCard
                  title={project.title}
                  desc={project.desc}
                  tag={project.tag}
                  color={project.color}
                  delay={1.6 + i * 0.1}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ animation: 'fadeIn 1.5s ease-out 2s both' }}
      >
        <span className="text-amber-300/50 text-[10px] uppercase tracking-[0.4em] font-mono">Scroll</span>
        <div className="relative w-5 h-8 rounded-full border border-amber-400/50 flex items-start justify-center p-1">
          <span className="w-1 h-2 rounded-full bg-amber-300" style={{ animation: 'scrollDot 1.8s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  )
}

// ─── Error Boundary ────────────────────────────────────
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; errorMsg: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, errorMsg: '' }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMsg: error.message }
  }

  componentDidCatch(error: Error) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center space-y-4 px-6">
            <div className="text-6xl">⚠</div>
            <h2 className="text-amber-400 text-xl font-bold">页面遇到了一个小问题</h2>
            <p className="text-amber-100/60 text-sm max-w-md">
              {this.state.errorMsg || '未知错误'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, errorMsg: '' })
                window.location.reload()
              }}
              className="px-5 py-2 rounded-full text-sm font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #dc2626)',
              }}
            >
              刷新页面
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// ─── App ──────────────────────────────────────────────
function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Hero />
      </div>
    </ErrorBoundary>
  )
}

export default App
