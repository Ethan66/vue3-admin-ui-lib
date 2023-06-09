import type { AtransConfig, FormItemOb, ItemOb, ModuleType } from '../types'
import type { Defaults } from '../types/default'
import { deepMerge, isPlainObject, extend } from '../utils'

export default class Dispatch {
  static _defaults: Defaults
  config: any
  constructor(config: AtransConfig, defaults: Defaults) {
    Dispatch._defaults = defaults
    this.processConfig(config)
  }

  // 遍历模块
  processConfig(config: AtransConfig): void {
    const result: any = Object.create(null)
    Object.keys(config).forEach((key) => {
      result[key] = this.transformModule(config[key], key as ModuleType)
      // 添加模块全局变量
      extend(result, Dispatch._defaults.extraFields[key] || {})
    })
    this.config = result
  }

  // 转化模块
  transformModule(
    module: FormItemOb | FormItemOb[] | ItemOb | ItemOb[],
    type: ModuleType
  ): ItemOb | ItemOb[] {
    let result: any = []
    if (isPlainObject(module)) {
      // 添加默认属性
      result = this.processModuleItem(module as ItemOb, type)
      // 添加每个配置变量
      this.injectUseVariable(result, type)
    } else if (Array.isArray(module)) {
      ;(module as ItemOb[]).forEach((moduleItem, index) => {
        // 添加默认属性
        result[index] = this.processModuleItem(moduleItem, type)
        // 添加每个配置变量
        this.injectUseVariable(result, type, index)
      })
    }
    return result
  }

  // 模块中每个配置项添加属性
  processModuleItem(moduleItem: ItemOb, type: ModuleType): ItemOb {
    let result = Object.create(null)
    const keyOb = Object.create(null)
    if (Dispatch._defaults.items[type]) {
      Object.keys(moduleItem).forEach((field) => {
        keyOb.field = field
        result[field] = this.mergeConfigItem(
          Dispatch._defaults.items[type],
          moduleItem[field],
          keyOb,
          type
        )
      })
    } else {
      result = moduleItem
    }
    return result
  }

  // 合并配置项
  mergeConfigItem(defConfig: object, config: object, keyOb: object, type: ModuleType): object {
    const result = deepMerge(defConfig, config, keyOb)
    if (!result.placeholder && type !== 'table') {
      if (Dispatch._defaults.placeholders.includes(result.el)) {
        result.placeholder = '请输入' + result.label
      } else {
        result.placeholder = '请选择' + result.label
      }
    }
    return result
  }

  // 添加模块每个配置项中的变量
  injectUseVariable(result: object, type: ModuleType, index?: number): void {
    const ob = Dispatch._defaults.moduleFields[type]
    ob &&
      Object.keys(ob).forEach((key) => {
        if (index === undefined) {
          result[key] = isPlainObject(ob[key]) ? deepMerge(ob[key]) : ob[key]
        } else {
          result[index][key] = isPlainObject(ob[key]) ? deepMerge(ob[key]) : ob[key]
        }
      })
  }
}
