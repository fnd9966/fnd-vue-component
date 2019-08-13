<template>
  <div style="border: 1px solid skyblue; margin: 10px">
    <span>子组件</span>
    <slot>默认slot内容</slot>
  </div>
</template>

<script>
export default {
  name: 'simple-slot',
  props: {

  },
  data () {
    return {

    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style type="text/less" lang="less" scoped>

</style>
