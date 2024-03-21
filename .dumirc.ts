import { defineConfig } from 'dumi'

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'nautica',
    socialLinks: {
      github: 'https://github.com/chuenwei0129/nautica',
    },
  },
  resolve: {
    atomDirs: [
      { type: 'component', dir: 'src/components' },
      { type: 'hook', dir: 'src/hooks' },
      { type: 'util', dir: 'src/utils' },
    ],
  },
})
