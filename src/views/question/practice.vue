<template>
  <div class="app-container">
    <h1 style="text-align: center;">{{ title }}</h1>
    <h4 style="text-align: center;">{{ description }}</h4>
    <div style="margin-top: 20px">
      <el-radio-group v-model="answer.language" size="medium">
        <el-radio-button label="C++"/>
        <el-radio-button label="Java"/>
        <el-radio-button label="python"/>
        <el-radio-button label="C#"/>
      </el-radio-group>
    </div>
    <el-input v-model="answer.content" :autosize="{ minRows: 5, maxRows: 20}" type="textarea" style="margin-top: 20px"/>
    <el-row style="margin-top: 20px">
      <el-button type="success" size="small">check</el-button>
      <el-button type="primary" size="small" @click="submitAns()">submit</el-button>
    </el-row>
    <el-row style="margin-top: 50px">
      <p>accuracy：</p>
      <el-progress :text-inside="true" :stroke-width="24" :percentage="percentage" status="success" style="width:15%;"/>
    </el-row>

  </div>
</template>

<script>
import questionApi from '@/api/question'
import answerApi from '@/api/answer'

export default {
  data() {
    return {
      title: '',
      description: 'a',
      percentage: 0,
      answer: {
        qid: this.$route.params.id,
        language: 'Java',
        content: `public class Main{
    public static void main(String[] args){
        String input = args[0];


        System.out.print(input);
    }
}`
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      this.fetchDataById(this.$route.params.id)
    }
  },
  methods: {
    // 根据id查询记录
    fetchDataById(id) {
      questionApi.getById(id).then(response => {
        this.title = response.data.item.qtitle
        this.description = response.data.item.qdescription
      })
    },
    submitAns() {
      answerApi.submitAnswer(this.answer).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })
        this.percentage = response.data.percentage
      }, { timeout: 120000 })
    }
  }
}
</script>

<style>
</style>

