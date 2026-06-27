/**
 * Counter 组件测试 — 进入视口后从 0 计数到目标值
 */
import { render, screen, waitFor } from '@testing-library/react'
import { Counter } from './ui'

describe('Counter', () => {
  it('进入视口后计数到目标值', async () => {
    render(<Counter target={150} suffix="%" prefix="+" />)
    await waitFor(() => {
      expect(screen.getByText('+150%')).toBeInTheDocument()
    })
  })
})
