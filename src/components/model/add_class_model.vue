<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="input-first">
        <div class="input-name">班级名称:</div>
        <div>
          <el-input v-model="c.name" placeholder="请输入班级名称"
                    style="width: 260px" @input="validName"></el-input>
        </div>
      </div>
      <div class="msg">{{nameMsg}}</div>
      <div class="input">
        <div class="input-name">学院:</div>
        <div>
          <el-input v-model="c.college" placeholder="请输入学院"
                    style="width: 260px" @input="validCollege"></el-input>
        </div>
      </div>
      <div class="msg">{{collegeMsg}}</div>
      <div class="button">
        <div class="button-left">
          <el-button type="primary" @click="closeAddClass">关闭</el-button>
        </div>
        <div class="button-right">
          <el-button type="success" @click="addClass" :disabled="addClassButtonFlag">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "add_class_model",
  data(){
    return{
      c: {
        name: '',
        college: '',
      },
      nameMsg: '',
      nameFlag: false,
      collegeMsg: '',
      collegeFlag: false,
      addClassButtonFlag: true,
    }
  },
  methods:{
    closeAddClass(){
      this.$emit("closeAddClassModel")
      this.clearData()
    },
    clearData(){
      this.c.name = ''
      this.c.college = ''
      this.nameMsg = ''
      this.nameFlag = false
      this.collegeMsg = ''
      this.collegeFlag = false
      this.addClassButtonFlag = true
    },
    validFlag(){
      this.addClassButtonFlag = !(this.nameFlag && this.collegeFlag)
    },
    validName(){
      this.c.name = this.c.name.replace(/\s+/g,"")
      if (this.c.name == ''){
        this.nameMsg = '班级名称不能为空'
        this.nameFlag = false
      }
      else {
        this.nameMsg = ''
        this.nameFlag = true
      }
      this.validFlag()
    },
    validCollege(){
      this.c.college = this.c.college.replace(/\s+/g,"")
      if (this.c.college == ''){
        this.collegeMsg = '学院不能为空'
        this.collegeFlag = false
      }
      else {
        this.collegeMsg = ''
        this.collegeFlag = true
      }
      this.validFlag()
    },
    addClass(){    //todo
      this.$axios({
        method: "POST",
        url: "/selene/user/add_class",
        data: {...this.teacher}
      }).then(res=>{
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.closeUpdateClass()
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.$emit("addRefresh")
      })
    },
  },
}
</script>

<style src="../../assets/css/add_class_model.css" scoped/>
