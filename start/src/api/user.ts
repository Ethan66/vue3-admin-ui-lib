import request from './request'
const base_url = 'http://rap2api.taobao.org/app/mock/116161/bl/api'

export type UserInfo = {
  id: number
  userName: string
  roleIds: number[]
  deptId: number
  isDisable: 0 | 1
}

export function apiGetUserList(data: {}) {
  return request.post({
    url: `${base_url}/getUser`,
    data
  })
}
