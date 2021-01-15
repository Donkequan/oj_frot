import request from '@/utils/request'

export default {
  submitAnswer(answer) {
    return request({
      url: `/answer/judge/java`,
      method: 'post',
      data: answer
    })
  }
}
