<template>
  <div class="home">
    <el-container>
      <el-aside class="menu">
        <navbar />
      </el-aside>
      <el-container>
        <el-header>
          <div class="home-border">
            <img src="../assets/img/logo.png" class="logo"/>
            <div class="user-dropdown">
              <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              用户中心<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="this.role === 1" command="a">个人信息</el-dropdown-item>
                  <el-dropdown-item command="b">修改密码</el-dropdown-item>
                  <el-dropdown-item command="c">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div style="position: absolute;z-index: 2;">
            <updateStudentInfoModel ref="updateStudentInfoModel"
                                     v-show="isUpdateStudentInfoModelShow"
                                     v-on:closeUpdateStudentInfoModel="closeUpdateStudentInfoModel"
                                     v-on:refresh="getUserInfo"/>
          </div>
          <div style="position: absolute;z-index: 2;">
            <updatePasswordModel ref="updatePasswordModel"
                                 v-show="isUpdatePasswordModelShow"
                                 v-on:closeUpdatePasswordModel="closeUpdatePasswordModel"/>
          </div>
        </el-header>
        <el-main>
          <mainContent />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navbar from "../components/navbar";
import mainContent from "../components/main_content";
import updateStudentInfoModel from "../components/model/update_student_info_model"
//import updateCompanyInfoModel from "../components/model/update_company_info_model"
//import updateUserInfoModel from "../components/model/update_user_info_model"
import updatePasswordModel from  "../components/model/update_password_model"

export default {
  data(){
    return{
      isUpdateStudentInfoModelShow: false,
      isUpdatePasswordModelShow: false,
      user: {},
      role: 1,
    }
  },
  methods:{
    handleCommand(command){
      if(command === 'a'){
        this.openUpdateStudentInfoModel()
      }
      if(command === 'b'){
        this.openUpdatePasswordModel()
      }
      if(command === 'c'){
        this.$axios({
          method : "Get",
          url: "/helios/meeting/user/logout",
        }).then(res=>{
          const data = res.data
          if (data.code !== 200){
            this.$throw(new Error(data.msg))
            return
          }
          localStorage.removeItem("userInfo")
          this.$router.push('login')
        })
      }
    },
    openUpdateStudentInfoModel(){
      /*this.getUserInfo()
      this.$refs.updateStudentInfoModel.student.name = this.user.name
      this.$refs.updateStudentInfoModel.student.tel = this.user.tel
      this.$refs.updateStudentInfoModel.student.email = this.user.email
      this.$refs.updateStudentInfoModel.student.studentId = this.user.stuno
      this.$refs.updateStudentInfoModel.student.address = this.user.address
      this.$refs.updateStudentInfoModel.student.sex = this.user.sex
      this.$refs.updateStudentInfoModel.student.class = this.user.class.name
      this.$refs.updateStudentInfoModel.student.teacher = this.user.teacher.name*/
      this.isUpdateStudentInfoModelShow = true
    },
    closeUpdateStudentInfoModel(){
      this.isUpdateStudentInfoModelShow = false
    },
    openUpdatePasswordModel(){
      this.isUpdatePasswordModelShow = true
    },
    closeUpdatePasswordModel(){
      this.isUpdatePasswordModelShow = false
    },
    getUserInfo(){
      if (typeof (localStorage.getItem('userInfo')) == "undefined"){
        throw new Error("用户未登录!")
      }
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      //this.role = userInfo.role
      if (userInfo == null){
        throw new Error("用户未登录!")
      }
      this.user =  userInfo
    },
  },
  mounted(){
    //this.getUserInfo()
  },
  components:{
    navbar,
    mainContent,
    updateStudentInfoModel,
    //updateCompanyInfoModel,
    //updateUserInfoModel,
    updatePasswordModel,
  }
}
</script>

<style src="../assets/css/home.css" scoped/>