<template>
  <div class="wrap">
    <transition name="collapse" class="transitionDiv" v-bind:style="{ height: height }">这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长的内容这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长的内容这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长的内容这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长的内容这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长的内容这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长的内容这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长的内容这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长的内容这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长的内容这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长的内容
    </transition>
  </div>
</template>

<script>
export default {
  name: 'default-transition',
  props: {
    collapse: Boolean
  },
  data () {
    return {
      height: this.collapse ? '' : '20px'
    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style type="text/less" lang="less" scoped>
  .transitionDiv {
    width: 100px;
    margin: 10px auto;
    line-height: 20px;
  }

</style>
