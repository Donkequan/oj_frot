import request from '@/utils/request'

export default {
  save(testcase) {
    return request({
      url: `/testcase/saveTestcase`,
      method: 'post',
      data: testcase
    })
  },
  updateById(testcase) {
    return request({
      url: '/testcase/update',
      method: 'put',
      data: testcase
    })
  },
  getByQid(qid) {
    return request({
      url: `/testcase/getlist/${qid}`,
      method: 'get'
    })
  },
  getById(id) {
    return request({
      url: `/testcase/getById/${id}`,
      method: 'get'
    })
  },
  removeById(id) {
    return request({
      url: `/testcase/remove/${id}`,
      method: 'delete'
    })
  }
}
