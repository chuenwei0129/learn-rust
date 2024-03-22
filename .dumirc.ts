import { defineConfig } from 'dumi'

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'nautica',
    socialLinks: {
      github: 'https://github.com/chuenwei0129/nautica',
    },
  },
  apiParser: {
    parseOptions: {},
  },
  resolve: {
    atomDirs: [
      { type: 'component', dir: 'src/components' },
      { type: 'hook', dir: 'src/hooks' },
      { type: 'util', dir: 'src/utils' },
    ],
    // 配置入口文件路径，API 解析将从这里开始
    entryFile: './src/index.ts',
  },
})
