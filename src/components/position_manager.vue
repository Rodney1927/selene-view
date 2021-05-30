<template>
  <div>
    <div class="search-menu">
      <div class="search">
        <el-input v-model="searchParams.name" placeholder="按职位名称搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="searchButton">搜索</el-button>
        </div>
        <div class="search-button">
          <el-button type="success" icon="el-icon-plus" @click="openAddPositionModel">新增</el-button>
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
              label="职位名称"
              align="center">
          </el-table-column>
          <el-table-column
              prop="place"
              label="工作地点"
              align="center">
          </el-table-column>
          <el-table-column
              label="状态"
              align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 1">
                <el-tag type="success">启用</el-tag>
              </div>
              <div v-else-if="scope.row.status === 0">
                <el-tag type="danger">停用</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              align="center">
            <template slot-scope="scope">
              <div class="link-layout">
                <el-link type="primary" @click="clickUpdateStatus(scope.row.id)">修改状态</el-link>
                <el-link type="primary" @click="clickDeletePosition(scope.row.id)">删除</el-link>
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
      <addPositionModel v-show="isAddPositionModelShow" ref="addPositionModel"
                       v-on:closeAddPositionModel="closeAddPositionModel"
                       v-on:addRefresh="searchButton"/>
    </div>
  </div>
</template>

<script>
import addPositionModel from "@/components/model/add_position_model"

export default {
name: "position_manager",
  data(){
    return{
      showData: [
        {
          id: 1,
          name: '程序员',
          place: '软件园',
          status: 1,
        },
        {
          id: 2 ,
          name: '程序员',
          place: '软件园',
          status: 0,
        }
      ],
      searchParams: {
        name: '',
      },
      total: 1,
      currentPage: 1,
      pageSize: 9,
      pageCount: 7,
      loading: false,
      isAddPositionModelShow: false,
    }
  },
  methods:{
    openAddPositionModel(){
      this.isAddPositionModelShow = true
    },
    closeAddPositionModel(){
      this.isAddPositionModelShow = false
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
    clickDeletePosition(id){
      this.$confirm('确定删除该职位吗?', '提示', {
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
        url: "/selene/position/delete",
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
    clickUpdateStatus(id){
      this.$confirm('确定修改状态吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateStatus(id)
      })
    },
    updateStatus(id){      //todo
      let p = new FormData()
      p.append('id',id)
      p.append('password','selene666')
      this.$axios({
        method:"POST",
        url: "/selene/position/update",
        data: p
      }).then(res=>{
        if (res.data.code !== '200'){
          this.$throw(new Error(res.data.msg))
          return
        }
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      })
    },
  },
  components:{
    addPositionModel,
  },
}
</script>

<style src="../assets/css/position_manager.css" scoped/>
