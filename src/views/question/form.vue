<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px" style="width:80%;">
      <el-form-item label="question title">
        <el-input v-model="question.qtitle" />
      </el-form-item>
      <el-form-item label="question description">
        <el-input v-model="question.qdescription" :rows="10" type="textarea"/>
      </el-form-item>
      <el-form-item label="hint">
        <el-input v-model="question.qhint" :rows="2" type="textarea"/>
      </el-form-item>
      <el-form-item label="max time" style="width:20%;">
        <el-col :span="20">
          <el-input v-model="question.qtime"/>
        </el-col>
        <el-col :span="2">ms</el-col>
      </el-form-item>
      <el-form-item label="course code" style="width:20%;">
        <el-input v-model="question.qcourse"/>
      </el-form-item>
      <el-form-item label="question type" style="width:20%;">
        <el-input v-model="question.qtype"/>
      </el-form-item>
      <el-form-item label="test input" style="width:20%;">
        <el-input v-model="question.input"/>
      </el-form-item>
      <el-form-item label="test output" style="width:20%;">
        <el-input v-model="question.output"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" style="text-align: center;" @click="saveOrUpdate()">save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import questionApi from '@/api/question'
export default {
  data() {
    return {
    // 初始化讲师默认数据
      question: {},
      testCase: {},
      saveBtnDisabled: false // 保存按钮是否禁用，防止表单重复提交
    }
  },
  created() {
    if (this.$route.params.id) {
      this.fetchDataById(this.$route.params.id)
    }
  },
  methods: {
    saveOrUpdate() {
      // 禁用保存按钮
      this.saveBtnDisabled = true
      if (!this.question.qid) {
        this.saveData()
      } else {
        this.updateData()
      }
    },
    // 新增讲师
    saveData() {
      // debugger
      questionApi.save(this.question).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })
        this.$router.push({ path: '/question' })
      })
    },
    // 根据id查询记录
    fetchDataById(id) {
      questionApi.getById(id).then(response => {
        this.question = response.data.item
      })
    },
    // 根据id更新记录
    updateData() {
      // teacher数据的获取
      questionApi.updateById(this.question).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })
        this.$router.push({ path: '/question' })
      })
    }
  }
}
</script>
