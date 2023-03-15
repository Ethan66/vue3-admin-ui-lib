import type { Defaults } from './types/default'
import type { AtransInstance } from './types'
import Atrans from './core/Atrans'
import { extend, deepMerge } from './utils'
import initDefaults from './config/defaults'

function createInstance(defaults: Defaults): AtransInstance {
  const context = new Atrans(defaults)
  const generate = Atrans.prototype.generate.bind(context)
  const instance = extend(generate, context)
  return instance as AtransInstance
}

const atrans = createInstance(initDefaults)

atrans.create = function (defaults) {
  return createInstance(deepMerge(initDefaults, defaults))
}

export default atrans

export * from './types/index'
export * from './types/default'
