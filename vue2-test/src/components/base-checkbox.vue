<template>
  <div>
    <input
      type="checkbox"
      v-on="listeners"
      v-bind="$attrs"
      :checked="checked"
    />
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    msg: {
      type: String,
      default: '',
    },
  },
  computed: {
    listeners: function () {
      return {
        ...this.$listeners,
        change: (event) => {
          this.$emit('change', event.target.checked)
        },
      }
    },
  },
}
</script>

<style scoped>
/* 样式可以根据需要添加 */
input[type='checkbox'] {
  cursor: pointer;
}
</style>
