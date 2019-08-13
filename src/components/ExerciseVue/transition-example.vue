<template>
  <div class="wrap">
    <button v-on:click="collapse = !collapse">点击</button>
    <default-transition v-bind:collapse="collapse"></default-transition>
  </div>
</template>

<script>
import DefaultTransition from './default-transition'
export default {
  name: 'transition-example',
  props: {

  },
  data () {
    return {
      collapse: false
    }
  },
  components: {
    DefaultTransition
  },
  methods: {

  }
}
</script>

<style type="text/less" lang="less" scoped>

</style>
