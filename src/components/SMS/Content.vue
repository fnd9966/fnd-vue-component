<template>
  <div class="content_layout" v-bind:style="{width: contentWidth, marginLeft: commonMargin + 'px', marginRight: !isShowTemplate ? '' : commonMargin + 'px'}">
    <div class="content_top_box">
      <i class="content_title_icon"></i>
      <span class="content_title">消息内容</span>
      <div class="remain_box">
        剩余字符：<span class="now_character">{{250 - remainChar.length}}</span>/250
      </div>
      <div class="user_selected_box">
        已选中：<span class="user_selected_num">{{this.selectedData.length}}</span>人
        <div class="user_detail" v-bind:style="{backgroundColor: btnColor}" v-on:mouseenter="hoverSelectPerson" v-on:mouseleave="outSelectPerson">
          <img src="@/assets/message/detail.png" alt="" v-on:click="selectdNum">
          <div class="user_detail_list" v-if="isShowDetail">
            <div class="name_tag">
              <span  v-for="item in selectedData" :key="item.id" class="tag" :title="item.identify">{{item.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content_body" v-bind:style="{backgroundColor: boxColor}">
      <div class="content_body_layout">
        <textarea class="content_text" name="" id="" maxlength="250" v-model="remainChar" v-on:input="handleAlertExceed" ref="contentText" placeholder="请输入消息内容..."></textarea>
        <div class="phone">
            <span v-for="(item, index) in typeConf" :key="index" :class="[tabs_item, {is_active: selected === index}]" v-on:click="handleChangeTab(index)">{{item.text}}</span>
        </div>
        <textarea v-for="(item, index) in typeConf" :key="index" :placeholder="item.placeText" :class="[phone_text, {is_active: selected === index}]" name="" id="" :ref="item.name"></textarea>
      </div>
    </div>
    <div class="btn_box">
      <a class="btn btn_left" v-on:click="send">发送</a>
      <a class="btn" v-on:click="reset">重置</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sms-content',
  props: {
    commonMargin: Number,
    commonWidth: Number,
    isShowTemplate: Boolean,
    sData: {
      type: Array,
      default: () => []
    },
    btnColor: String,
    boxColor: String,
    typeConf: {
      type: Array,
      default: () => [{
        name: 'phone',
        text: '手机号码',
        placeText: '可以手动输入手机号码直接发送消息内容，多个手机号以分号分隔！'
      }]
    },
    tempContent: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selected: 0,
      remainChar: '',
      selectedData: this.sData,
      isShowDetail: false,
      tabs_item: 'tabs_item',
      phone_text: 'phone_text'
    }
  },
  components: {

  },
  mounted () {
    this.initData()
  },
  methods: {
    initData: function () {
      this.remainChar = this.$props.tempContent
    },
    /* 切换tab事件 */
    handleChangeTab: function (idx) {
      // console.log(idx)
      this.selected = idx
    },
    /* 字数超过250字符提示 */
    handleAlertExceed: function () {
      // console.log(this.)
      // console.log(this.remainChar.length)
      if (this.remainChar.length > 250) {
        alert('字数已达到上限！')
      }
    },
    selectdNum: function (params) {
      // console.log('test')
      this.$emit('handleShowDetail', true)
    },
    hoverSelectPerson: function (params) {
      // this.selectedData.length > 0 && this.isShowDetail = true
      if (this.selectedData.length > 0) {
        this.isShowDetail = true
      }
    },
    outSelectPerson: function (params) {
      // console.log(222)
      this.isShowDetail = false
    },
    /* 验证 */
    checkForm: function () {
      let v = this.$refs.contentText.value
      // console.log(v)
      if (v === '' || v === '请输入消息内容...') {
        alert('消息内容不能为空！')
        return false
      } else if (this.checkPhone() === false) {
        return false
      }
      return true
    },
    /* 验证手机号 */
    checkPhone: function () {
      let reg = /^0?1[34578]\d{9}$/
      let v = this.$refs.contentPhone.value
      if (v === '' || v === '可以手动输入手机号码直接发送消息内容，多个手机号以分号分隔！') {
        return true
      }
      let noAlert = true
      v.split(';').map((item, index) => {
        // console.log(item)
        // console.log(typeof (item))
        if (!reg.test(item) && noAlert) {
          // alert('您输入的第' + (index + 1) + '个手机号码:[' + item + ']格式不正确！')
          alert(`您输入的第${index + 1}个手机号码[${item}]格式不正确`)
          noAlert = false
        }
      })
      return noAlert
    },
    /* 过滤字符串首末位空白 */
    trim: function (str) {
      str = str.replace(/^\s+/, '')
      str = str.replace(/\s+$/, '')
      return str
    },
    /* 清空重置 */
    reset: function () {
      // console.log('重置')
      // this.$refs.contentPhone.value = '' // 手动填写手机号码
      // this.$refs.contentText.value = '' // 短信内容
      this.selectedData = []
      let idx = this.selected
      let d = this.typeConf[idx].name
      // console.log(d[0])
      // console.log(this.$refs[d][0].value)
      // console.log(this.$refs.contentText.value)
      this.$refs[d][0].value = ''
      this.remainChar = ''
      this.$emit('resetData')
    },
    /* 发送 */
    send: function () {
      let strSql
      let idx = this.selected
      let d = this.typeConf[idx].name
      console.log(d)
      let v = this.$refs[d].value
      let msg = this.$refs.contentText.value
      if ((v === '' || v === '可以手动输入手机号码直接发送消息内容，多个手机号以分号分隔！') && this.selectedData.length === 0) {
        alert('接收人不能为空！')
        return false
      }
      if (this.selectedData.length > 0) {
        strSql = this.selectedData.map(item => {
          return item.id
        }) // 返回数组类型
        // console.log(strSql)
        strSql = strSql.join(',') // 转为字符串类型
        // console.log(strSql)
      }
      if (this.checkForm() === true) {
        let data = {
          UserID: strSql,
          Msg: msg
        }
        console.log(data)
      }
    }
  },
  watch: {
    sData: function (val) {
      this.selectedData = val
    },
    tempContent: function (val) {
      this.remainChar = val
    }
  },
  computed: {
    contentWidth: function () {
      return this.isShowTemplate ? 'calc(100% - (' + 2 * this.commonWidth + 'px + ' + 2 * this.commonMargin + 'px))' : 'calc(100% - (' + this.commonWidth + 'px + ' + this.commonMargin + 'px))'
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
@import "./Content";
</style>
