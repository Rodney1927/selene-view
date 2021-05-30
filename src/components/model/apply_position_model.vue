<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="input-first">
        <div class="input-name">职位名称:</div>
        <div>
          <el-input v-model="position.name" placeholder="请输入职位名称"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="msg">{{nameMsg}}</div>
      <div class="input">
        <div class="input-name">工作地点:</div>
        <div>
          <el-input v-model="position.place" placeholder="请输入工作地点"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="msg">{{placeMsg}}</div>
      <div class="input">
        <div class="input-name">薪资:</div>
        <div>
          <el-input v-model="position.salary" placeholder="请输入薪资"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="msg">{{salaryMsg}}</div>
      <div class="input">
        <div class="input-name">工作内容:</div>
        <div>
          <el-input v-model="position.content" placeholder="请输入工作内容"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="msg">{{contentMsg}}</div>
      <div class="input">
        <div class="input-name">要求:</div>
        <div>
          <el-input v-model="position.remark" placeholder="请输入要求"
                    style="width: 260px" disabled></el-input>
        </div>
      </div>
      <div class="msg">{{remarkMsg}}</div>
      <div class="button">
        <div class="button-left">
          <el-button type="primary" @click="closeApplyPosition">关闭</el-button>
        </div>
        <div class="button-right">
          <el-button type="success" @click="applyPosition">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "apply_position_model",
  data(){
    return{
      position:{},
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
    }
  },
  methods:{
    closeApplyPosition(){
      this.$emit("closeApplyPositionModel")
      this.clearData()
    },
    clearData(){
      this.position = {}
    },
    applyPosition(){
      let p = new FormData()
      p.append('id',this.position.id)
      this.$axios({
        method : "POST",
        url: "/selene/position/apply", //todo
        data: p
      }).then(res=>{
        if (res.data.code !== '200'){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.closeApplyPosition()
        this.$message({
          message: '添加成功',
          type: 'success'
        });
      })
    },
  },
}
</script>

<style src="../../assets/css/apply_position_model.css" scoped/>
