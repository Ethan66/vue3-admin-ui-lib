<template>
  <div>
    <search-module :search="search" :table="table">
      <template #btn>
        <el-button type="success" @click="onAdd">新 增</el-button>
      </template>
    </search-module>
    <table-module :table="table">
      <template #status="scope">
        <el-tag :type="scope.row.status === '0' ? 'success' : 'danger'">{{
          scope.row.status === '0' ? '正常' : '停用'
        }}</el-tag>
      </template></table-module
    >
    <dialog-module :dialog="$dialog" />
  </div>
</template>

<script setup lang="ts">
import { toRefs, reactive, unref } from 'vue'
import { apiGetUserList } from '@/api/user'
import pageConfig from './config'

// 新增
const onAdd = () => {
  const dialog = unref($dialog)
  dialog.title = '新增'
  dialog.config = configs.dialog
  dialog.data = {}
  // dialog.api = apiAddUser
  dialog.table = table.value
  dialog.show = true
}

// 编辑
const onEdit = (row: object) => {
  const dialog = unref($dialog)
  dialog.title = '编辑'
  dialog.config = configs.dialog
  dialog.data = { ...row }
  // dialog.api = apiEditUser
  dialog.table = table.value
  dialog.show = true
  //   dialog.$onlyRead = true
}

// 删除
const onDel = (val: any) => {
  console.warn('----- my data is val: ', val)
}

// 初始化
const configs = reactive(pageConfig())
configs.table.btn.clicks = [onEdit, onDel] // 给按钮添加事件
const { search, table, $dialog } = toRefs(configs)
search.value.$data['startCallTime,endCallTime'] = ['2023-11-22 00:00:00', '2023-11-23 00:00:00']
search.value.$default = { a: 123 }
configs.table.$api = apiGetUserList // 给表格配置api
configs.table.$onGetData(table.value, 1, search) // 请求表格接口
$dialog.value.labelWidth = '100' // 设置dialog的label-width
$dialog.value['item-width'] = '100%' // 设置dialog的label-width

console.warn('----- my data is configs: ', configs)
</script>

<style lang="scss" scoped></style>
