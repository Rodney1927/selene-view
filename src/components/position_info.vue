<template>
  <div>
    <div class="search-menu">
      <div class="search">
        <el-input v-model="searchParams.companyName" placeholder="按企业名称搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-input v-model="searchParams.name" placeholder="按职位名称搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-input v-model="searchParams.place" placeholder="按工作地点搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <el-input v-model="searchParams.salary" placeholder="按薪资搜索"
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
              prop="name"
              label="职位名称"
              align="center">
          </el-table-column>
          <el-table-column
              prop="place"
              label="工作地点"
              align="center">
          </el-table-column>
          <el-table-column
              prop="salary"
              label="薪资"
              align="center">
          </el-table-column>
          <el-table-column
              label="企业名称"
              align="center">
            <template slot-scope="scope">
              <el-link type="primary" @click="openCompanyInfoModel(scope.row.company)">{{scope.row.company.name}}</el-link>
            </template>
          </el-table-column>
          <el-table-column
              prop="date"
              label="发布日期"
              align="center">
          </el-table-column>
          <el-table-column
              label="操作"
              align="center">
            <template slot-scope="scope">
              <el-link type="primary" @click="openApplyPositionModel(scope.row)">查看详情</el-link>
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
      <applyPositionModel v-show="isApplyPositionModelShow" ref="applyPositionModel"
                        v-on:closeApplyPositionModel="closeApplyPositionModel"
                        v-on:applyRefresh="searchButton"/>
    </div>
    <div style="position: absolute;z-index: 2;">
      <companyInfoModel v-show="isCompanyInfoModelShow" ref="companyInfoModel"
                          v-on:closeCompanyInfoModel="closeCompanyInfoModel"/>
    </div>
  </div>
</template>

<script>
import applyPositionModel from "@/components/model/apply_position_model";
import companyInfoModel from "@/components/model/company_info_model"

export default {
name: "position_info",
  data(){
    return{
      showData: [
        {
          id: 1,
          name: '程序员',
          company:{
            id: 1,
            name: '大连边城集团',
            email: '135135153@qq.com',
            tel: '11111111111',
            address: '大连',
            remark: '',
          },
          place: '软件园',
          salary: '5000',
          content: '1',
          remark: '1',
          date: '2021-05-01',
        }
      ],
      searchParams: {
        name: '',
        companyName: '',
        place: '',
        salary: '',
      },
      total: 1,
      currentPage: 1,
      pageSize: 10,
      pageCount: 7,
      loading: false,
      isApplyPositionModelShow: false,
      isCompanyInfoModelShow: false,
    }
  },
  methods:{
    openApplyPositionModel(position){
      this.$refs.applyPositionModel.position = {...position}
      this.isApplyPositionModelShow = true
    },
    closeApplyPositionModel(){
      this.isApplyPositionModelShow = false
    },
    openCompanyInfoModel(company){
      this.$refs.companyInfoModel.company = {...company}
      this.isCompanyInfoModelShow = true
    },
    closeCompanyInfoModel(){
      this.isCompanyInfoModelShow = false
    },
    checkInput(){
      this.searchParams.name = this.searchParams.name.replace(/\s+/g,"")
      this.searchParams.companyName = this.searchParams.companyName.replace(/\s+/g,"")
      this.searchParams.place = this.searchParams.place.replace(/\s+/g,"")
      this.searchParams.salary = this.searchParams.salary.replace(/\s+/g,"")
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
      p.append('companyName',this.searchParams.companyName)
      p.append('place',this.searchParams.place)
      p.append('salary',this.searchParams.salary)
      this.$axios({
        method: "POST",
        url: "/selene/user/company_list",
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
    applyPositionModel,
    companyInfoModel,
  },
}
</script>

<style src="../assets/css/position_info.css" scoped/>
