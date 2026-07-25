import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initSmoothScroll } from './smooth-scroll'

// Lenis 惯性平滑滚动（reduced-motion 用户自动回退原生滚动）
initSmoothScroll()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
