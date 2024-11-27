/** @type {import('tailwindcss').Config} */
export default {
  // 修改下 content 配置，也就是从哪里提取 className
  // tailwind 会提取 className 之后按需生成最终的 css
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
