// 假如我们的文件名为：build.js
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

const init = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`

postcss([tailwindcss])
  .process(init)
  .then((res) => {
    console.log(res.css)
  })
