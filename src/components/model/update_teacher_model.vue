<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="input-first">
        <div class="input-name">姓名:</div>
        <div>
          <el-input v-model="teacher.name" placeholder="请输入姓名"
                    style="width: 260px" @input="validName"></el-input>
        </div>
      </div>
      <div class="msg">{{nameMsg}}</div>
      <div class="input">
        <div class="input-name">电话:</div>
        <div>
          <el-input v-model="teacher.mobile" placeholder="请输入电话"
                    style="width: 260px" @input="validMobile"></el-input>
        </div>
      </div>
      <div class="msg">{{mobileMsg}}</div>
      <div class="input">
        <div class="input-name">邮箱:</div>
        <div>
          <el-input v-model="teacher.email" placeholder="请输入邮箱"
                    style="width: 260px" @input="validEmail"></el-input>
        </div>
      </div>
      <div class="msg">{{emailMsg}}</div>
      <div class="input">
        <div class="input-name">工号:</div>
        <div>
          <el-input v-model="teacher.workNumber" placeholder="请输入工号"
                    style="width: 260px" @input="validWorkNumber"></el-input>
        </div>
      </div>
      <div class="msg">{{workNumberMsg}}</div>
      <div class="input">
        <div class="input-name">学历:</div>
        <div>
          <el-input v-model="teacher.edu" placeholder="请输入学历"
                    style="width: 260px" @input="validEdu"></el-input>
        </div>
      </div>
      <div class="msg">{{eduMsg}}</div>
      <div class="input">
        <div class="input-name">学院:</div>
        <div>
          <el-input v-model="teacher.college" placeholder="请输入学院"
                    style="width: 260px" @input="validCollege"></el-input>
        </div>
      </div>
      <div class="msg">{{collegeMsg}}</div>
      <div class="input">
        <div class="input-name">职位:</div>
        <div>
          <el-input v-model="teacher.position" placeholder="请输入职位"
                    style="width: 260px" @input="validPosition"></el-input>
        </div>
      </div>
      <div class="msg">{{positionMsg}}</div>
      <div class="button">
        <div class="button-left">
          <el-button type="primary" @click="closeUpdateTeacher">关闭</el-button>
        </div>
        <div class="button-right">
          <el-button type="success" @click="updateTeacher" :disabled="updateTeacherButtonFlag">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isEmail, isMobile, isWorkNumber} from "@/common/util/validate";

export default {
name: "update_teacher_model",
  data(){
    return{
      teacher: {},
      nameMsg: '',
      nameFlag: true,
      mobileMsg: '',
      mobileFlag: true,
      emailMsg: '',
      emailFlag: true,
      workNumberMsg: '',
      workNumberFlag: true,
      eduMsg: '',
      eduFlag: true,
      collegeMsg: '',
      collegeFlag: true,
      positionMsg: '',
      positionFlag: true,
      updateTeacherButtonFlag: false,
    }
  },
  methods:{
    closeUpdateTeacher(){
      this.$emit("closeUpdateTeacherModel")
      this.clearData()
    },
    clearData(){
      this.teacher = {}
      this.nameMsg = ''
      this.nameFlag = true
      this.mobileMsg = ''
      this.mobileFlag = true
      this.emailMsg = ''
      this.emailFlag = true
      this.workNumberMsg = ''
      this.workNumberFlag = true
      this.eduMsg = ''
      this.eduFlag = true
      this.positionMsg = ''
      this.positionFlag = true
      this.collegeMsg = ''
      this.collegeFlag = true
      this.updateTeacherButtonFlag = false
    },
    validFlag(){
      this.updateTeacherButtonFlag = !(this.nameFlag && this.mobileFlag && this.emailFlag && this.workNumberFlag
      && this.eduFlag && this.collegeFlag && this.positionFlag)
    },
    validName(){
      this.teacher.name = this.teacher.name.replace(/\s+/g,"")
      if (this.teacher.name == ''){
        this.nameMsg = '姓名不能为空'
        this.nameFlag = false
      }
      else {
        this.nameMsg = ''
        this.nameFlag = true
      }
      this.validFlag()
    },
    validMobile(){
      if (!isMobile(this.teacher.mobile)){
        this.mobileMsg = '电话格式不正确'
        this.mobileFlag = false
      }
      else {
        this.mobileMsg = ''
        this.mobileFlag = true
      }
      this.validFlag()
    },
    validEmail(){
      if (!isEmail(this.teacher.email)){
        this.emailMsg = '邮箱格式不正确'
        this.emailFlag = false
      }
      else {
        this.emailMsg = ''
        this.emailFlag = true
      }
      this.validFlag()
    },
    validWorkNumber(){
      if (!isWorkNumber(this.teacher.workNumber)){
        this.workNumberMsg = '工号格式不正确'
        this.workNumberFlag = false
      }
      else {
        this.workNumberMsg = ''
        this.workNumberFlag = true
      }
      this.validFlag()
    },
    validEdu(){
      this.teacher.edu = this.teacher.edu.replace(/\s+/g,"")
      if (this.teacher.edu == ''){
        this.eduMsg = '学历不能为空'
        this.eduFlag = false
      }
      else {
        this.eduMsg = ''
        this.eduFlag = true
      }
      this.validFlag()
    },
    validCollege(){
      this.teacher.college = this.teacher.college.replace(/\s+/g,"")
      if (this.teacher.college == ''){
        this.collegeMsg = '学院不能为空'
        this.collegeFlag = false
      }
      else {
        this.collegeMsg = ''
        this.collegeFlag = true
      }
      this.validFlag()
    },
    validPosition(){
      this.teacher.position = this.teacher.position.replace(/\s+/g,"")
      if (this.teacher.position == ''){
        this.positionMsg = '职位不能为空'
        this.positionFlag = false
      }
      else {
        this.positionMsg = ''
        this.positionFlag = true
      }
      this.validFlag()
    },
    updateTeacher(){    //todo
      this.$axios({
        method: "POST",
        url: "/selene/user/update_teacher",
        data: {...this.teacher}
      }).then(res=>{
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.closeUpdateTeacher()
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.$emit("updateRefresh")
      })
    },
  },
}
</script>

<style src="../../assets/css/update_teacher_model.css" scoped/>