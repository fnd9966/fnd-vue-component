<template>
  <div>
    <el-radio v-model="radio" label='1' border>测试1</el-radio>
    <el-radio v-model="radio" label="2">测试1</el-radio>
  </div>
</template>

<script>
export default {
  name: 'el-fade',
  props: {

  },
  data () {
    return {
      radio: '2'
    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style>
  
</style>
