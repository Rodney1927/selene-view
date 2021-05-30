<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="input-first">
        <div class="input-name">企业名称:</div>
        <div>
          <el-input v-model="company.name" placeholder="请输入企业名称"
                    style="width: 260px" @input="validName"></el-input>
        </div>
      </div>
      <div class="msg">{{nameMsg}}</div>
      <div class="input">
        <div class="input-name">账号:</div>
        <div>
          <el-input v-model="company.username" placeholder="请输入账号"
                    style="width: 260px" @input="validUsername"></el-input>
        </div>
      </div>
      <div class="msg">{{usernameMsg}}</div>
      <div class="input">
        <div class="input-name">电话:</div>
        <div>
          <el-input v-model="company.tel" placeholder="请输入电话"
                    style="width: 260px" @input="validMobile"></el-input>
        </div>
      </div>
      <div class="msg">{{mobileMsg}}</div>
      <div class="input">
        <div class="input-name">邮箱:</div>
        <div>
          <el-input v-model="company.email" placeholder="请输入邮箱"
                    style="width: 260px" @input="validEmail"></el-input>
        </div>
      </div>
      <div class="msg">{{emailMsg}}</div>
      <div class="input">
        <div class="input-name">地址:</div>
        <div>
          <el-input v-model="company.address" placeholder="请输入地址"
                    style="width: 260px" @input="validAddress"></el-input>
        </div>
      </div>
      <div class="msg">{{addressMsg}}</div>
      <div class="input-last">
        <div class="input-name">企业简介:</div>
        <div>
          <el-input v-model="company.remark" placeholder="请输入企业简介" type="textarea" :autosize="{ minRows: 2}"
                    style="width: 260px" @input="validRemark"></el-input>
        </div>
      </div>
      <div class="button">
        <div class="button-left">
          <el-button type="primary" @click="closeUpdateCompany">关闭</el-button>
        </div>
        <div class="button-right">
          <el-button type="success" @click="updateCompany" :disabled="updateCompanyButtonFlag">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isEmail, isMobile, isUsername} from "@/common/util/validate";

export default {
name: "update_company_model",
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
      updateCompanyButtonFlag: false,
    }
  },
  methods:{
    closeUpdateCompany(){
      this.$emit("closeUpdateCompanyModel")
      this.clearData()
    },
    clearData(){
      this.company = {}
      this.nameMsg = ''
      this.nameFlag = true
      this.usernameMsg = ''
      this.usernameFlag =  true
      this.mobileMsg = ''
      this.mobileFlag = true
      this.emailMsg = ''
      this.emailFlag = true
      this.addressMsg = ''
      this.addressFlag = true
      this.updateCompanyButtonFlag = false
    },
    validFlag(){
      this.updateCompanyButtonFlag = !(this.nameFlag && this.mobileFlag && this.emailFlag && this.usernameFlag
          && this.addressFlag)
    },
    validRemark(){
      this.company.name = this.company.name.replace(/\s+/g,"")
    },
    validName(){
      this.company.name = this.company.name.replace(/\s+/g,"")
      if (this.company.name == ''){
        this.nameMsg = '企业名称不能为空'
        this.nameFlag = false
      }
      else {
        this.nameMsg = ''
        this.nameFlag = true
      }
      this.validFlag()
    },
    validMobile(){
      if (!isMobile(this.company.tel)){
        this.mobileMsg = '电话格式不正确'
        this.mobileFlag = false
      }
      else {
        this.mobileMsg = ''
        this.mobileFlag = true
      }
      this.validFlag()
    },
    validUsername(){
      if (!isUsername(this.company.username)){
        this.usernameMsg = '账号长度6-12位，英文开头可包含数字英文下划线'
        this.usernameFlag = false
      }
      else {
        this.usernameMsg = ''
        this.usernameFlag = true
      }
      this.validFlag()
    },
    validEmail(){
      if (!isEmail(this.company.email)){
        this.emailMsg = '邮箱格式不正确'
        this.emailFlag = false
      }
      else {
        this.emailMsg = ''
        this.emailFlag = true
      }
      this.validFlag()
    },
    validAddress(){
      this.company.address = this.company.address.replace(/\s+/g,"")
      if (this.company.address == ''){
        this.addressMsg = '地址不能为空'
        this.addressFlag = false
      }
      else {
        this.addressMsg = ''
        this.addressFlag = true
      }
      this.validFlag()
    },
    updateStudent(){
      let p = new FormData()
      p.append('id',this.company.id)
      p.append('name',this.company.name)
      p.append('username',this.company.username)
      p.append('tel',this.company.tel)
      p.append('email',this.company.email)
      p.append('address',this.company.address)
      this.$axios({
        method : "POST",
        url: "/selene/company/update", //todo
        data: p
      }).then(res=>{
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.closeUpdateCompany()
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.$emit("updateRefresh")
      })
    },
  },
}
</script>

<style src="../../assets/css/update_company_model.css" scoped/>