import { defineConfig } from 'dumi'

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'favor-ui',
    socialLinks: {
      github: 'https://github.com/umijs/dumi',
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
