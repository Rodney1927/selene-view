<template>
  <div>
    <div class="search-menu">
      <div class="search">
        <el-input v-model="searchParams.name" placeholder="按姓名搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-input v-model="searchParams.studentId" placeholder="按学号搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="searchButton">搜索</el-button>
        </div>
        <div class="search-button">
          <el-button type="success" icon="el-icon-plus" @click="openAddStudentModel">新增</el-button>
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
              prop="studentId"
              label="学号"
              align="center">
          </el-table-column>
          <el-table-column
              label="性别"
              align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.sex === '男'">男</div>
              <div v-if="scope.row.sex === '女'">女</div>
              <div v-if="scope.row.sex === null">未填写</div>
            </template>
          </el-table-column>
          <el-table-column
              label="班级"
              align="center">
            <template slot-scope="scope">
              <div v-if="Object.keys(scope.row.class).length !== 0">{{scope.row.class.name}}</div>
              <div v-else>未填写</div>
            </template>
          </el-table-column>
          <el-table-column
              label="教师"
              align="center">
            <template slot-scope="scope">
              <div v-if="Object.keys(scope.row.teacher).length !== 0">{{scope.row.teacher.name}}</div>
              <div v-else>未填写</div>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              align="center">
            <template slot-scope="scope">
              <div class="link-layout">
                <el-link type="primary" @click="openUpdateStudentModel(scope.row)">修改信息</el-link>
                <el-link type="primary" @click="clickResetPassword(scope.row)">重置密码</el-link>
                <el-link type="primary" @click="clickDeleteStudent(scope.row.id)">删除</el-link>
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
      <updateStudentModel v-show="isUpdateStudentModelShow" ref="updateStudentModel"
                          v-on:closeUpdateStudentModel="closeUpdateStudentModel"
                          v-on:updateRefresh="searchButton"/>
    </div>
    <div style="position: absolute;z-index: 2;">
      <addStudentModel v-show="isAddStudentModelShow" ref="addStudentModel"
                          v-on:closeAddStudentModel="closeAddStudentModel"
                          v-on:addRefresh="searchButton"/>
    </div>
  </div>
</template>

<script>
import updateStudentModel from "@/components/model/update_student_model"
import addStudentModel from "@/components/model/add_student_model"

export default {
name: "student_manager",
  data(){
    return{
      showData: [
        {
          id: 1,
          name: '赵峻捷',
          studentId: '17421044',
          tel: '13238041630',
          email: '916513351@qq.com',
          address: '大连',
          sex: null,
          class: {},
          teacher: {},
          /*class: {
            id: 1,
            name: '计科172',
          },
          teacher: {
            id: 1,
            name: '刘恩泽',
            workNumber: '11111111',
          },*/
        }
      ],
      data: [],
      searchParams: {
        name: '',
        studentId: '',
      },
      total: 1,
      currentPage: 1,
      pageSize: 10,
      pageCount: 7,
      loading: false,
      isUpdateStudentModelShow: false,
      isAddStudentModelShow: false,
    }
  },
  methods:{
    checkInput(){
      this.searchParams.name = this.searchParams.name.replace(/\s+/g,"")
      this.searchParams.studentId = this.searchParams.studentId.replace(/\s+/g,"")
    },
    openUpdateStudentModel(student){
      this.$refs.updateStudentModel.student = {...student}
      if(student.sex !== null){
        this.$refs.updateStudentModel.sex = student.sex
      }
      if(Object.keys(student.class).length !== 0){
        let p = {
          id: student.class.id,
          label: student.class.name,
        }
        this.$refs.updateStudentModel.classShow.push(p)
        this.$refs.updateStudentModel.c = student.class.id
      }
      if(Object.keys(student.teacher).length !== 0){
        let t = {
          id: student.teacher.id,
          label: student.teacher.name,
        }
        this.$refs.updateStudentModel.teachersShow.push(t)
        this.$refs.updateStudentModel.teacher = student.teacher.id
      }
      this.isUpdateStudentModelShow = true
    },
    closeUpdateStudentModel(){
      this.isUpdateStudentModelShow = false
    },
    openAddStudentModel(){
      this.isAddStudentModelShow = true
    },
    closeAddStudentModel(){
      this.isAddStudentModelShow = false
    },
    currentPageButton(page){
      this.currentPage = page
      let start = (this.currentPage - 1) * 10
      let end = this.currentPage * 10
      this.showData = this.data.slice(start, end)
    },
    searchButton(){       //todo
      this.loading = true
      this.$axios({
        method: "POST",
        url: "/selene/user/student_list",
        data: this.searchParams
      }).then(res=>{
        this.loading = false
        const data = res.data.data
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.data = data
        this.total = this.data.length
        this.currentPageButton(1)
      })
    },
    clickDeleteStudent(id){
      this.$confirm('确定删除该学生吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteStudent(id)
      })
    },
    deleteStudent(id){     //todo
      let p = new FormData()
      p.append('id',id)
      this.$axios({
        method:"POST",
        url: "/selene/student/delete",
        data: p
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
    clickResetPassword(student){
      this.$confirm('确定重置该学生密码吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.resetPassword(student)
      })
    },
    resetPassword(student){      //todo
      let p = new FormData()
      p.append('id',student.id)
      p.append('password',student.studentId)
      this.$axios({
        method:"POST",
        url: "/selene/student/reset_password",
        data: p
      }).then(res=>{
        if (res.data.code !== 200){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.$message({
          message: '重置成功',
          type: 'success'
        });
      })
    },
  },
  mounted(){

  },
  components: {
    addStudentModel,
    updateStudentModel,
  },
}
</script>

<style src="../assets/css/student_manager.css" scoped/>