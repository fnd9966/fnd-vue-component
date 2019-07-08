<template>
  <div class="boxing">
    <SMS v-bind:sConfig="config"></SMS>
    <!-- <MaskLayer></MaskLayer> -->
  </div>
</template>

<script>
import SMS from '@/components/SMS/index'
// import MaskLayer from '@/components/SMS/MaskLayer'
export default {
  props: {

  },
  data () {
    return {
      config: {
        bgColor: '#4781a0',
        btnColor: '#65a4d8',
        fontColor: '#000000',
        listColor: '#17a8dc',
        boxColor: '#ffffff',
        type: [{
          name: 'phone',
          text: '手机号码',
          placeText: '可以手动输入手机号码直接发送消息内容，多个手机号以分号分隔！'
        }, {
          name: 'chuanzhen',
          text: '传真',
          placeText: 'test1'
        }, {
          name: 'test',
          text: '测试',
          placeText: 'texst1'
        }, {
          name: 'test1',
          text: '测试1',
          placeText: 'test22'
        }]
      }
    }
  },
  components: {
    SMS
    // MaskLayer
  },
  methods: {

  }
}
</script>

<style type="text/less" lang="less" scoped>
.boxing {
  width: calc(100% - 100px);
  height: 750px;
  margin: 10px auto;
  border: 1px solid #f00;
}
</style>
