<template>
  <div class="app-container">

    <!-- 步骤导航 -->
    <h2 style="text-align: center;">Create new question</h2>
    <el-steps :active="active" finish-status="success" simple style="margin-bottom: 40px">
      <el-step title="Create basic information" />
      <el-step title="Create test case" />
    </el-steps>

    <!-- 步骤内容 -->
    <!-- step1：Info -->
    <info v-if="active === 0" />

    <!-- step2：ChapterIndex -->
    <testcase v-if="active === 1 || active === 2" />

  </div>
</template>

<script>
// 引入子组件
import Info from '@/views/question/components/Info'
import Testcase from '@/views/question/components/Testcase'

export default {
  components: { Info, Testcase }, // 注册子组件
  data() {
    return {
      active: 0,
      qid: null
    }
  }
}
</script>

