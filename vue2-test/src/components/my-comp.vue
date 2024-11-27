<template>
  <div>
    <my-comp :count="count + 1" v-if="count < 5"></my-comp>
    {{ count }}
  </div>
</template>
<script>
export default {
  name: 'my-comp',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
}
</script>
