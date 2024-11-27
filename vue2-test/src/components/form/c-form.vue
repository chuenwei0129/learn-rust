<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: 'c-form',
  provide() {
    return {
      form: this,
    }
  },
  props: {
    model: { type: Object },
    rules: { type: Object },
  },
  data() {
    return {
      fields: [],
    }
  },
  created() {
    console.log('form created')
  },
  mounted() {
    console.log('form mounted')
    console.log('🚀 ~ mounted ~ this.items:', this.items)
  },
  methods: {
    // 公开方法：全部重置数据
    resetFields() {
      this.fields.forEach((field) => {
        field.resetField()
      })
    },
    // 公开方法：全部校验数据，支持 Promise
    validate(callback) {
      return new Promise((resolve) => {
        let valid = true
        let count = 0
        this.fields.forEach((field) => {
          field.validate('', (errors) => {
            if (errors) {
              valid = false
            }
            if (++count === this.fields.length) {
              // 全部完成
              resolve(valid)
              if (typeof callback === 'function') {
                callback(valid)
              }
            }
          })
        })
      })
    },
  },
}
</script>
