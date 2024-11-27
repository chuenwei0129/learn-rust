<template>
  <div>
    <comp-a ref="$compA">
      <template #default></template>
      <template #other="{ user: { name } }">{{ name }}</template>
    </comp-a>
    <my-comp></my-comp>
    <hr />
    <next-tick></next-tick>
    <hr />
    <div>
      <h2>form demo</h2>
      <form-demo></form-demo>
    </div>
    <div>
      <h2>alert demo</h2>
      <button type="button" @click="handleShowA">show alert A</button>
      <button type="button" @click="handleShowB">show alert B</button>
    </div>
  </div>
</template>
<script>
import compA from './components/A'
import FormDemo from './components/form-demo'
import MyComp from './components/my-comp'
import NextTick from './components/next-tick'

export default {
  name: 'v-app',
  components: {
    compA,
    FormDemo,
    MyComp,
    NextTick,
  },
  provide() {
    return {
      app: this,
    }
  },
  mixins: [],
  props: {},
  data() {
    return {
      state: 'app state',
      message: '',
    }
  },
  computed: {},
  watch: {},
  mounted() {
    // 组件 A
    const $compA = this.$refs.$compA
    console.log('🚀 ~ mounted ~ $compA:', $compA)
  },
  methods: {
    handleShowA() {
      this.$Alert.info({
        content: '这是一条提示信息 A',
      })
    },
    handleShowB() {
      this.$Alert.info({
        content: '这是一条提示信息 B',
        duration: 3, // 持续时间，单位秒，默认 1.5 秒，到时间自动消失。
      })
    },
  },
}
</script>
<style lang="" scoped></style>
