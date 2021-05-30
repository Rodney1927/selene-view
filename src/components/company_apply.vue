<template>
  <div>
    <div class="search-menu">
      <div class="search">
        <el-input v-model="searchParams.name" placeholder="按职位名称搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-select v-model="searchParams.status" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
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
              prop="date"
              label="申请日期"
              align="center">
          </el-table-column>
                    <el-table-column
                        label="状态"
                        align="center">
                      <template slot-scope="scope">
                        <div v-if="scope.row.status === 0">
                          <el-tag type="warning">待查看</el-tag>
                        </div>
                        <div v-else-if="scope.row.status === 1">
                          <el-tag type="danger">已拒绝</el-tag>
                        </div>
                        <div v-else-if="scope.row.status === 2">
                          <el-tag>待面试</el-tag>
                        </div>
                        <div v-else-if="scope.row.status === 3">
                          <el-tag type="success">已录用</el-tag>
                        </div>
                        <div v-else-if="scope.row.status === 4">
                          <el-tag type="danger">未录用</el-tag>
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
import studentInfoModel from "@/components/model/student_info_model";

export default {
name: "company_apply",
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
          status: 3,
        }
      ],
      options: [
        {
          value: 6,
          label: '查看全部'
        },
        {
          value: 0,
          label: '待查看'
        },
        {
          value: 1,
          label: '已拒绝'
        },
        {
          value: 2,
          label: '待面试'
        },
        {
          value: 3,
          label: '已录用'
        },
        {
          value: 4,
          label: '未录用'
        },
        {
          value: 5,
          label: '已撤回'
        },
      ],
      searchParams: {
        name: '',
        status: 6,
      },
      total: 1,
      currentPage: 1,
      pageSize: 9,
      pageCount: 7,
      loading: false,
      isPositionInfoModelShow: false,
      isStudentInfoModelShow: false,
    }
  },
  methods:{
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
      let start = (this.currentPage - 1) * 9
      let end = this.currentPage * 9
      this.showData = this.data.slice(start, end)
    },
    searchButton(){       //todo
      this.loading = true
      let p = new FormData()
      p.append('name',this.searchParams.name)
      p.append('status',this.searchParams.status)
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

<style src="../assets/css/company_apply.css" scoped/>
