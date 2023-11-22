import { reactive, unref, toRefs } from 'vue'
import type { ToRefs } from 'vue'
import type { DialogExtraFields, TableModuleFields } from 'trans-config'
import type { AtransResult } from './page-config'
import { ElMessageBox, ElMessage } from 'element-plus'

/**
 * name search组件搜索方法
 * @param value 筛选条件
 * @param tableConfig table配置
 */
export const search = (value: object, tableConfig: TableModuleFields) => {
  const table = unref(tableConfig)
  table.$searchValue = value
  table.$onGetData(table, 1)
}

/**
 * name 表格请求接口
 * @param tableConfig table配置
 * @param curPage 搜索哪一页数据
 * @returns Promise，可以.then继续执行之后的操作，如对修改表格数据
 */
export const getTableData = (
  tableConfig: TableModuleFields,
  curPage?: number,
  searchConfig?: any
) => {
  const table = unref(tableConfig)
  if (searchConfig) {
    const search = unref(searchConfig)
    const value = { ...(search.$default || {}), ...search.$data }
    Object.keys(value).forEach((key) => {
      if (/\w+,\w+/.test(key)) {
        const tmpKeys = key.split(',')
        const tmp = value[key] || []
        value[tmpKeys[0]] = tmp[0]
        value[tmpKeys[1]] = tmp[1]
        delete value[key]
      }
    })
    table.$searchValue = { ...(value || search) }
  }
  curPage && table.$pages.current && (table.$pages.current = curPage)

  table.$loading = true
  return table
    .$api({
      ...table.$searchValue,
      ...{
        currentPage: curPage || table.$pages.current,
        pageSize: table.$pages.pageSize
      }
    })
    .then((res) => {
      const result = res as {
        data: { list: {}[]; page: { total: number } }
        code: string
        msg: string
      }
      table.$loading = false
      table.$data = result.data.list
      table.$pages.total = result.data.page.total
    })
}

/**
 *
 * @param table table配置
 * @param curPage 跳到哪一页
 */
export const onChangeCurrent = (table: TableModuleFields, curPage: number) => {
  table.$onGetData(table, curPage)
}

/**
 *
 * @param value 对话框form表单数据
 * @param dialog dialog配置，拿到提交表单的api接口
 * @param table table配置，请求对话框接口后刷新表格
 * @returns Promise，可以.then继续执行之后的操作
 */
export const onDialogSubmit = (
  value: object,
  dialog: DialogExtraFields,
  table: TableModuleFields
) => {
  return dialog.api?.(value).then(() => {
    dialog.show = false
    table.$onGetData(table)
  })
}

/**
 * name: 表格索引根据页码自增
 * @param tableConfig table配置
 * @param index
 */
export function tableIndex(tableConfig: TableModuleFields, index: number) {
  const table = unref(tableConfig)
  return table.$pages.pageSize * (table.$pages.current - 1) + index + 1
}

/**
 * 初始化页面方法
 * @param config 自定义配置项
 * @param tableApi table表格请求接口
 * @param btns 表格配置的按钮事件
 * @returns toRefs后的配置
 */
export const onInit = (
  config: AtransResult,
  tableApi?: (query: any) => Promise<object>,
  btns?: ((val: any) => void)[]
): ToRefs<AtransResult> => {
  const configs = reactive(config)
  configs.table && tableApi && (configs.table.$api = tableApi)
  configs.table && (config.table.btn.clicks = btns)
  return toRefs(configs)
}

/**
 *
 * @param param0 msg: 警告标题
 *  success: 请求接口
 *  data: 请求接口数据
 *  fail: 失败回调
 * @returns
 */
export const messageBox = ({
  msg,
  success,
  data,
  fail
}: {
  msg: string
  success: (data?: any) => Promise<any>
  data?: object
  fail?: Fun
}): Promise<any> => {
  return ElMessageBox.confirm(msg, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      return success(data).then(() => {
        ElMessage({
          type: 'success',
          message: '操作成功'
        })
      })
    })
    .catch(() => {
      fail?.()
    })
}
