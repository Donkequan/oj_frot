import request from '@/utils/request'

export default {
  pageList(page, limit, searchObj) {
    return request({
      url: `/question/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  removeById(id) {
    return request({
      url: `/question/remove/${id}`,
      method: 'delete'
    })
  },
  save(question) {
    return request({
      url: '/question/saveQuestion',
      method: 'post',
      data: question
    })
  },
  getById(id) {
    return request({
      url: `/question/get/${id}`,
      method: 'get'
    })
  },
  updateById(question) {
    return request({
      url: '/question/update',
      method: 'put',
      data: question
    })
  },
  selectNameListByKey(key) {
    return request({
      url: `/question/list/name/${key}`,
      method: 'get'
    })
  }
}
