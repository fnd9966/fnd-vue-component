<template>
  <div class="template_layout">
    <div class="template_top_box">
      <i class="template_top_icon"></i>
      <span class="template_title">消息模板</span>
      <i class="add_template_icon" v-on:click="showAddTemplate"></i>
    </div>
    <div class="template_body">
      <div class="template_one_box" v-bind:class="{limitHeight: isLimitHeight !== index}" v-for="(item, index) in templateData" :key="index">
        <div class="mod_top_box">
          <span class="mod_title" v-on:click="modClick(index)">{{item.MODNM}}</span>
          <i class="mod_del_icon mod_icon" title="删除" v-on:click="delTemplate(item.RID)"></i>
          <i class="mod_edit_icon mod_icon" title="编辑" v-on:click="editTemplate(item.MODNM, item.MODCONTENT, item.RID)"></i>
        </div>
        <div class="mod_content" v-on:click="addContent(item.MODCONTENT)">{{item.MODCONTENT}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'send-template',
  props: {
    modList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      templateData: [],
      isLimitHeight: ''
    }
  },
  mounted () {
    this.initTemplate()
  },
  components: {

  },
  methods: {
    // 初始化模板
    initTemplate: function () {
      this.templateData = this.$props.modList
    },
    modClick: function (index) {
      if (this.isLimitHeight === index) {
        this.isLimitHeight = ''
      } else {
        this.isLimitHeight = index
      }
    },
    showAddTemplate: function () {
      this.$emit('listenIsShowAddTemp', true, true)
    },
    // 删除模板
    delTemplate: function (id) {
      let that = this
      if (confirm('是否删除模板?')) {
        this.$ajax.get('http://218.28.17.163:58080/EXT_DLEHXXFW/AjaxHandler/WarnCorrelationHandler.ashx?TYPE=DelTemplate&ID=' + id + '&token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJjbGllbnRJZFwiOlwiZGVmYXVsdFwiLFwibG9naW5UaW1lXCI6MTU2MjMxMzA1NzAxNCxcInVzSWRcIjo1Mzg5LFwidXNlclJvbGVcIjpcIkFETUlOXCIsXCJ1dUlkXCI6XCJhZjY4MTRjZmU0ZmM0YjI5ODg1NDc3NDdlYzVhYzdiMFwifSIsImlzcyI6ImF1dGgwIiwiZXhwIjoxODc3NjczMDU3LCJpYXQiOjE1NjIzMTMwNTd9.gfL-o3ryolQ3ObK6fSAyT9_JVdaGqbM4-pUHCfFcjDE&sysFlag=SHJ')
          .then(function (data) {
            if (data.data === 1) {
              alert('删除模板成功')
              that.$emit('listenDelTemplate')
            } else {
              alert('删除模板失败')
            }
          })
      } else {
        return false
      }
    },
    // 编辑模板
    editTemplate: function (title, content, id) {
      this.$emit('listenIsShowAddTemp', true, false, title, content, id)
    },
    // 添加短信内容
    addContent: function (content) {
      this.$emit('listenAddContent', content)
    }
  },
  watch: {
    modList: function (value) {
      this.templateData = value
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
  @import "./SendTemplate";
</style>
