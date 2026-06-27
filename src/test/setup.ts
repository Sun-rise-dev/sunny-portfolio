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
  // jsdom 未实现 scrollTo，路由切换时会调用
  window.scrollTo = vi.fn()
})
