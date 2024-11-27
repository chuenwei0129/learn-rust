<template>
  <div>
    <comp-c></comp-c>
    <comp-d></comp-d>
  </div>
</template>
<script>
import compC from './C'
import compD from './D'

export default {
  name: 'v-b',
  components: {
    compC,
    compD,
  },
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="" scoped></style>
