<template>
  <div>
    <comp-b v-model="msg"></comp-b>
    <slot>default</slot>
    <hr />
    <slot name="other" :user="{ name: 'chu' }"></slot>
    <hr />
    <button @click="handleClick">click me</button>
    <hr />
    <base-checkbox
      @focus="onFocus"
      v-model="checked"
      v-on="$listeners"
      v-bind="$attrs"
      :msg.sync="msg"
    ></base-checkbox>
  </div>
</template>
<script>
import compB from './B'
import BaseCheckbox from './base-checkbox'
export default {
  name: 'v-a',
  components: {
    compB,
    BaseCheckbox,
  },
  inject: ['app'],
  mixins: [],
  props: {},
  data() {
    return {
      title: 'hello refs',
      msg: 'v-model',
      checked: true,
    }
  },
  computed: {},
  watch: {},
  mounted() {
    console.log('app: ', this.app.state)
    // vue 组件通信原理
    this.$on('v-event', (data) => {
      console.log('v-event: ', data)
    })

    setTimeout(() => {
      this.msg = 'hello msg'
    }, 3000)
  },
  methods: {
    sayHello() {
      window.alert('hello refs')
    },
    handleClick() {
      this.$emit('v-event', this.title)
    },
    onFocus() {
      console.log('hello world')
    },
  },
}
</script>
<style lang="" scoped></style>
