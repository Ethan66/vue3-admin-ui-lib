const options = {
  sex: [
    { label: '男', value: '0' },
    { label: '女', value: '1' }
  ],
  status: [
    { label: '正常', value: '0' },
    { label: '停用', value: '1' }
  ]
}

import { pageConfig } from '@/utils'
export default () =>
  pageConfig({
    dialog: {
      nickName: { label: '用户姓名', rule: true },
      userName: { label: '用户账号', rule: true },
      phonenumber: {
        label: '手机号码',
        rule: {
          pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          message: '请输入正确的手机号码'
        }
      },
      // deptId: { label: '归属部门', slot: 'dept' },
      status: { label: '用户状态', el: 'radio', options: options.status },
      roleIds: {
        label: '角色',
        el: 'select',
        options: [{ label: '123123', value: '23423' }],
        multiple: true
      },
      roleIds1: {
        label: '角色',
        el: 'checkbox',
        options: [{ label: '123123', value: '23423' }],
        multiple: true
      }
    }
  })
