import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/article',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/article',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/article',
    method: 'put',
    data
  })
}

export function getArticleTypes() {
  return request({
    url: 'api/article/types',
    method: 'get'
  })
}

export function getArticleKinds() {
  return request({
    url: 'api/article/kinds',
    method: 'get'
  })
}

export default { add, edit, del }
