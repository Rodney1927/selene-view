<template>
  <div>
    <div class="search-menu">
      <div class="search">
        <el-input v-model="searchParams.name" placeholder="按班级名称搜索"
                  @input="checkInput" style="width: 200px" clearable></el-input>
      </div>
      <div class="search">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="searchButton">搜索</el-button>
        </div>
        <div class="search-button">
          <el-button type="success" icon="el-icon-plus" @click="openAddClassModel">新增</el-button>
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
              label="班级名称"
              align="center">
          </el-table-column>
          <el-table-column
              prop="college"
              label="所属学院"
              align="center">
          </el-table-column>
          <el-table-column
              label="操作"
              align="center">
            <template slot-scope="scope">
              <div class="link-layout">
                <el-link type="primary" @click="openUpdateClassModel(scope.row)">修改信息</el-link>
                <el-link type="primary" @click="clickDeleteClass(scope.row)">删除</el-link>
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
      <updateClassModel v-show="isUpdateClassModelShow" ref="updateClassModel"
                          v-on:closeUpdateClassModel="closeUpdateClassModel"
                          v-on:updateRefresh="searchButton"/>
    </div>
    <div style="position: absolute;z-index: 2;">
      <addClassModel v-show="isAddClassModelShow" ref="addClassModel"
                       v-on:closeAddClassModel="closeAddClassModel"
                       v-on:addRefresh="searchButton"/>
    </div>
  </div>
</template>

<script>
import addClassModel from "@/components/model/add_class_model";
import updateClassModel from "@/components/model/update_class_model";

export default {
name: "class_manager",
  data(){
    return{
      showData: [
        {
          id: 1,
          name: '计科172',
          college: '信息工程学院',
        }
      ],
      data: [],
      searchParams: {
        name: '',
      },
      total: 1,
      currentPage: 1,
      pageSize: 10,
      pageCount: 7,
      loading: false,
      isUpdateClassModelShow: false,
      isAddClassModelShow: false,
    }
  },
  methods:{
    openUpdateClassModel(c){
      this.$refs.updateClassModel.c = {...c}
      this.isUpdateClassModelShow = true
    },
    closeUpdateClassModel(){
      this.isUpdateClassModelShow = false
    },
    openAddClassModel(){
      this.isAddClassModelShow = true
    },
    closeAddClassModel(){
      this.isAddClassModelShow = false
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
        url: "/selene/user/class_list",
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
    checkInput(){
      this.searchParams.name = this.searchParams.name.replace(/\s+/g,"")
    },
    clickDeleteClass(id){
      this.$confirm('确定删除该班级吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteClass(id)
      })
    },
    deleteClass(id){    //todo
      this.$axios({
        method:"POST",
        url: "/selene/user/delete_class",
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
    addClassModel,
    updateClassModel,
  },
}
</script>

<style src="../assets/css/class_manager.css" scoped/>
