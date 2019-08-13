<template>
  <div>
    <h1 slot="header">title</h1>
    <div slot="main">
      <p>主要内容1</p>
      <p>主要内容2</p>
    </div>
    <div slot="footer">
      <h2>这是尾部</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'juming-slot',
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
