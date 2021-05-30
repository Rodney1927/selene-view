<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="input-first">
        <div class="input-name">姓名:</div>
        <div>
          <el-input v-model="student.name" placeholder="未填写"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="msg">{{nameMsg}}</div>
      <div class="input">
        <div class="input-name">电话:</div>
        <div>
          <el-input v-model="student.tel" placeholder="未填写"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="msg">{{mobileMsg}}</div>
      <div class="input">
        <div class="input-name">邮箱:</div>
        <div>
          <el-input v-model="student.email" placeholder="未填写"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="msg">{{emailMsg}}</div>
      <div class="input">
        <div class="input-name">住址:</div>
        <div>
          <el-input v-model="student.address" placeholder="未填写"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="msg">{{addressMsg}}</div>
      <div class="input">
        <div class="input-name">性别:</div>
        <div>
          <el-input v-model="student.sex" placeholder="未填写"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="input-last">
        <div class="input-name">班级:</div>
        <div>
          <el-input v-model="student.class.name" placeholder="未填写"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="input-last">
        <div class="input-name">教师:</div>
        <div>
          <el-input v-model="student.teacher.name" placeholder="未填写"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="input-last">
        <div class="input-name">简历:</div>
        <div style="width: 260px">
         1
        </div>
      </div>
      <div class="button">
        <el-button type="primary" @click="closeStudentInfo">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "student_info_model",
  data(){
    return{
      student: {},
      nameMsg: '',
      mobileMsg: '',
      emailMsg: '',
      addressMsg: '',
    }
  },
  methods:{
    closeStudentInfo(){
      this.$emit("closeStudentInfoModel")
      this.clearData()
    },
    clearData(){
      this.student = {teacher:{},class:{}}
    },
  },
}
</script>

<style src="../../assets/css/student_info_model.css" scoped/>
