<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="input-first">
        <div class="input-name">企业名称:</div>
        <div>
          <el-input v-model="company.name" placeholder="请输入企业名称"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="msg">{{nameMsg}}</div>
      <div class="input">
        <div class="input-name">电话:</div>
        <div>
          <el-input v-model="company.tel" placeholder="请输入电话"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="msg">{{mobileMsg}}</div>
      <div class="input">
        <div class="input-name">邮箱:</div>
        <div>
          <el-input v-model="company.email" placeholder="请输入邮箱"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="msg">{{emailMsg}}</div>
      <div class="input">
        <div class="input-name">地址:</div>
        <div>
          <el-input v-model="company.address" placeholder="请输入地址"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="msg">{{addressMsg}}</div>
      <div class="input-last">
        <div class="input-name">企业简介:</div>
        <div>
          <el-input v-model="company.remark" placeholder="暂无简介" type="textarea" :autosize="{ minRows: 2}"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="button">
          <el-button type="primary" @click="closeCompanyInfo">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "company_info_model",
  data(){
    return{
      company: {},
      nameMsg: '',
      nameFlag: true,
      mobileMsg: '',
      mobileFlag: true,
      emailMsg: '',
      emailFlag: true,
      usernameMsg: '',
      usernameFlag: true,
      addressMsg: '',
      addressFlag: true,
    }
  },
  methods:{
    closeCompanyInfo(){
      this.$emit("closeCompanyInfoModel")
      this.clearData()
    },
    clearData(){
      this.company = {}
    },
  }
}
</script>

<style src="../../assets/css/company_info_model.css" scoped/>
