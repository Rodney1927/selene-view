<template>
  <div class="bg">
    <div class="login">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="学生登录" style="height: 220px">
          <div class="login-input-top">
            <el-input v-model="loginAccount.studentId" placeholder="请输入学号" style="width: 260px"
                      @input="validStudentId" clearable></el-input>
          </div>
          <div class="login-input-next">
            <el-input v-model="loginAccount.studentPassword" placeholder="请输入密码" style="width: 260px"
                      @input="validStudentPassword" type="password"></el-input>
          </div>
          <div class="login-button">
            <el-button round style="width: 85px" type="primary" @click="openStudentRegisterModel">注册</el-button>
            <el-button round style="width: 85px" type="primary" :disabled="studentLoginButtonFlag"
                       @click="studentLogin">登录</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="企业登录" style="height: 220px">
          <div class="login-input-top">
            <el-input v-model="loginAccount.companyUsername" placeholder="请输入账号" style="width: 260px"
                      @input="validCompanyUsername" clearable ></el-input>
          </div>
          <div class="login-input-next">
            <el-input v-model="loginAccount.companyPassword" placeholder="请输入密码" style="width: 260px"
                      @input="validCompanyPassword" type="password"></el-input>
          </div>
          <div class="login-button">
            <el-button round style="width: 85px" type="primary" @click="openCompanyRegisterModel">注册</el-button>
            <el-button round style="width: 85px" type="primary" :disabled="companyLoginButtonFlag"
                       @click="companyLogin">登录</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="管理员登录" style="height: 220px">
          <div class="login-input-top">
            <el-input v-model="loginAccount.username" placeholder="请输入账号" style="width: 260px"
                      @input="validUsername" clearable ></el-input>
          </div>
          <div class="login-input-next">
            <el-input v-model="loginAccount.password" placeholder="请输入密码" style="width: 260px"
                      @input="validUserPassword" type="password"></el-input>
          </div>
          <div class="login-button">
            <el-button round style="width: 85px" type="primary" :disabled="userLoginButtonFlag"
                       @click="userLogin">登录</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div style="position: absolute;z-index: 2;">
        <studentRegisterModel ref="studentRegisterModel" v-show="isStudentRegisterModelShow"
                        v-on:closeStudentRegisterModel="closeStudentRegisterModel"/>
      </div>
      <div style="position: absolute;z-index: 2;">
        <companyRegisterModel ref="companyRegisterModel" v-show="isCompanyRegisterModelShow"
                              v-on:closeCompanyRegisterModel="closeCompanyRegisterModel"/>
      </div>
    </div>
  </div>
</template>

<script>
import studentRegisterModel from "@/components/model/student_register_model"
import companyRegisterModel from "@/components/model/company_register_model"

export default {
name: "login",
  data(){
    return{
      loginAccount: {
        companyUsername: '',
        studentId: '',
        studentPassword: '',
        companyPassword: '',
        username: '',
        password: '',
      },
      activeName: '0',
      companyLoginButtonFlag: true,
      studentLoginButtonFlag: true,
      userLoginButtonFlag: true,
      loginStudentIdFlag: false,
      loginStudentPasswordFlag: false,
      loginCompanyUsernameFlag: false,
      loginCompanyPasswordFlag: false,
      loginUsernameFlag: false,
      loginPasswordFlag: false,
      isStudentRegisterModelShow: false,
      isCompanyRegisterModelShow: false,
    }
  },
  methods:{
    openStudentRegisterModel(){
      this.$refs.studentRegisterModel.getCaptcha()
      this.isStudentRegisterModelShow = true
    },
    closeStudentRegisterModel(){
      this.isStudentRegisterModelShow = false
    },
    openCompanyRegisterModel(){
      this.$refs.companyRegisterModel.getCaptcha()
      this.isCompanyRegisterModelShow = true
    },
    closeCompanyRegisterModel(){
      this.isCompanyRegisterModelShow = false
    },
    handleClick(tab) {
      if (tab.index == 0) {
        this.loginAccount.companyUsername = ''
        this.loginAccount.companyPassword = ''
        this.loginAccount.username = ''
        this.loginAccount.password = ''
        this.loginCompanyUsernameFlag = false
        this.loginCompanyPasswordFlag = false
        this.loginUsernameFlag = false
        this.loginPasswordFlag = false
        this.companyLoginButtonFlag = true
        this.userLoginButtonFlag = true
      } else if (tab.index == 1) {
        this.loginAccount.studentId = ''
        this.loginAccount.studentPassword = ''
        this.loginAccount.username = ''
        this.loginAccount.password = ''
        this.loginStudentIdFlag = false
        this.loginStudentPasswordFlag = false
        this.loginUsernameFlag = false
        this.loginPasswordFlag = false
        this.studentLoginButtonFlag = true
        this.userLoginButtonFlag = true
      } else if (tab.index == 2) {
        this.loginAccount.companyUsername = ''
        this.loginAccount.companyPassword = ''
        this.loginAccount.studentId = ''
        this.loginAccount.studentPassword = ''
        this.loginCompanyUsernameFlag = false
        this.loginCompanyPasswordFlag = false
        this.loginStudentIdFlag = false
        this.loginStudentPasswordFlag = false
        this.companyLoginButtonFlag = true
        this.studentLoginButtonFlag = true
      }
    },
    studentLogin(){
      let p = new FormData()
      p.append('role',1)
      p.append('username',this.loginAccount.studentId)
      p.append('password',this.loginAccount.studentPassword)
      this.$axios({
        method : "POST",
        url: "/selene/login",
        data : p
      }).then(res=>{
        let data = res.data
        if (data.code !== '200'){
          this.$throw(new Error(data.msg))
          return
        }
        data.data.role = 1
        localStorage.setItem("userInfo",JSON.stringify(data.data))
        this.$router.push('home')
      })
    },
    companyLogin(){      //todo
      let p = new FormData()
      p.append('role',4)
      p.append('username',this.loginAccount.companyUsername)
      p.append('password',this.loginAccount.companyPassword)
      this.$axios({
        method : "POST",
        url: "/selene/login",
        data : p
      }).then(res=>{
        let data = res.data
        if (data.code !== '200'){
          this.$throw(new Error(data.msg))
          return
        }
        data.data.role = 4
        localStorage.setItem("userInfo",JSON.stringify(data.data))
        this.$router.push('home')
      })
    },
    userLogin(){
      let p = new FormData()
      p.append('role',2)
      p.append('username',this.loginAccount.username)
      p.append('password',this.loginAccount.password)
      this.$axios({
        method : "POST",
        url: "/selene/login",
        data : p
      }).then(res=>{
        let data = res.data
        if (data.code !== '200'){
          this.$throw(new Error(data.msg))
          return
        }
        data.data.role = 2
        localStorage.setItem("userInfo",JSON.stringify(data.data))
        this.$router.push('home')
      })
    },
    validStudentId(){
      this.loginAccount.studentId = this.loginAccount.studentId.replace(/\s+/g,"")
      this.loginStudentIdFlag = this.loginAccount.studentId !== '';
      this.studentLoginButtonFlag = !(this.loginStudentIdFlag && this.loginStudentPasswordFlag)
    },
    validStudentPassword(){
      this.loginAccount.studentPassword = this.loginAccount.studentPassword.replace(/\s+/g,"")
      this.loginStudentPasswordFlag = this.loginAccount.studentPassword !== '';
      this.studentLoginButtonFlag = !(this.loginStudentIdFlag && this.loginStudentPasswordFlag)
    },
    validCompanyUsername(){
      this.loginAccount.companyUsername = this.loginAccount.companyUsername.replace(/\s+/g,"")
      this.loginCompanyUsernameFlag = this.loginAccount.companyUsername !== '';
      this.companyLoginButtonFlag = !(this.loginCompanyUsernameFlag && this.loginCompanyPasswordFlag)
    },
    validCompanyPassword(){
      this.loginAccount.companyPassword = this.loginAccount.companyPassword.replace(/\s+/g,"")
      this.loginCompanyPasswordFlag = this.loginAccount.companyPassword !== '';
      this.companyLoginButtonFlag = !(this.loginCompanyUsernameFlag && this.loginCompanyPasswordFlag)
    },
    validUsername(){
      this.loginAccount.username = this.loginAccount.username.replace(/\s+/g,"")
      this.loginUsernameFlag = this.loginAccount.username !== '';
      this.userLoginButtonFlag = !(this.loginUsernameFlag && this.loginPasswordFlag)
    },
    validUserPassword(){
      this.loginAccount.password = this.loginAccount.password.replace(/\s+/g,"")
      this.loginPasswordFlag = this.loginAccount.password !== '';
      this.userLoginButtonFlag = !(this.loginUsernameFlag && this.loginPasswordFlag)
    },
  },
  components: {
    studentRegisterModel,
    companyRegisterModel,
  },
}
</script>

<style src="../assets/css/login.css" scoped/>