/**
 * 自定义 Hooks — 从 App.tsx 抽离，供首页动效与各页面复用
 */
import { useState, useEffect } from 'react'

/** 打字机效果：逐字显示文本 */
export function useTypeWriter(text: string, speed: number = 100) {
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

/** 跟踪鼠标位置，用于背景 3D 倾斜与光晕 */
export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])
  return pos
}

/** 顶部时钟显示（CST） */
export function useClock() {
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

/** 页面滚动进度 0–100，用于 TopBar 进度条 */
export function useScrollProgress() {
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
