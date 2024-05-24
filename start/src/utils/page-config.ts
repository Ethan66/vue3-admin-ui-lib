import atrans from 'trans-config'
import type {
  AtransConfig,
  SearchModuleFields,
  TableModuleFields,
  DialogModuleFields,
  AtransItemRes,
  DialogExtraFields
} from 'trans-config'
import * as page from '@/utils/page'

export type AtransSearchRes = SearchModuleFields &
  ExtendSearchModulesFields & {
    [key: string]: AtransItemRes & ExtendItemConfig
  }

export type AtransTableRes = TableModuleFields &
  ExtendTableModuleFields & {
    [key: string]: AtransItemRes & ExtendItemConfig
  }

export type AtransDialogRes = DialogModuleFields & {
  [key: string]: AtransItemRes & ExtendDialogExtraFields
}

export type Atrans$DialogRes = DialogExtraFields & {
  config: DialogModuleFields & {
    [key: string]: AtransItemRes & ExtendDialogExtraFields
  }
}

export type AtransResult = {
  search: AtransSearchRes
  search1: AtransSearchRes
  search2: AtransSearchRes
  search3: AtransSearchRes
  table: AtransTableRes
  table1: AtransTableRes
  table2: AtransTableRes
  table3: AtransTableRes
  dialog: AtransDialogRes
  dialog1: AtransDialogRes
  dialog2: AtransDialogRes
  dialog3: AtransDialogRes
  $dialog: Atrans$DialogRes
  [key: string]: any
}

const atransFn = atrans.create({
  version: 'common',
  moduleFields: {
    search: {
      $search: page.search
    },
    table: {
      $permissions: [],
      $onGetData: page.getTableData,
      $stripe: true,
      $changePage: page.onChangeCurrent,
      $typeIndexFn: page.tableIndex
    }
  },
  extraFields: {
    dialog: {
      $dialog: {
        submit: page.onDialogSubmit
      }
    }
  }
})

/**
 * name: 自定义
 * search/dialog/table的item配置项自定义类型
 */
type ExtendItemConfig = {
  clicks?: ((val: any) => void)[]
  shows?: ((val: any) => void)[]
  disableds?: ((val: any) => void)[]
  $attr?: {
    placeholder: string
    data: any[]
  }
}

/**
 * name: 自定义
 * search模块配置自定义类型
 */
type ExtendSearchModulesFields = {}

/**
 * name: 自定义
 * table模块配置自定义类型
 */
type ExtendTableModuleFields = {
  $stripe: boolean
}

/**
 * name: 自定义
 * dialog模块配置自定义类型
 */
type ExtendDialogExtraFields = {
  $attr: {
    data: any[]
    disabled: boolean
  }
  $on: {
    onChange: (val: any) => void
  }
}

export default atransFn as unknown as (config: AtransConfig) => AtransResult
