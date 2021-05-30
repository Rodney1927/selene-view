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
          <el-button type="primary" @click="closeUpdateClass">关闭</el-button>
        </div>
        <div class="button-right">
          <el-button type="success" @click="updateClass" :disabled="updateClassButtonFlag">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "update_class_model",
  data(){
    return{
      c: {},
      nameMsg: '',
      nameFlag: true,
      collegeMsg: '',
      collegeFlag: true,
      updateClassButtonFlag: false,
    }
  },
  methods:{
    closeUpdateClass(){
      this.$emit("closeUpdateClassModel")
      this.clearData()
    },
    clearData(){
      this.c = {}
      this.nameMsg = ''
      this.nameFlag = true
      this.collegeMsg = ''
      this.collegeFlag = true
      this.updateClassButtonFlag = false
    },
    validFlag(){
      this.updateClassButtonFlag = !(this.nameFlag && this.collegeFlag)
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
      if (this.c.collage == ''){
        this.collegeMsg = '学院不能为空'
        this.collegeFlag = false
      }
      else {
        this.collegeMsg = ''
        this.collegeFlag = true
      }
      this.validFlag()
    },
    updateClass(){    //todo
      this.$axios({
        method: "POST",
        url: "/selene/user/update_class",
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
        this.$emit("updateRefresh")
      })
    },
  },
}
</script>

<style src="../../assets/css/update_class_model.css" scoped/>