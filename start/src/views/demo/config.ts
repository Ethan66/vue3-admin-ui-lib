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
    search: {
      userName: { label: '用户账号', rule: true, clearable: true },
      phonenumber: { label: '手机号码', type: 'number' },
      status: {
        label: '用户状态',
        el: 'select',
        options: options.status,
        clearable: true
      },
      'startCallTime,endCallTime': {
        label: '外呼时间',
        el: 'date',
        type: 'datetimerange',
        defaultTime: [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)],
        default: ['2023-01-01 00:00:00', '2023-01-02 00:00:00'],
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
      // deptId: { label: '部门名称', slot: 'dept', clsName: 'aaa' }
    },
    table: {
      index: {},
      userId: { label: '用户ID', width: 50 },
      name: { label: '用户姓名' },
      roleName: { label: '用户账号' },
      deptName: { label: '部门' },
      status: { label: '用户状态', slot: 'status' },
      // duyanStatus: { label: '度言语音状态', slot: 'duyanStatus', width: 100 },
      createTime: { label: '创建时间', width: 160 },
      btn: {
        width: 120,
        names: ['编辑', '删除'],
        // codes: ['edit', 'add'],
        icons: ['Edit', 'Delete']
        // shows: [row => true, row => true],
        // disableds: [row => false, row => false]
      }
    },
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
    // [
    //   {
    //     nickName: { label: '用户姓名', rule: true },
    //     userName: { label: '用户账号', rule: true },
    //     phonenumber: {
    //       label: '手机号码',
    //       rule: {
    //         pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
    //         message: '请输入正确的手机号码'
    //       }
    //     },
    //     // deptId: { label: '归属部门', slot: 'dept' },
    //     status: { label: '用户状态', el: 'radio', options: options.status },
    //     roleIds: { label: '角色', el: 'select', options: [], multiple: true }
    //   },
    //   {
    //     nickName: { label: '用户姓名', rule: true },
    //     userName: { label: '用户账号', rule: true },
    //     phonenumber: {
    //       label: '手机号码',
    //       rule: {
    //         pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
    //         message: '请输入正确的手机号码'
    //       }
    //     },
    //     // deptId: { label: '归属部门', slot: 'dept' },
    //     status: { label: '用户状态', el: 'radio', options: options.status },
    //     roleIds: { label: '角色', el: 'select', options: [], multiple: true }
    //   }
    // ]
  })
