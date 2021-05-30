<template>
  <div>
    <div class="search-menu">
      <div class="search">
        <el-input v-model="searchParams.name" placeholder="按职位名称搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-button type="primary" icon="el-icon-search" @click="searchButton">搜索</el-button>
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
              label="职位名称"
              align="center">
            <template slot-scope="scope">
              <el-link type="primary" @click="openPositionInfoModel(scope.row.position)">{{scope.row.position.name}}</el-link>
            </template>
          </el-table-column>
          <el-table-column
              label="申请人"
              align="center">
            <template slot-scope="scope">
              <el-link type="primary" @click="openStudentInfoModel(scope.row.student)">{{scope.row.student.name}}</el-link>
            </template>
          </el-table-column>
          <el-table-column
              prop="interviewDate"
              label="面试日期"
              align="center">
          </el-table-column>
          <el-table-column
              label="操作"
              align="center">
            <template slot-scope="scope">
              <div class="link-layout">
                <div>
                  <el-link type="primary" @click="clickAgreeInterview(scope.row.id)">通过</el-link>
                </div>
                <div>
                  <el-link type="primary" @click="clickRefuseInterview(scope.row.id)">拒绝</el-link>
                </div>
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
      <positionInfoModel v-show="isPositionInfoModelShow" ref="positionInfoModel"
                         v-on:closePositionInfoModel="closePositionInfoModel"/>
    </div>
    <div style="position: absolute;z-index: 2;">
      <studentInfoModel v-show="isStudentInfoModelShow" ref="studentInfoModel"
                        v-on:closeStudentInfoModel="closeStudentInfoModel"/>
    </div>
  </div>
</template>

<script>
import positionInfoModel from "@/components/model/position_info_model";
import studentInfoModel from "@/components/model/student_info_model"

export default {
name: "interview_manager",
  data(){
    return{
      showData: [
        {
          position: {
            id: 1,
            name: '程序员',
            place: '软件园',
            salary: '5000',
            content: '写程序',
            remark: '1',
          },
          student: {
            id: 1,
            name: '赵峻捷',
            tel: '13238041630',
            email: '916513351@qq.com',
            address: '大连',
            sex: '男',
            class:{
              id:1,
              name: '计科172',
            },
            teacher:{
              id: 1,
              name: '刘恩泽',
            },
          },
          date: '2021-05-11',
          interviewDate: '2021-5-21',
          status: 2,
        }
      ],
      searchParams: {
        name: '',
      },
      total: 1,
      currentPage: 1,
      pageSize: 10,
      pageCount: 7,
      loading: false,
      isPositionInfoModelShow: false,
      isStudentInfoModelShow: false,
    }
  },
  methods:{
    clickAgreeInterview(id){
      this.$confirm('确定通过该面试吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.agreeInterview(id)
      })
    },
    agreeInterview(id){     //todo
      let p = new FormData()
      p.append('id',id)
      this.$axios({
        method:"POST",
        url: "/selene/interview/agree",
        data: p
      }).then(res=>{
        if (res.data.code !== '200'){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.$message({
          message: '面试已通过',
          type: 'success'
        });
        this.searchButton()
      })
    },
    clickRefuseInterview(id){
      this.$confirm('确定拒绝该面试吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.refuseInterview(id)
      })
    },
    refuseInterview(id){     //todo
      let p = new FormData()
      p.append('id',id)
      this.$axios({
        method:"POST",
        url: "/selene/interview/refuse",
        data: p
      }).then(res=>{
        if (res.data.code !== '200'){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.$message({
          message: '面试已拒绝',
          type: 'success'
        });
        this.searchButton()
      })
    },
    openStudentInfoModel(student){
      this.$refs.studentInfoModel.student = {...student}
      this.isStudentInfoModelShow = true
    },
    closeStudentInfoModel(){
      this.isStudentInfoModelShow = false
    },
    openPositionInfoModel(position){
      this.$refs.positionInfoModel.position = {...position}
      this.isPositionInfoModelShow = true
    },
    closePositionInfoModel(){
      this.isPositionInfoModelShow = false
    },
    checkInput(){
      this.searchParams.name = this.searchParams.name.replace(/\s+/g,"")
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
      this.$axios({
        method: "POST",
        url: "/selene/",
        data: p
      }).then(res=>{
        this.loading = false
        const data = res.data.data
        if (res.data.code !== '200'){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.showData = data
        this.total = this.data.length
        this.currentPageButton(1)
      })
    },
  },
  components:{
    positionInfoModel,
    studentInfoModel,
  },
  mounted() {

  },
}
</script>

<style src="../assets/css/interview_manager.css" scoped/>
