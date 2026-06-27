/**
 * 首页动态背景 — 渐变网格、人物图 3D 倾斜、粒子与鼠标光晕
 */
import { useState, useEffect, useRef, useMemo } from 'react'
import config from '../config'
import { useMousePosition } from '../hooks'

/** 底层渐变 + 网格 + 扫描线 */
export function BackgroundLayer() {
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
        {[
          { top: '-180px', right: '-100px', size: '700px', glow: config.theme.warmGlow, delay: '0s', dur: '8s' },
          { bottom: '-200px', left: '-150px', size: '700px', glow: 'rgba(245, 158, 11, 0.15)', delay: '2s', dur: '10s' },
          { top: '30%', left: '20%', size: '500px', glow: config.theme.coolGlow, delay: '4s', dur: '12s' },
          { top: '60%', right: '30%', size: '400px', glow: 'rgba(168, 85, 247, 0.08)', delay: '6s', dur: '14s' },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              ...(b.top ? { top: b.top } : { bottom: b.bottom }),
              ...(b.left ? { left: b.left } : { right: b.right }),
              width: b.size, height: b.size,
              background: `radial-gradient(circle, ${b.glow} 0%, transparent 70%)`,
              filter: 'blur(60px)',
              animation: `pulseGlow ${b.dur} ease-in-out ${b.delay} infinite`,
            }}
          />
        ))}
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
    </>
  )
}

/** 人物背景图 + 鼠标视差倾斜 */
export function CharacterBackground() {
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
      style={{ zIndex: 2, perspective: '1000px', animation: 'floatCharacter 7s ease-in-out infinite' }}
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
        className="absolute inset-y-0 left-0 w-2/3 pointer-events-none hidden md:block"
        style={{
          background: 'linear-gradient(90deg, rgba(10, 5, 0, 0.85) 0%, rgba(10, 5, 0, 0.55) 35%, rgba(10, 5, 0, 0.15) 60%, transparent 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(0deg, rgba(10, 5, 0, 0.95) 0%, rgba(10, 5, 0, 0.5) 50%, transparent 100%)' }}
      />
    </div>
  )
}

/** 上升粒子动效 — 用确定性伪随机避免 render 中 Math.random */
export function Particles({ count = 30 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: ((i * 17 + 23) % 100),
        delay: ((i * 13) % 80) / 10,
        duration: 8 + ((i * 7) % 10),
        size: 1.5 + ((i * 11) % 40) / 10,
        opacity: 0.2 + ((i * 19) % 50) / 100,
      })),
    [count]
  )
  const colors = ['#fbbf24', '#f97316', '#ef4444', '#fde68a']
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
            background: colors[p.id % 4],
            animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

/** 鼠标跟随暖色光晕（桌面端） */
export function MouseGlow() {
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

/** 首页完整背景组合 */
export default function Background() {
  return (
    <>
      <BackgroundLayer />
      <CharacterBackground />
      <Particles count={30} />
      <MouseGlow />
    </>
  )
}
