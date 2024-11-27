<script setup>
// 本地组件
import LocalComp from './local-component.vue'

console.log('🚀 ~ LocalComp:', LocalComp)

// 远程组件
import * as Vue from 'vue'
import { defineAsyncComponent } from 'vue'

import { loadModule } from 'vue3-sfc-loader'

const options = {
  moduleCache: {
    vue: Vue,
  },

  async getFile(url) {
    const res = await fetch(url)
    const code = await res.text()
    return code
  },

  addStyle(textContent) {
    const style = Object.assign(document.createElement('style'), {
      textContent,
    })
    const ref = document.head.getElementsByTagName('style')[0] || null
    document.head.insertBefore(style, ref)
  },
}

const RemoteComp = defineAsyncComponent(async () => {
  const comp = await loadModule(
    'http://localhost:8080/remote-component.vue',
    options
  )
  console.log('🚀 ~ RemoteComp: ', comp)
  return comp
})
</script>

<template>
  <div>
    <h2>本地组件</h2>
    <LocalComp />
    <h2>远程组件</h2>
    <RemoteComp />
  </div>
</template>
