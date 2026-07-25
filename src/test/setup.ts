/**
 * Vitest 全局 setup — 扩展 jest-dom 匹配器
 */
import '@testing-library/jest-dom/vitest'
import { beforeAll, vi } from 'vitest'

/** 模拟 IntersectionObserver，供 Counter 等组件测试触发进入视口 */
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin: string = ''
  readonly scrollMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []

  constructor(private callback: IntersectionObserverCallback) {}

  observe(target: Element) {
    this.callback([{ isIntersecting: true, target } as IntersectionObserverEntry], this)
  }

  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

beforeAll(() => {
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    cb(performance.now() + 2000)
    return 1
  })
  vi.stubGlobal('cancelAnimationFrame', () => {})
  // jsdom 未实现 scrollTo / scrollIntoView / matchMedia，路由与锚点导航会调用
  window.scrollTo = vi.fn()
  Element.prototype.scrollIntoView = vi.fn()
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
  // jsdom 的 canvas.getContext 会打印 Not implemented 警告，静默为返回 null（组件按无 2D 环境退出）
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(null) as never
})
