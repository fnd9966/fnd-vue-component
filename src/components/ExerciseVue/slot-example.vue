<template>
  <div>
    <span>父组件</span>
    <juming-slot></juming-slot>
  </div>
</template>

<script>
import SimpleSlot from './simple-slot' // 简单slot
import ButtonSlot from './button-slot' // 默认slot
import JumingSlot from './juming-slot' // 具名slot
export default {
  name: 'slot-example',
  props: {

  },
  data () {
    return {

    }
  },
  components: {
    SimpleSlot,
    ButtonSlot,
    JumingSlot
  },
  methods: {

  }
}
</script>

<style type="text/less" lang="less" scoped>

</style>
