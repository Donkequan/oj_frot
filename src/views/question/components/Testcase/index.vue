<template>
  <div>
    <div style="margin:0 0 20px 0;">
      <el-button type="primary" @click="addTestcase()">Add test case</el-button>
    </div>
    <el-table :data="list" border stripe>
      <el-table-column label="#" width="50">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="input" label="Input"/>
      <el-table-column prop="output" label="Output"/>
      <el-table-column label="operation" width="300" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editTestcase(scope.row.tcid)">edit</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeById(scope.row.tcid)">delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:center">
      <el-button type="primary" style="margin:20px 20px 20px 20px;" @click="finish()">finish</el-button>
    </div>

    <testcase-form ref="testcaseForm" />
  </div>
</template>

<script>
import testcaseApi from '@/api/testcase'

import TestcaseForm from '@/views/question/components/Testcase/form'

export default {
  components: { TestcaseForm },
  data() {
    return {
      list: [],
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10 // 每页记录数
    }
  },
  created() {
    if (this.$route.params.id) {
      this.fetchDataByQid()
    }
  },
  methods: {
    fetchDataByQid() {
      testcaseApi.getByQid(this.$parent.qid).then(response => {
        this.list = response.data.item
      })
    },
    addTestcase() {
      this.$refs.testcaseForm.open()
    },
    editTestcase(tcid) {
      this.$refs.testcaseForm.open(tcid)
    },
    removeById(tcid) {
      testcaseApi.removeById(tcid).then(response => {
        this.fetchDataByQid()
      })
    },
    finish() {
      this.$parent.active = 2
      this.$router.push({ path: '/question' })
    }
  }
}
</script>

