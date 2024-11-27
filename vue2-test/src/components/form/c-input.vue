<template>
  <input
    type="text"
    :value="currentValue"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>
<script>
export default {
  name: 'c-input',
  inject: ['formItem'],
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentValue: this.value,
    }
  },
  watch: {
    value(newVal) {
      this.currentValue = newVal
    },
  },
  methods: {
    handleInput(e) {
      this.currentValue = e.target.value
      this.$emit('input', this.currentValue)
      this.formItem.onFieldChange(this.currentValue)
    },
    handleBlur() {
      this.formItem.onFieldBlur(this.currentValue)
    },
  },
}
</script>
<style lang="" scoped></style>
