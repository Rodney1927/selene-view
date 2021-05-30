<template>
  <div>
    <div class="search-menu">
      <div class="search">
        <el-input v-model="searchParams.name" placeholder="按姓名搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-input v-model="searchParams.name" placeholder="按工号搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-input v-model="searchParams.name" placeholder="按职位搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="searchButton">搜索</el-button>
        </div>
        <div class="search-button">
          <el-button type="success" icon="el-icon-plus" @click="openAddTeacherModel">新增</el-button>
        </div>
      </div>
    </div>
    <div class="table-menu">
      <div class="table">
        <el-table
            :data="showData"
            border
            v-loading="loading"
            style="width: 100%">
          <el-table-column
              prop="name"
              label="姓名"
              align="center">
          </el-table-column>
          <el-table-column
              prop="workNumber"
              label="工号"
              align="center">
          </el-table-column>
          <el-table-column
              prop="college"
              label="所属学院"
              align="center">
          </el-table-column>
          <el-table-column
              prop="position"
              label="职位"
              align="center">
          </el-table-column>
          <el-table-column
              label="操作"
              align="center">
            <template slot-scope="scope">
              <div class="link-layout">
                <el-link type="primary" @click="openUpdateTeacherModel(scope.row)">修改信息</el-link>
                <el-link type="primary" @click="clickDeleteTeacher(scope.row.id)">删除</el-link>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="block">
      <el-pagination
          :page-size="pageSize"
          :pager-count="pageCount"
          layout="prev, pager, next"
          :total="total"
          :current-page="currentPage"
          @current-change="currentPageButton">
      </el-pagination>
    </div>
    <div style="position: absolute;z-index: 2;">
      <updateTeacherModel v-show="isUpdateTeacherModelShow" ref="updateTeacherModel"
                          v-on:closeUpdateTeacherModel="closeUpdateTeacherModel"
                          v-on:updateRefresh="searchButton"/>
    </div>
    <div style="position: absolute;z-index: 2;">
      <addTeacherModel v-show="isAddTeacherModelShow" ref="addTeacherModel"
                          v-on:closeAddTeacherModel="closeAddTeacherModel"
                          v-on:addRefresh="searchButton"/>
    </div>
  </div>
</template>

<script>
import updateTeacherModel from "@/components/model/update_teacher_model"
import addTeacherModel from "@/components/model/add_teacher_model"

export default {
name: "teacher_manager",
  data(){
    return{
      showData: [
        {
          id: 1,
          name: '刘恩泽',
          mobile: '11111111111',
          email: '135145345@qq.com',
          workNumber: '00093450',
          edu: '本科',
          college: '信息工程学院',
          position: '辅导员',
        }
      ],
      data: [],
      searchParams: {
        name: '',
        workNumber: '',
        position: '',
      },
      total: 1,
      currentPage: 1,
      pageSize: 10,
      pageCount: 7,
      loading: false,
      isUpdateTeacherModelShow: false,
      isAddTeacherModelShow: false,
    }
  },
  methods:{
    openUpdateTeacherModel(teacher){
      this.$refs.updateTeacherModel.teacher = {...teacher}
      this.isUpdateTeacherModelShow = true
    },
    closeUpdateTeacherModel(){
      this.isUpdateTeacherModelShow = false
    },
    openAddTeacherModel(){
      this.isAddTeacherModelShow = true
    },
    closeAddTeacherModel(){
      this.isAddTeacherModelShow = false
    },
    currentPageButton(page){
      this.currentPage = page
      let start = (this.currentPage - 1) * 10
      let end = this.currentPage * 10
      this.showData = this.data.slice(start, end)
    },
    searchButton(){       //todo
      this.loading = true
      let p = new FormData()
      p.append('name',this.searchParams.name)
      p.append('workNumber',this.searchParams.workNumber)
      p.append('position',this.searchParams.position)
      this.$axios({
        method: "POST",
        url: "/selene/teacher/list",
        data: p
      }).then(res=>{
        this.loading = false
        const data = res.data.data
        if (res.data.code !== '200'){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.data = data
        this.total = this.data.length
        this.currentPageButton(1)
      })
    },
    checkInput(){
      this.searchParams.name = this.searchParams.name.replace(/\s+/g,"")
      this.searchParams.workNumber = this.searchParams.workNumber.replace(/\s+/g,"")
      this.searchParams.position = this.searchParams.position.replace(/\s+/g,"")
    },
    clickDeleteTeacher(id){
      this.$confirm('确定删除该教师吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteTeacher(id)
      })
    },
    deleteTeacher(id){    //todo
      this.$axios({
        method:"POST",
        url: "/selene/user/delete_teacher",
        data: {id:id}
      }).then(res=>{
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.searchButton()
      })
    },
  },
  mounted(){

  },
  components: {
    addTeacherModel,
    updateTeacherModel,
  },
}
</script>

<style src="../assets/css/teacher_manager.css" scoped/>
