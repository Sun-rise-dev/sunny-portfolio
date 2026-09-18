/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* 交付档案：米白纸面 + 墨色正文 + 朱红强调 */
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
        /* 本地/系统栈：国内网络与离线可读，不依赖 Google Fonts */
        sans: [
          '"PingFang SC"',
          '"Microsoft YaHei"',
          '"Noto Sans SC"',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        serif: [
          '"Songti SC"',
          '"STSong"',
          '"Noto Serif SC"',
          'Georgia',
          'serif',
        ],
        mono: [
          '"Cascadia Code"',
          '"Sarasa Mono SC"',
          'Consolas',
          'ui-monospace',
          'monospace',
        ],
      },
      zIndex: {
        progress: '50',
        nav: '40',
        skip: '60',
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
