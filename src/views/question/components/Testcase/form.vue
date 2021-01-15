<template>

  <!-- 添加和修改章节表单 -->
  <el-dialog :visible="dialogVisible" title="Add test case" @close="close()">
    <el-form label-width="120px">
      <el-form-item label="Input">
        <el-input v-model="testcase.input"/>
      </el-form-item>
      <el-form-item label="Output">
        <el-input v-model="testcase.output"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close()">取 消</el-button>
      <el-button type="primary" @click="save()">确 定</el-button>
    </div>
  </el-dialog>

</template>

<script>
import testcaseApi from '@/api/testcase'

export default {
  data() {
    return {
      dialogVisible: false, // 是否显示对话框
      testcase: {}
    }
  },

  methods: {
    // 显示对话框
    open(tcid) {
      this.dialogVisible = true
      if (tcid) {
        testcaseApi.getById(tcid).then(response => {
          this.testcase = response.data.item
        })
      }
    },
    // 关闭对话框
    close() {
      this.dialogVisible = false
      this.resetForm()
    },
    // 重置表单
    resetForm() {
      this.testcase = {
      }
    },
    save() {
      if (!this.testcase.tcid) {
        // save
        this.testcase.qid = this.$parent.$parent.qid
        testcaseApi.save(this.testcase).then(response => {
          this.$parent.fetchDataByQid()
          this.close()
        })
      } else {
        // update
        testcaseApi.updateById(this.testcase).then(response => {
          this.$parent.fetchDataByQid()
          this.close()
        })
      }
    }
  }
}
</script>
