/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* 亮色编辑排版风：米白纸面 + 墨色文字 + 朱红点睛 */
        paper: {
          DEFAULT: '#faf7f2',
          deep: '#f3ede1',
        },
        ink: {
          DEFAULT: '#221c15',
          soft: '#57503f',
          faint: '#8a8272',
        },
        vermilion: {
          DEFAULT: '#c2410c',
          deep: '#9a3409',
        },
        hairline: '#e6dfd2',
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Noto Serif SC"', 'Songti SC', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
