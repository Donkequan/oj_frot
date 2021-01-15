<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true">
      <el-form-item>
        <el-autocomplete
          v-model="searchObj.qTitle"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          class="inline-input"
          placeholder="question title"
          value-key="q_title" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="searchObj.qLevel" clearable placeholder="level">
          <el-option value="1" label="primary"/>
          <el-option value="2" label="middle"/>
          <el-option value="3" label="advanced"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select v-model="searchObj.qPublic" clearable placeholder="public">
          <el-option value="0" label="private"/>
          <el-option value="1" label="public"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData()">find</el-button>
        <el-button type="default" @click="resetData()">clear</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" border stripe>
      <el-table-column label="#" width="50">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="qtitle" label="title"/>
      <el-table-column prop="qtype" label="type"/>
      <el-table-column prop="qcourse" label="course"/>
      <el-table-column prop="qlevel" label="level">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.qlevel == 1" type="success" effect="plain">primary</el-tag>
          <el-tag v-if="scope.row.qlevel == 2" effect="plain">middle</el-tag>
          <el-tag v-if="scope.row.qlevel == 3" type="danger" effect="plain">advanced</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="qpublic" label="public">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.qpublic == 0" type="warning" effect="light">private</el-tag>
          <el-tag v-if="scope.row.qpublic == 1">public</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="qcode" label="code file">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.qcode == 0" type="warning" effect="light">no</el-tag>
          <el-tag v-if="scope.row.qcode == 1">yes</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <router-link :to="'/question/edit/'+scope.row.qid">
            <el-button type="primary" size="mini" icon="el-icon-edit">edit</el-button>
          </router-link>
          <router-link :to="'/question/practice/'+scope.row.qid">
            <el-button type="success" size="mini" icon="el-icon-edit-outline">practice</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeById(scope.row.qid)">delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20]"
      style="padding: 30px 0; text-align: center;"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="changePageSize"
      @current-change="changeCurrentPage"
    />
  </div>
</template>

<script>
import questiopnApi from '@/api/question'
export default {
  data() {
    return {
      list: [],
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {}// 查询条件
    }
  },

  // 页面渲染成功后获取数据
  created() {
    this.fetchData()
  },

  // 定义方法
  methods: {
    fetchData() {
      // 调用api
      questiopnApi.pageList(this.page, this.limit, this.searchObj).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },
    // 每页记录数改变，size：回调参数，表示当前选中的“每页条数”
    changePageSize(size) {
      this.limit = size
      this.fetchData()
    },
    // 改变页码，page：回调参数，表示当前选中的“页码”
    changeCurrentPage(page) {
      this.page = page
      this.fetchData()
    },
    // 根据id删除数据
    removeById(id) {
      // 询问是否删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return questiopnApi.removeById(id)
      }).then(response => {
        // 刷新页面
        this.fetchData()
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
      }).catch((err) => {
        console.log(err)
        if (err === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    },

    // 输入建议
    querySearch(queryString, callback) {
      questiopnApi.selectNameListByKey(queryString).then(response => {
        callback(response.data.titleList)
      })
    },
    // 重置表单
    resetData() {
      this.searchObj = {}
      this.fetchData()
    }
  }
}
</script>
