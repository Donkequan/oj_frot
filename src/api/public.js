import request from '@/utils/request'

export default {
  allPageList(page, limit, searchObj) {
    return request({
      url: `/question/public/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  hotPageList(page, limit, searchObj) {
    return request({
      url: `/question/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  }
}
