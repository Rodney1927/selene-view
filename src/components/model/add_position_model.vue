<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="input-first">
        <div class="input-name">职位名称:</div>
        <div>
          <el-input v-model="position.name" placeholder="请输入职位名称"
                    style="width: 260px" @input="validName"></el-input>
        </div>
      </div>
      <div class="msg">{{nameMsg}}</div>
      <div class="input">
        <div class="input-name">工作地点:</div>
        <div>
          <el-input v-model="position.place" placeholder="请输入工作地点"
                    style="width: 260px" @input="validPlace"></el-input>
        </div>
      </div>
      <div class="msg">{{placeMsg}}</div>
      <div class="input">
        <div class="input-name">薪资:</div>
        <div>
          <el-input v-model="position.salary" placeholder="请输入薪资"
                    style="width: 260px" @input="validSalary"></el-input>
        </div>
      </div>
      <div class="msg">{{salaryMsg}}</div>
      <div class="input">
        <div class="input-name">工作内容:</div>
        <div>
          <el-input v-model="position.content" placeholder="请输入工作内容"
                    style="width: 260px" @input="validContent"></el-input>
        </div>
      </div>
      <div class="msg">{{contentMsg}}</div>
      <div class="input">
        <div class="input-name">要求:</div>
        <div>
          <el-input v-model="position.remark" placeholder="请输入要求"
                    style="width: 260px" @input="validRemark"></el-input>
        </div>
      </div>
      <div class="msg">{{remarkMsg}}</div>
      <div class="button">
        <div class="button-left">
          <el-button type="primary" @click="closeAddPosition">关闭</el-button>
        </div>
        <div class="button-right">
          <el-button type="success" @click="addPosition" :disabled="addPositionButtonFlag">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "add_position_model",
  data(){
    return{
      position:{
        name: '',
        place: '',
        salary: '',
        content: '',
        remark: '',
      },
      nameMsg: '',
      nameFlag: false,
      placeMsg: '',
      placeFlag: false,
      salaryMsg: '',
      salaryFlag: false,
      contentMsg: '',
      contentFlag: false,
      remarkMsg: '',
      remarkFlag: false,
      addPositionButtonFlag: true,
    }
  },
  methods:{
    closeAddPosition(){
      this.$emit("closeAddPositionModel")
      this.clearData()
    },
    clearData(){
      this.position.name = ''
      this.position.place = ''
      this.position.salary = ''
      this.position.content = ''
      this.position.remark = ''
      this.nameMsg = ''
      this.nameFlag = false
      this.placeMsg = ''
      this.placeFlag =  false
      this.salaryMsg = ''
      this.salaryFlag = false
      this.contentMsg = ''
      this.contentFlag = false
      this.remarkMsg = ''
      this.remarkFlag = false
      this.addPositionButtonFlag = true
    },
    validFlag(){
      this.addPositionButtonFlag = !(this.nameFlag && this.placeFlag && this.salaryFlag && this.contentFlag
          && this.remarkFlag)
    },
    validRemark(){
      this.position.remark = this.position.remark.replace(/\s+/g,"")
      if (this.position.remark == ''){
        this.remarkMsg = '要求不能为空'
        this.remarkFlag = false
      }
      else {
        this.remarkMsg = ''
        this.remarkFlag = true
      }
      this.validFlag()
    },
    validName(){
      this.position.name = this.position.name.replace(/\s+/g,"")
      if (this.position.name == ''){
        this.nameMsg = '职位名称不能为空'
        this.nameFlag = false
      }
      else {
        this.nameMsg = ''
        this.nameFlag = true
      }
      this.validFlag()
    },
    validPlace(){
      this.position.place = this.position.place.replace(/\s+/g,"")
      if (this.position.place == ''){
        this.placeMsg = '工作地点不能为空'
        this.placeFlag = false
      }
      else {
        this.placeMsg = ''
        this.placeFlag = true
      }
      this.validFlag()
    },
    validSalary(){
      this.position.salary = this.position.salary.replace(/\s+/g,"")
      if (this.position.salary == ''){
        this.salaryMsg = '薪资不能为空'
        this.salaryFlag = false
      }
      else {
        this.salaryMsg = ''
        this.salaryFlag = true
      }
      this.validFlag()
    },
    validContent(){
      this.position.content = this.position.content.replace(/\s+/g,"")
      if (this.position.content == ''){
        this.contentMsg = '工作内容不能为空'
        this.contentFlag = false
      }
      else {
        this.contentMsg = ''
        this.contentFlag = true
      }
      this.validFlag()
    },
    addPosition(){
      let p = new FormData()
      p.append('name',this.position.name)
      p.append('place',this.position.place)
      p.append('salary',this.position.salary)
      p.append('content',this.position.content)
      p.append('remark',this.position.remark)
      this.$axios({
        method : "POST",
        url: "/selene/position/add", //todo
        data: p
      }).then(res=>{
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.closeAddPosition()
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.$emit("addRefresh")
      })
    },
  },
}
</script>

<style src="../../assets/css/add_position_model.css" scoped/>
