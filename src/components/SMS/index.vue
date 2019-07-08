<template>
  <div class="sms_layout" v-bind:style="{backgroundColor: conf.bgColor, color: conf.fontColor}">
    <receiver :d="d" v-on:seletedData="handleSeletedData" v-bind:btnColor="conf.btnColor" v-bind:boxColor="conf.boxColor" v-bind:style="{width: commonWidth + 'px'}"></receiver>
    <sms-content v-on:handleShowDetail="handleShowDetail" v-bind:sData="sData" v-bind:btnColor="conf.btnColor" v-bind:boxColor="conf.boxColor"
    v-bind:typeConf="conf.type" v-on:resetData="resetData" v-bind:commonMargin="commonMargin" v-bind:commonWidth="commonWidth" v-bind:tempContent="tempContent" v-bind:isShowTemplate="isShowTemplate"></sms-content>
    <send-template v-if="isShowTemplate" v-bind:style="{width: commonWidth + 'px'}" v-bind:modList="modList" v-on:listenIsShowAddTemp="showAddTemplate" v-on:listenDelTemplate="refreshMod" v-on:listenAddContent="addContent"></send-template>
    <mask-layer v-if="isShowAddTemplate" v-on:listenCloseAddTemp="closeAddTemplate" v-bind:editTempTitle="editTempTitle" v-bind:editTempContent="editTempContent" v-bind:editTemp="editTemp" v-bind:editTempId="editTempId"></mask-layer>
  </div>
</template>

<script>
import Receiver from './Receiver'
import SmsContent from './Content'
import SendTemplate from './SendTemplate'
import MaskLayer from './MaskLayer'
import h from '@/utils/common.js'
export default {
  name: 'SMS',
  props: {
    sConfig: {
      type: Object,
      default: () => ({
        bgColor: '#ffffff',
        boxColor: '#ffffff',
        btnColor: '#65a4d8',
        fontColor: '#000000',
        listColor: '#17a8dc'
      })
    }
  },
  data () {
    return {
      d: [], /* 拷贝数组 */
      initialData: [], /* 原始数组 */
      sData: [], /* 选中的数据 */
      isShowDetail: false,
      conf: this.sConfig,
      isShowTemplate: true, // 是否显示模板功能
      commonWidth: 300, // 左右通用宽度
      commonMargin: 15, // 内容左右margin
      modList: [], // 模板数据
      tempContent: '', // 消息内容
      isShowAddTemplate: false, // 添加模板是否显示,
      editTempTitle: '', // 编辑模板名称
      editTempContent: '', // 编辑模板内容
      editTempId: 0, // 模板id
      editTemp: false // true：编辑模板，默认是添加模板
    }
  },
  mounted () {
    this.refreshMod()
    this.$ajax.get('http://192.168.118.226:50027/WebApi/api/v1.1/basic/data?key=js_s_eventtype&departid=1')
      .then(ret => {
        this.initialData = ret.data.data
        this.d = h.newSpace(this.initialData)
        this.int++
      })
      .catch(ret => console.log(ret))
    /* this.$ajax.post('http://192.168.118.226:50053/Warn/AjaxHandler/DataHandler.ashx?flag=GetRulePersonTree&EnuvalFK=6&BusinessCode=10')
      .then(ret => {
        this.d = ret.data.data
        this.int++
      })
      .catch(ret => console.log(ret)) */
  },
  components: {
    Receiver,
    SmsContent,
    SendTemplate,
    MaskLayer
  },
  methods: {
    /* 重置 */
    resetData: function () {
      this.d = h.newSpace(this.initialData)
      this.int++
    },
    handleSeletedData: function (data) {
      this.sData = data
    },
    handleShowDetail: function (bol) {
      this.isShowDetail = bol
    },
    handleClose: function (bol) {
      this.isShowDetail = bol
    },
    // 获取模板
    refreshMod: function () {
      let that = this
      this.$ajax({
        url: 'http://218.28.17.163:58080/EXT_DLEHXXFW/AjaxHandler/WarnCorrelationHandler.ashx',
        method: 'post',
        data: {
          TYPE: 'GetMoulds',
          TMEPTYPE: 10,
          token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJjbGllbnRJZFwiOlwiZGVmYXVsdFwiLFwibG9naW5UaW1lXCI6MTU2MjMxMzA1NzAxNCxcInVzSWRcIjo1Mzg5LFwidXNlclJvbGVcIjpcIkFETUlOXCIsXCJ1dUlkXCI6XCJhZjY4MTRjZmU0ZmM0YjI5ODg1NDc3NDdlYzVhYzdiMFwifSIsImlzcyI6ImF1dGgwIiwiZXhwIjoxODc3NjczMDU3LCJpYXQiOjE1NjIzMTMwNTd9.gfL-o3ryolQ3ObK6fSAyT9_JVdaGqbM4-pUHCfFcjDE',
          sysFlag: 'SHJ'
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let i in data) {
            ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (ret) {
        that.modList = ret.data
        // console.log(ret)
        // console.log(that.modList)
      })
    },
    // 监听是否展示添加模板 isShow: 是否展开 isAdd: 添加/编辑, title: 编辑情况下模板名称, content: 编辑情况下模板内容
    showAddTemplate: function (isShow, isAdd, title, content, id) {
      this.isShowAddTemplate = isShow
      if (!isAdd) {
        this.editTempTitle = title
        this.editTempContent = content
        this.editTempId = id
        this.editTemp = true
      } else {
        this.editTempTitle = ''
        this.editTempContent = ''
        this.editTempId = 0
        this.editTemp = false
      }
    },
    // 监听关闭添加模板
    closeAddTemplate: function (isShow) {
      this.refreshMod()
      this.isShowAddTemplate = isShow
    },
    // 监听模板点击后添加到消息内容里
    addContent: function (content) {
      this.tempContent = content
    }

  },
  watch: {
    sConfig: function (val) {
      this.conf = val
    }
  },
  computed: {
  }
}
</script>

<style type="text/less" lang="less" scoped>
.isSelect(@st) { user-select:@st; -ms-user-select:@st; -moz-user-select:@st; -webkit-user-select:@st; }
@padding: 10px;
.sms_layout {
  font-family: "宋体";
  // width: 100%;
  height: 100%;
  .isSelect(none);
  width: calc(100% - 2 * @padding);
  height: calc(100% - 2 * @padding);
  // padding: 5px 10px 10px 10px;
  padding: @padding;
  // background-color: #4781a0;
  overflow: hidden;
  clear: both;
  // color: #fff;
}
</style>
