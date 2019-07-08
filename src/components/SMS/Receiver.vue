<template>
  <div class="receiver_layout" v-bind:style="{width: commonWidth + 'px'}">
    <div class="receiver_top_box">
      <i class="receiver_user_icon"></i>
      <span class="receiver_user">接收人</span>
      <!-- <input type="text" class="receiver_input" v-model="receiverName" v-on:keyup.enter="receiverSearch"> -->
      <!-- <div class="search_box" v-on:click="receiverSearch" v-bind:style="{backgroundColor: btnColor}">
        <img src="@/assets/message/search.png" alt="">
      </div>
      <div :class="[search_box, {show: hasShow}]" v-on:click="backHidden" v-bind:style="{backgroundColor: btnColor}">
        <img src="@/assets/message/back.png" alt="">
      </div> -->
    </div>
    <div class="receiver_body" v-bind:style="{backgroundColor: boxColor}">
      <div class="nd_input" v-on:mouseover="inputMouseOver" v-on:mouseleave="inputMouseLeave">
          <input type="text" class="receiver_input" v-model="receiverName" v-on:keyup.enter="receiverSearch" v-on:input="inputText">
          <i class="nd_input__icon"></i>
          <i v-if="isShowDelBtn" class="nd_input__icon_del" v-on:click="delText"></i>
      </div>
      <div class="ztree_box">
        <ztree :clickEvent="clickEvent" :selectEvent="selectEvent" :d="tempData" :int="int" select="true" />
      </div>
    </div>
  </div>
</template>

<script>
import AdapterFilter from '@/utils/Adapter_filter' // 模糊检索
export default {
  name: 'Receiver',
  props: {
    commonWidth: Number,
    d: {
      type: Array,
      default: () => []
    },
    btnColor: String,
    boxColor: String
  },
  data () {
    return {
      tempData: [],
      int: 0,
      receiverName: '',
      hasShow: true,
      search_box: 'search_box',
      isShowDelBtn: false
    }
  },
  components: {

  },
  mounted () {
    // this.tempData = this.$props.d
    this.initData()
  },
  methods: {
    /* 初始化ztree的值 */
    initData: function () {
      this.tempData = this.$props.d
    },
    /* 点击树结构 */
    clickEvent: function (v) {
      console.log(v)
    },
    /* 选择树结构 */
    selectEvent: function (v) {
      // console.log(v)
      this.$emit('seletedData', v)
    },
    /* 鼠标移到input事件 */
    inputMouseOver: function () {
      if (this.receiverName.length > 0) {
        this.isShowDelBtn = true
      } else {
        this.isShowDelBtn = false
      }
    },
    /* 鼠标移除input事件 */
    inputMouseLeave: function () {
      this.isShowDelBtn = false
    },
    /* 搜索框输入监听事件 */
    inputText: function () {
      if (this.receiverName.length > 0) {
        this.isShowDelBtn = true
      } else {
        this.isShowDelBtn = false
      }
    },
    /* 搜索框中的删除按钮事件 */
    delText: function () {
      this.receiverName = ''
      this.initData()
      this.int++
      this.hasShow = true
    },
    /* 搜索框确定 */
    receiverSearch: function (params) {
      // console.log(this.receiverName)
      let text = this.receiverName
      if (text.length > 0) {
        this.tempData = AdapterFilter.dataSourceByStrFilter(this.tempData, 'name', text)
        this.int++
        this.hasShow = false
      } else {
        this.initData()
        this.int++
        this.hasShow = true
      }
      // console.log(this.tempData)
      // console.log(result)
    },
    /* 返回点击消失 */
    backHidden: function (params) {
      this.hasShow = true
      this.tempData = this.$props.d
      this.int++
    },
    /* 筛选数组 */
    filterArray: function (name) {
      this.tempData = this.tempData.filter(function (item) {
        return item.name.indexOf(name) > -1
      })
      this.int++
    }
  },
  watch: {
    d: function (value) {
      this.tempData = value
      this.int++
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
@import "./Receiver";
</style>
