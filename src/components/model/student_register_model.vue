<template>
  <div class="modal-backdrop" >
    <div class="modal">
      <div class="register-line-first">
        <div class="register-name">{{'学号:'}}</div>
        <div class="register-right">
          <el-input v-model="registerAccount.username" placeholder="请输入学号" style="width: 260px" clearable
                    @input="validRegisterUsername"></el-input>
        </div>
      </div>
      <div class="register-msg">{{registerUsernameMsg}}</div>
      <div class="register-line">
        <div class="register-name">{{'密码:'}}</div>
        <div class="register-right">
          <el-input v-model="registerAccount.password" placeholder="请输入密码" style="width: 260px" clearable
                    @input="validRegisterPassword"></el-input>
        </div>
      </div>
      <div class="register-msg">{{registerPasswordMsg}}</div>
      <div class="register-line">
        <div class="register-name">{{'重复密码:'}}</div>
        <div class="register-right">
          <el-input v-model="repassword" placeholder="请重复密码" style="width: 260px" clearable
                    @input="validRepassword"></el-input>
        </div>
      </div>
      <div class="register-msg">{{repasswordMsg}}</div>
      <div class="register-line">
        <div class="register-name">{{'姓名:'}}</div>
        <div class="register-right">
          <el-input v-model="registerAccount.name" placeholder="请输入姓名" style="width: 260px" clearable
                    @input="validName"></el-input>
        </div>
      </div>
      <div class="register-msg">{{nameMsg}}</div>
      <div class="register-line">
        <div class="register-name">{{'邮箱:'}}</div>
        <div class="register-right">
          <el-input v-model="registerAccount.email" placeholder="请输入电子邮箱" style="width: 260px" clearable
                    @input="validRegisterEmail"></el-input>
        </div>
      </div>
      <div class="register-msg">{{registerEmailMsg}}</div>
      <div class="register-line">
        <div class="register-name">{{'手机号:'}}</div>
        <div class="register-right">
          <el-input v-model="registerAccount.mobile" placeholder="请输入手机号" style="width: 260px" clearable
                    @input="validMobile"></el-input>
        </div>
      </div>
      <div class="register-msg">{{mobileMsg}}</div>
      <div class="register-line">
        <div class="register-name">{{'地址:'}}</div>
        <div class="register-right">
          <el-input v-model="registerAccount.address" placeholder="请输入地址" style="width: 260px" clearable
                    @input="validAddress"></el-input>
        </div>
      </div>
      <div class="register-msg">{{addressMsg}}</div>
      <div class="register-line">
        <div class="register-name">{{'验证码:'}}</div>
        <div class="register-right">
          <el-input v-model="registerAccount.captchaCode" placeholder="请输入验证码" style="width: 130px"
                    @input="validRegisterCaptcha"></el-input>
        </div>
        <img :src="captchaImg" @click="getCaptcha" alt="" class="captcha-img"/>
      </div>
      <div class="register-msg">{{registerCaptchaMsg}}</div>
      <div class="modal-footer">
        <button type="button" class="btn-close" @click="closeStudentRegisterModel">关闭</button>
        <button type="button" class="btn-confirm" @click="studentRegister" :disabled="registerButtonFlag">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
import {getUUID} from "@/common/util/util"
import {isEmail, isMobile, isPassword, isStudentId} from "@/common/util/validate";

export default {
name: "student_register_model",
  data(){
    return{
      registerAccount: {
        username: '',
        password: '',
        name: '',
        email: '',
        mobile: '',
        address: '',
        captchaCode: '',
        captchaUUID: ''
      },
      repassword: '',
      registerUsernameMsg: '',
      registerPasswordMsg: '',
      repasswordMsg: '',
      nameMsg: '',
      registerEmailMsg: '',
      mobileMsg:'',
      addressMsg: '',
      registerCaptchaMsg: '',
      registerUsernameFlag: false,
      registerPasswordFlag: false,
      repasswordFlag: false,
      nameFlag: false,
      registerEmailFlag: false,
      mobileFlag: false,
      addressFlag: false,
      registerCaptchaFlag: false,
      captchaImg: '',
      registerButtonFlag: true,
    }
  },
  methods:{
    closeStudentRegisterModel(){
      this.$emit("closeStudentRegisterModel")
      this.clearData()
    },
    clearData(){
      this.registerAccount.username = '';
      this.registerAccount.password = '';
      this.repassword = '';
      this.registerAccount.name = '';
      this.registerAccount.email = '';
      this.registerAccount.mobile = '';
      this.registerAccount.address = '';
      this.registerAccount.captchaCode = '';
      this.registerUsernameMsg = '';
      this.registerPasswordMsg = '';
      this.repasswordMsg = '';
      this.nameMsg = '';
      this.registerEmailMsg = '';
      this.mobileMsg ='';
      this.addressMsg = '';
      this.registerCaptchaMsg = '';
      this.registerUsernameFlag = false;
      this.registerPasswordFlag = false;
      this.repasswordFlag = false;
      this.nameFlag = false;
      this.registerEmailFlag = false;
      this.mobileFlag = false;
      this.addressFlag = false;
      this.registerCaptchaFlag = false;
      this.registerButtonFlag = true;
    },
    studentRegister(){    //todo
      let p = new FormData()
      p.append('username',this.registerAccount.username)
      p.append('stuno',this.registerAccount.username)
      p.append('password',this.registerAccount.password)
      p.append('name',this.registerAccount.name)
      p.append('email',this.registerAccount.email)
      p.append('tel',this.registerAccount.mobile)
      p.append('address',this.registerAccount.address)
      p.append('captchaCode',this.registerAccount.captchaCode)
      p.append('captchaUUID',this.registerAccount.captchaUUID)
      this.$axios({
        method : "POST",
        url: "/selene/reg",
        data : p
      }).then(res=>{
        const data = res.data
        if (data.code !== '200'){
          this.getCaptcha()
          this.registerAccount.captchaCode = ''
          this.$throw(new Error(data.msg))
          return
        }
        this.$message({
          message: '注册成功',
          type: 'success'
        });
        this.closeStudentRegisterModel()
      })
    },
    getCaptcha(){       //todo
      this.registerAccount.captchaUUID = getUUID()
      this.captchaImg = this.$axios.defaults.baseURL +  "/selene/captcha.jpg?uuid=" + this.registerAccount.captchaUUID
      console.log(this.captchaImg)
    },
    validRegisterFlag(){
      this.registerButtonFlag = !(this.registerUsernameFlag && this.registerPasswordFlag
          && this.repasswordFlag && this.nameFlag && this.registerEmailFlag && this.mobileFlag
          && this.addressFlag && this.registerCaptchaFlag)
    },
    validRegisterUsername(){
      if (!isStudentId(this.registerAccount.username)){
        this.registerUsernameMsg = '学号长度八位'
        this.registerUsernameFlag = false
      }
      else {
        this.registerUsernameMsg = ''
        this.registerUsernameFlag = true
      }
      this.validRegisterFlag()
    },
    validRegisterPassword(){
      this.repassword = ''
      this.repasswordMsg = ''
      this.repasswordFlag = false
      if (!isPassword(this.registerAccount.password)){
        this.registerPasswordMsg = '密码长度8-16位，可包含数字英文特殊字符'
        this.registerPasswordFlag = false
      }
      else {
        this.registerPasswordMsg = ''
        this.registerPasswordFlag = true
      }
      this.validRegisterFlag()
    },
    validRepassword(){
      if (this.repassword !== this.registerAccount.password){
        this.repasswordMsg = '两次密码不一致'
        this.repasswordFlag = false
      }
      else {
        this.repasswordMsg = ''
        this.repasswordFlag = true
      }
      this.validRegisterFlag()
    },
    validName(){
      this.registerAccount.name = this.registerAccount.name.replace(/\s+/g,"")
      if (this.registerAccount.name == ''){
        this.nameMsg = '姓名不能为空'
        this.nameFlag = false
      }
      else {
        this.nameMsg = ''
        this.nameFlag = true
      }
      this.validRegisterFlag()
    },
    validRegisterEmail(){
      if (!isEmail(this.registerAccount.email)){
        this.registerEmailMsg = '邮箱格式不正确'
        this.registerEmailFlag = false
      }
      else {
        this.registerEmailMsg = ''
        this.registerEmailFlag = true
      }
      this.validRegisterFlag()
    },
    validMobile(){
      if (!isMobile(this.registerAccount.mobile)){
        this.mobileMsg = '手机号格式不正确'
        this.mobileFlag = false
      }
      else {
        this.mobileMsg = ''
        this.mobileFlag = true
      }
      this.validRegisterFlag()
    },
    validAddress(){
      this.registerAccount.address = this.registerAccount.address.replace(/\s+/g,"")
      if (this.registerAccount.address == ''){
        this.addressMsg = '地址不能为空'
        this.addressFlag = false
      }
      else {
        this.addressMsg = ''
        this.addressFlag = true
      }
      this.validRegisterFlag()
    },
    validRegisterCaptcha(){
      this.registerAccount.captchaCode = this.registerAccount.captchaCode.replace(/\s+/g,"")
      if(this.registerAccount.captchaCode == ''){
        this.registerCaptchaMsg = '验证码不能为空'
        this.registerCaptchaFlag = false
      }
      else {
        this.registerCaptchaMsg = ''
        this.registerCaptchaFlag = true
      }
      this.validRegisterFlag()
    },
  },
}
</script>

<style src="../../assets/css/student_register_model.css" scoped/>
