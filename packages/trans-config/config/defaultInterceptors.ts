import type { ModuleType } from '../types'
import type {
  AtransRes,
  AtransItemRes,
  AtransSearchRes,
  AtransTableRes,
  AtransDialogRes,
  DialogExtraFields
} from '../types/default'
import { isPlainObject } from '../utils'

const childKeys = [
  'show',
  'el',
  'label',
  'options',
  'span',
  'slot',
  'header-slot',
  'default',
  'clicks',
  'shows',
  'disableds',
  'key',
  'prop'
]
const listeners = ['click', 'change', 'input', 'focus', 'blur']
const fields = { search: 'key', table: 'prop', dialog: 'key' }
const specialEl = ['radio-group', 'date-picker', 'checkbox-group']
const ruleCommon = { required: true, message: '', trigger: 'change' }

type TableItem = AtransItemRes & {
  prop?: string
  fixed?: string
  type?: string
  width?: number
  minWidth: number
  index?: number | ((index: number) => {})
}

export type AtransResult = {
  search?: AtransSearchRes
  search1?: AtransSearchRes
  search2?: AtransSearchRes
  search3?: AtransSearchRes
  table?: AtransTableRes
  table1?: AtransTableRes
  table2?: AtransTableRes
  table3?: AtransTableRes
  dialog?: AtransDialogRes
  dialog1?: AtransDialogRes
  dialog2?: AtransDialogRes
  dialog3?: AtransDialogRes
  $dialog?: DialogExtraFields
  [key: string]: any
}

export * from '../types/default'

export default {
  common: function (config: AtransRes): AtransResult {
    function purifierObject(ob: object, type: ModuleType): object {
      const result = Object.create(null)
      Object.keys(ob).forEach((key) => {
        if (key === 'field') {
          result[fields[type]] = ob[key]
          delete ob[key]
        }
        if (key === 'el') {
          const index = specialEl.findIndex((el) => el.startsWith(ob[key]))
          index > -1 && (ob[key] = specialEl[index])
        }
        if ([...childKeys].includes(key)) {
          result[key] = ob[key]
          delete ob[key]
        } else if (listeners.includes(key)) {
          !result.$on && (result.$on = {})
          result.$on['on' + key[0].toUpperCase() + key.slice(1)] = ob[key]
          delete ob[key]
        }
      })
      if ((result as any).el === 'date-picker') {
        if (['datetimerange', 'daterange'].includes((ob as any).type)) {
          ;(ob as any)['start-placeholder'] ??= '开始日期'
          ;(ob as any)['end-placeholder'] ??= '开始日期'
        }
        ;(ob as any)['value-format'] ??= 'YYYY-MM-DD HH:mm:ss'
      }
      if (Object.keys(ob).length) {
        result.$attr = ob
      } else {
        delete result.$attr
      }
      if (result.$on && !Object.keys(result.$on).length) {
        delete result.$on
      }
      return result
    }
    Object.keys(config).forEach((type) => {
      if (['search', 'table', 'dialog'].includes(type.replace(/\d+/, ''))) {
        const value = config[type]
        if (isPlainObject(value)) {
          Object.keys(value).forEach((key) => {
            if (key.startsWith('$')) return
            if (type === 'table') {
              const v = value[key] as TableItem
              if (v.field === 'btn') {
                v.field = ''
                v.slot = 'btn'
                v.label ??= '操作'
                v.fixed ??= 'right'
              } else if (v.field === 'selection') {
                v.field = ''
                v.type = 'selection'
              } else if (v.field === 'index') {
                v.field = ''
                v.label ??= '序号'
                v.width ??= 60
                v.type = 'index'
                !v.index &&
                  (v.index = (value as { $typeIndexFn: any }).$typeIndexFn.bind(null, value))
              }
              if (
                v.width &&
                !(v.slot === 'btn' || (v.type && ['selection', 'index'].includes(v.type)))
              ) {
                v.minWidth = v.width
                delete v.width
              }
            }
            if (type === 'search') {
              if (value[key].default !== undefined) {
                ;(value as AtransSearchRes).$data[key] = value[key].default
              }
            }
            if (type.replace(/\d+/, '') === 'dialog') {
              const rule = value[key].rule
              if (rule !== undefined) {
                const rules = (value as AtransDialogRes).$rules as object
                rules[key] = []
                const common = {
                  ...ruleCommon,
                  message: value[key].placeholder
                }
                rules[key][0] = rule === true ? common : { ...common, ...rule }
                delete value[key].rule
              }
            }
            value[key] = purifierObject(value[key], type as ModuleType)
          })
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            config[type + (index + 1)] = item
            Object.keys(item).forEach((key) => {
              if (key.startsWith('$')) return
              if (type === 'table') {
                const v = item[key] as TableItem
                if (v.field === 'btn') {
                  v.field = ''
                  v.slot = 'btn'
                  v.label ??= '操作'
                  v.fixed ??= 'right'
                } else if (v.field === 'selection') {
                  v.field = ''
                  v.type = 'selection'
                } else if (v.field === 'index') {
                  v.field = ''
                  v.label ??= '序号'
                  v.width ??= 50
                  v.type = 'index'
                  !v.index && (v.index = (item as { $typeIndexFn: any }).$typeIndexFn.bind(item))
                }
                if (
                  v.width &&
                  !(v.slot === 'btn' || (v.type && ['selection', 'index'].includes(v.type)))
                ) {
                  v.minWidth = v.width
                  delete v.width
                }
              }
              if (type === 'search') {
                if (item[key].default !== undefined) {
                  ;(item as AtransSearchRes).$data[key] = item[key].default
                }
              }
              if (type.replace(/\d+/, '') === 'dialog') {
                const rule = item[key].rule
                if (rule !== undefined) {
                  const rules = (item as AtransDialogRes).$rules as object
                  rules[key] = []
                  const common = {
                    ...ruleCommon,
                    message: item[key].placeholder
                  }
                  rules[key][0] = rule === true ? common : { ...common, ...rule }
                  delete item[key].rule
                }
              }
              item[key] = purifierObject(item[key], type as ModuleType)
            })
          })
          delete config[type]
        }
      }
    })
    if (config.$dialog) {
      if (config.dialog && !config.dialog1) {
        config.$dialog.config = config.dialog as AtransDialogRes
      }
      if (config.table && !config.table1) {
        config.$dialog.table = config.table as AtransTableRes
      }
    }
    return config as AtransResult
  }
}
