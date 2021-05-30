<template>
  <div>
    <div class="search-menu">
      <div class="search">
        <el-input v-model="searchParams.name" placeholder="按企业名称搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="searchButton">搜索</el-button>
        </div>
        <div class="search-button">
          <el-button type="success" icon="el-icon-plus" @click="openAddCompanyModel">新增</el-button>
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
              label="企业名称"
              align="center">
          </el-table-column>
          <el-table-column
              prop="address"
              label="企业地址"
              align="center">
          </el-table-column>
          <el-table-column
              prop="tel"
              label="企业电话"
              align="center">
          </el-table-column>
          <el-table-column
              prop="email"
              label="企业邮箱"
              align="center">
          </el-table-column>
          <el-table-column
              label="操作"
              align="center">
            <template slot-scope="scope">
              <div class="link-layout">
                <el-link type="primary" @click="openUpdateCompanyModel(scope.row)">修改信息</el-link>
                <el-link type="primary" @click="clickResetPassword(scope.row.id)">重置密码</el-link>
                <el-link type="primary" @click="clickDeleteCompany(scope.row.id)">删除</el-link>
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
      <updateCompanyModel v-show="isUpdateCompanyModelShow" ref="updateCompanyModel"
                          v-on:closeUpdateCompanyModel="closeUpdateCompanyModel"
                          v-on:updateRefresh="searchButton"/>
    </div>
    <div style="position: absolute;z-index: 2;">
      <addCompanyModel v-show="isAddCompanyModelShow" ref="addCompanyModel"
                          v-on:closeAddCompanyModel="closeAddCompanyModel"
                          v-on:addRefresh="searchButton"/>
    </div>
  </div>
</template>

<script>
import updateCompanyModel from "@/components/model/update_company_model"
import addCompanyModel from "@/components/model/add_company_model"

export default {
name: "company_manager",
  data(){
    return{
      showData: [
        {
          id: 1,
          username: 'dlbc123',
          name: '大连边城集团',
          address: '大连',
          tel: '15604086911',
          email: '916513351@qq.com',
          remark: null,
        }
      ],
      searchParams: {
        name: '',
      },
      lastSearchParams: {},
      total: 1,
      currentPage: 1,
      pageSize: 10,
      pageCount: 7,
      loading: false,
      isUpdateCompanyModelShow: false,
      isAddCompanyModelShow: false,
    }
  },
  methods:{
    openUpdateCompanyModel(company){
      this.$refs.updateCompanyModel.company = {...company}
      this.isUpdateCompanyModelShow = true
    },
    closeUpdateCompanyModel(){
      this.isUpdateCompanyModelShow = false
    },
    openAddCompanyModel(){
      this.isAddCompanyModelShow = true
    },
    closeAddCompanyModel(){
      this.isAddCompanyModelShow = false
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
        url: "/selene/user/company_list",
        data: p
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
    clickDeleteCompany(id){
      this.$confirm('确定删除该企业吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteCompany(id)
      })
    },
    deleteCompany(id){     //todo
      let p = new FormData()
      p.append('id',id)
      this.$axios({
        method:"POST",
        url: "/selene/company/delete",
        data: p
      }).then(res=>{
        if (res.data.code !== '200'){
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
    clickResetPassword(id){
      this.$confirm('确定重置该企业密码吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.resetPassword(id)
      })
    },
    resetPassword(id){      //todo
      let p = new FormData()
      p.append('id',id)
      p.append('password','selene666')
      this.$axios({
        method:"POST",
        url: "/selene/company/reset_password",
        data: p
      }).then(res=>{
        if (res.data.code !== '200'){
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
    addCompanyModel,
    updateCompanyModel,
  },
}
</script>

<style src="../assets/css/company_manager.css" scoped/>
