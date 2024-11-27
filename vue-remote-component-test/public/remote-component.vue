<template>
  <p>我是远程组件</p>
  <p>
    当前远程组件 count 值为：<span class="count">{{ count }}</span>
  </p>
  <button @click="count++">点击增加远程组件 count 值</button>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<style scoped>
.count {
  color: red;
}
</style>
