<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="input-first">
        <div class="input-name">姓名:</div>
        <div>
          <el-input v-model="student.name" placeholder="请输入姓名"
                    style="width: 260px" @input="validName"></el-input>
        </div>
      </div>
      <div class="msg">{{nameMsg}}</div>
      <div class="input">
        <div class="input-name">学号:</div>
        <div>
          <el-input v-model="student.studentId" placeholder="请输入学号"
                    style="width: 260px" @input="validStudentId"></el-input>
        </div>
      </div>
      <div class="msg">{{studentIdMsg}}</div>
      <div class="input">
        <div class="input-name">电话:</div>
        <div>
          <el-input v-model="student.tel" placeholder="请输入电话"
                    style="width: 260px" @input="validMobile"></el-input>
        </div>
      </div>
      <div class="msg">{{mobileMsg}}</div>
      <div class="input">
        <div class="input-name">邮箱:</div>
        <div>
          <el-input v-model="student.email" placeholder="请输入邮箱"
                    style="width: 260px" @input="validEmail"></el-input>
        </div>
      </div>
      <div class="msg">{{emailMsg}}</div>
      <div class="input">
        <div class="input-name">住址:</div>
        <div>
          <el-input v-model="student.address" placeholder="请输入住址"
                    style="width: 260px" @input="validAddress"></el-input>
        </div>
      </div>
      <div class="msg">{{addressMsg}}</div>
      <div class="input">
        <div class="input-name">性别:</div>
        <div>
          <el-select v-model="sex" placeholder="请选择性别" style="width: 260px">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.value"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="input-last">
        <div class="input-name">班级:</div>
        <div>
          <el-select
              v-model.trim="c"
              filterable
              remote
              reserve-keyword
              placeholder="请选择班级"
              :loading="loadingClass"
              :remote-method="searchClass"
              style="width: 260px"
              clearable
              v-loadmore="loadMore">
            <el-option
                v-for="item in classShow"
                :key="item.id"
                :label="item.label"
                :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="input-last">
        <div class="input-name">教师:</div>
        <div>
          <el-select
              v-model.trim="teacher"
              filterable
              remote
              reserve-keyword
              placeholder="请选择教师"
              :loading="loadingTeachers"
              :remote-method="searchTeachers"
              style="width: 260px"
              clearable
              v-loadmore="loadMore">
            <el-option
                v-for="item in teachersShow"
                :key="item.id"
                :label="item.label"
                :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="button">
        <div class="button-left">
          <el-button type="primary" @click="closeAddStudent">关闭</el-button>
        </div>
        <div class="button-right">
          <el-button type="success" @click="addStudent" :disabled="addStudentButtonFlag">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isEmail, isMobile, isStudentId} from "@/common/util/validate";

export default {
name: "add_student_model",
  data(){
    return{
      options: [
        {value: '男'},
        {value: '女'}
      ],
      sex: '',
      c: null,
      classShow: [],
      cs: [],
      loadingClass: false,
      teacher: null,
      teachersShow: [],
      teachers: [],
      loadingTeachers: false,
      student: {
        name: '',
        studentId: '',
        tel: '',
        email: '',
        address: '',
      },
      nameMsg: '',
      nameFlag: false,
      mobileMsg: '',
      mobileFlag: false,
      emailMsg: '',
      emailFlag: false,
      studentIdMsg: '',
      studentIdFlag: false,
      addressMsg: '',
      addressFlag: false,
      addStudentButtonFlag: true,
    }
  },
  methods:{
    closeAddStudent(){
      this.$emit("closeAddStudentModel")
      this.clearData()
    },
    clearData(){
      this.student.name = ''
      this.student.studentId = ''
      this.student.tel = ''
      this.student.email = ''
      this.student.address = ''
      this.c = null
      this.classShow = []
      this.cs = []
      this.teacher = null
      this.teachersShow = []
      this.teachers = []
      this.sex = ''
      this.nameMsg = ''
      this.nameFlag = false
      this.studentIdMsg = ''
      this.studentIdFlag =  false
      this.mobileMsg = ''
      this.mobileFlag = false
      this.emailMsg = ''
      this.emailFlag = false
      this.addressMsg = ''
      this.addressFlag = false
      this.addStudentButtonFlag = true
    },
    searchClass(input){     //todo
      input = input.replace(/\s+/g,"")
      if(input === ''){
        return
      }
      this.loadingClass = true
      let p = {
        name: input,
      }
      this.$axios({
        method : "POST",
        url: "/selene/student/query_classInfo",
        data : p
      }).then(res=>{
        this.loadingClass = false
        const data = res.data.data
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.cs = data.classList
        this.classShow = []
        for(let one of this.cs){
          let u = {
            id: one.id,
            label: one.name
          }
          this.classShow.push(u)
        }
      })
    },
    searchTeachers(input){     //todo
      input = input.replace(/\s+/g,"")
      if(input === ''){
        return
      }
      this.loadingTeachers = true
      let p = {
        name: input,
      }
      this.$axios({
        method : "POST",
        url: "/selene/student/query_teacherInfo",
        data : p
      }).then(res=>{
        this.loadingTeachers = false
        const data = res.data.data
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.teachers = data.teachersList
        this.teachersShow = []
        for(let one of this.cs){
          let u = {
            id: one.id,
            label: one.name + '(' + one.workNumber + ')'
          }
          this.teachersShow.push(u)
        }
      })
    },
    loadMore(){
      this.$message('已经到底了')
    },
    validFlag(){
      this.addStudentButtonFlag = !(this.nameFlag && this.mobileFlag && this.emailFlag && this.studentIdFlag
          && this.addressFlag)
    },
    validName(){
      this.student.name = this.student.name.replace(/\s+/g,"")
      if (this.student.name == ''){
        this.nameMsg = '姓名不能为空'
        this.nameFlag = false
      }
      else {
        this.nameMsg = ''
        this.nameFlag = true
      }
      this.validFlag()
    },
    validStudentId(){
      if (!isStudentId(this.student.studentId)){
        this.studentIdMsg = '学号格式不正确'
        this.studentIdFlag = false
      }
      else {
        this.studentIdMsg = ''
        this.studentIdFlag = true
      }
      this.validFlag()
    },
    validMobile(){
      if (!isMobile(this.student.tel)){
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
      if (!isEmail(this.student.email)){
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
      this.student.address = this.student.address.replace(/\s+/g,"")
      if (this.student.address == ''){
        this.addressMsg = '地址不能为空'
        this.addressFlag = false
      }
      else {
        this.addressMsg = ''
        this.addressFlag = true
      }
      this.validFlag()
    },
    addStudent(){
      if (this.c === ''){
        this.c = null
      }
      if (this.sex === ''){
        this.sex = null
      }
      if (this.teacher === ''){
        this.teacher = null
      }
      let p = new FormData()
      p.append('name',this.student.name)
      p.append('studentId',this.student.studentId)
      p.append('tel',this.student.tel)
      p.append('email',this.student.email)
      p.append('address',this.student.address)
      p.append('sex',this.sex)
      p.append('classId',this.c)
      p.append('teacherId',this.teacher)
      p.append('password',this.student.studentId)
      this.$axios({
        method : "POST",
        url: "/selene/student/add_student", //todo
        data: p
      }).then(res=>{
        if (res.data.code !== '200'){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.closeAddStudent()
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.$emit("addRefresh")
      })
    },
  },
}
</script>

<style src="../../assets/css/add_student_model.css" scoped/>