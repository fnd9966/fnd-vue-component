<template>
  <div class="mask_layout">
    <div class="mask_box">
      <div class="mask_top_box">
        添加模板
        <i class="del_icon" v-on:click="closeAddTemplate"></i>
      </div>
      <div class="mask_body">
        <div class="precaution">
          <span>注：标有(*)为必须填写内容,模板内容不能超过140个字,剩余：</span><i ref="RemainWords" style="color:red">{{remainLength}}</i>
        </div>
        <div class="template_main_box title_box">
          <div class="template_title">模板名称(<span style="color:red">*</span>)</div>
          <div class="template_content"><input type="text" class="input_title_content" v-model="templateTitle"></div>
        </div>
        <div class="template_main_box">
          <div class="template_title content_title">模板内容(<span style="color:red">*</span>)</div>
          <div class="template_content"><textarea name="" id="" ref="TemplateContent" class="content" v-on:input="inputContent" v-model="templateContent" maxlength="140"></textarea></div>
        </div>
        <div class="btn_box">
          <input type="button" value="保存" class="save_btn" v-on:click="saveTemplate">
        </div>
      </div>
    </div>
    <div class="mask_bg"></div>
  </div>
</template>

<script>
export default {
  name: 'mask-layer',
  props: {
    editTempTitle: {
      type: String,
      default: ''
    },
    editTempContent: {
      type: String,
      default: ''
    },
    editTempId: Number,
    editTemp: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      remainLength: 140, // 剩余模板内容长度
      templateContent: '', // 模板内容初始值
      templateTitle: '', // 模板名称初始值
      isAdd: true // 添加/编辑，默认添加
    }
  },
  components: {

  },
  mounted () {
    this.initData()
  },
  methods: {
    // 初始化
    initData: function () {
      this.templateTitle = this.$props.editTempTitle
      this.templateContent = this.$props.editTempContent
      this.inputContent()
      if (this.$props.editTemp) {
        this.isAdd = false
      } else {
        this.isAdd = true
      }
    },
    // 关闭添加模板
    closeAddTemplate: function () {
      this.$emit('listenCloseAddTemp', false)
    },
    // 监听模板内容的剩余长度
    inputContent: function () {
      let contentLength = this.templateContent.length
      this.remainLength = 140 - contentLength
    },
    // 保存
    saveTemplate: function () {
      let titleLength = this.templateTitle.length
      let contentLength = this.templateContent.length
      let that = this
      if (titleLength === 0 && contentLength === 0) {
        alert('模板名称和模板内容不能为空')
      } else if (titleLength === 0) {
        alert('模板名称不能为空')
      } else if (contentLength === 0) {
        alert('模板内容不能为空')
      } else {
        if (this.isAdd) {
          this.$ajax.get('http://218.28.17.163:58080/EXT_DLEHXXFW/AjaxHandler/WarnCorrelationHandler.ashx?r=' + Math.random() + '&TYPE=InsertTemplate&TEMPNAME=' + this.templateTitle + '&MODCONTENT=' + this.templateContent + '&TEMPTYPE=10&token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJjbGllbnRJZFwiOlwiZGVmYXVsdFwiLFwibG9naW5UaW1lXCI6MTU2MjMxMzA1NzAxNCxcInVzSWRcIjo1Mzg5LFwidXNlclJvbGVcIjpcIkFETUlOXCIsXCJ1dUlkXCI6XCJhZjY4MTRjZmU0ZmM0YjI5ODg1NDc3NDdlYzVhYzdiMFwifSIsImlzcyI6ImF1dGgwIiwiZXhwIjoxODc3NjczMDU3LCJpYXQiOjE1NjIzMTMwNTd9.gfL-o3ryolQ3ObK6fSAyT9_JVdaGqbM4-pUHCfFcjDE&sysFlag=SHJ')
            .then(function (data) {
              if (data.data === 1) {
                alert('添加模板成功')
                that.$emit('listenCloseAddTemp', false)
              } else {
                alert('添加模板失败')
              }
            })
        } else {
          this.$ajax.get('http://218.28.17.163:58080/EXT_DLEHXXFW/AjaxHandler/WarnCorrelationHandler.ashx?r=' + Math.random() + '&TYPE=UpdateTemplate&TEMPNAME=' + this.templateTitle + '&MODCONTENT=' + this.templateContent + '&TEMPTYPE=10&token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJjbGllbnRJZFwiOlwiZGVmYXVsdFwiLFwibG9naW5UaW1lXCI6MTU2MjMxMzA1NzAxNCxcInVzSWRcIjo1Mzg5LFwidXNlclJvbGVcIjpcIkFETUlOXCIsXCJ1dUlkXCI6XCJhZjY4MTRjZmU0ZmM0YjI5ODg1NDc3NDdlYzVhYzdiMFwifSIsImlzcyI6ImF1dGgwIiwiZXhwIjoxODc3NjczMDU3LCJpYXQiOjE1NjIzMTMwNTd9.gfL-o3ryolQ3ObK6fSAyT9_JVdaGqbM4-pUHCfFcjDE&sysFlag=SHJ&ID=' + this.$props.editTempId)
            .then(function (data) {
              if (data.data === 1) {
                alert('修改模板成功')
                that.$emit('listenCloseAddTemp', false)
              } else {
                alert('修改模板失败')
              }
            })
        }
      }
    }
  },
  watch: {
    editTempTitle: function (value) {
      this.templateTitle = value
    },
    editTempContent: function (value) {
      this.templateContent = value
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
@import "./MaskLayout";
</style>
