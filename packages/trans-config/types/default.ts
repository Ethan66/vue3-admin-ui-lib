export type Fn = () => {}

// defaults配置项
export interface Defaults {
  version?: string
  // dialogBtn?: {
  //   [key: string]: {
  //     name: string
  //     type?: string
  //     color?: string
  //     clickFn?: string
  //     disabled: boolean
  //     show: boolean
  //   }
  // }
  moduleFields: {
    search?: SearchModuleFields
    table?: TableModuleFields
    dialog?: DialogModuleFields
  }
  extraFields: {
    search?: object
    table?: object
    dialog?: {
      $dialog: DialogExtraFields
    }
  }
  items: {
    search: object
    table: object
    dialog: object
  }
  placeholders: string[]
  interceptors?: { [key: string]: InterceptorFn }
}

// 拦截函数
export type InterceptorFn = (config: AtransRes) => any

// 搜索函数
export type SearchFn = (value: object, table: any) => void

// 配置项结果
export type AtransItemRes = {
  show: boolean
  el: string
  field: string
  label: string
  options?: { label: string; value: unknown; disabled?: boolean }[]
  span?: number | string
  slot?: string // 插槽
  default?: unknown // 默认值
}

export type SearchModuleFields = {
  $data: any
  $search: SearchFn
  $inline: boolean
  $default: any // 默认值，非表单里展示的，但是接口请求需要
}

export type DialogModuleFields = {
  $rules?: object
}

export type TableModuleFields = {
  $searchValue?: object
  $permissions: string[]
  $data: {}[]
  $api: (query: any) => Promise<object>
  $onGetData: (
    table: TableModuleFields,
    cur?: number,
    value?: object
  ) => Promise<object>
  $loading: boolean
  $border: boolean
  $pages: {
    current: number
    pageSize: number
    total: number
    pageSizes: number[]
  }
  $typeIndexFn: () => {}
}

export type AtransSearchRes = SearchModuleFields & {
  [key: string]: AtransItemRes
}

export type AtransTableRes = TableModuleFields & {
  [key: string]: AtransItemRes
}

export type AtransDialogRes = DialogModuleFields & {
  [key: string]: AtransItemRes
}

export type DialogExtraFields = {
  title: string
  api?: (value?: any) => Promise<any>
  table?: AtransTableRes
  rules: object
  data: any
  config: AtransDialogRes
  show: boolean
  'close-on-click-modal': boolean
  'item-width'?: string
  submit?: (
    value: any,
    dialog: DialogExtraFields,
    table: TableModuleFields
  ) => Promise<any> | undefined
}

// 最终结果
export interface AtransRes {
  search?: AtransSearchRes | AtransSearchRes[]
  table?: AtransTableRes | AtransTableRes[]
  dialog?: AtransDialogRes | AtransDialogRes[]
  $dialog?: DialogExtraFields
  [key: string]: any
}
