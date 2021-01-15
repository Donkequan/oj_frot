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
      <el-form-item label="max time" style="width:30%;">
        <el-col :span="20">
          <el-input v-model="question.qtime"/>
        </el-col>
        <el-col :span="2">ms</el-col>
      </el-form-item>
      <el-form-item label="course code" style="width:30%;">
        <el-input v-model="question.qcourse"/>
      </el-form-item>
      <el-form-item label="question type" style="width:30%;">
        <el-input v-model="question.qtype"/>
      </el-form-item>

      <el-form-item label="question level">
        <el-select v-model="question.qlevel">
          <el-option :value="1" label="primary"/>
          <el-option :value="2" label="middle"/>
          <el-option :value="3" label="advanced"/>
        </el-select>
      </el-form-item>

      <el-form-item label="question public">
        <el-select v-model="question.qpublic">
          <el-option :value="0" label="private"/>
          <el-option :value="1" label="public"/>
        </el-select>
      </el-form-item>

      <el-form-item label="question file">
        <el-radio-group v-model="question.qcode" @change="showfile">
          <el-radio :label="0">No sample</el-radio>
          <el-radio :label="1">Have sample</el-radio>
        </el-radio-group>
      </el-form-item>

      <div v-show="showFileOption">
        <el-form-item label="code language">
          <el-radio-group v-model="question.sampleLanguage" size="medium">
            <el-radio-button label="C++"/>
            <el-radio-button label="Java"/>
            <el-radio-button label="python"/>
            <el-radio-button label="C#"/>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="min value">
          <el-input-number v-model="question.asmin" :min="min" :max="max" label="min value"/>
        </el-form-item>

        <el-form-item label="max value">
          <el-input-number v-model="question.asmax" :min="min" :max="max" label="max value"/>
        </el-form-item>

        <el-form-item label="times">
          <el-input-number v-model="question.times" :min="min" :max="max" label="times"/>
        </el-form-item>

        <el-form-item label="code sample">
          <el-input v-model="question.sample" :autosize="{ minRows: 5, maxRows: 20}" type="textarea" style="margin-top: 20px"/>
        </el-form-item>
      </div>
      <el-form-item>
        <div style="text-align:center">
          <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">next step</el-button>
        </div>
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
      question: {
        qlevel: 1,
        qpublic: 1,
        qcode: 0,
        sampleLanguage: 'Java',
        asmin: 0,
        asmax: 999,
        times: 5,
        sample: `public class Main{
    public static void main(String[] args){
        String input = args[0];


        System.out.print(input);
    }
}`
      },
      file: 0,
      fileList: [],
      showFileOption: 0,
      saveBtnDisabled: false, // 保存按钮是否禁用，防止表单重复提交
      uploadBtnDisabled: false,
      min: 0,
      max: 99999
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
      if (!this.$route.params.id) {
        this.saveData()
      } else {
        this.updateData()
      }
      this.$parent.active = 1
    },
    // 新增question
    saveData() {
      questionApi.save(this.question).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })
        this.$parent.qid = response.data.qid
      })
    },
    // 根据id查询记录
    fetchDataById(id) {
      questionApi.getById(id).then(response => {
        this.question = response.data.item
        this.$parent.qid = this.question.qid
        this.showfile(this.question.qcode)
      })
    },
    // 根据id更新记录
    updateData() {
      this.question.qid = this.$route.params.id
      questionApi.updateById(this.question).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })
      })
    },
    showfile(label) {
      this.showFileOption = label
    }

  }
}
</script>
