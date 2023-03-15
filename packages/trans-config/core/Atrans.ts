import type { AtransConfig, Interceptor } from '../types'
import type { Defaults, AtransRes, InterceptorFn } from '../types/default'
import Dispatch from './dispatch'

export default class Atrans {
  defaults: Defaults
  config: AtransRes
  interceptor: Interceptor

  constructor(initDefaults: Defaults) {
    this.config = {}
    this.defaults = initDefaults
    this.interceptor = {
      use: function (fn: InterceptorFn): void {
        if (typeof fn === 'function') {
          this.chains.push(fn)
        }
      },
      chains: []
    }
  }

  // 转换配置项成目标对象
  generate(config: AtransConfig): AtransRes {
    this.config = new Dispatch(config, this.defaults).config
    if (this.defaults.version && this.defaults.interceptors?.[this.defaults.version]) {
      this.interceptor.chains.unshift(this.defaults.interceptors[this.defaults.version])
      this.defaults.version = ''
    }
    if (this.interceptor.chains.length) {
      this.interceptor.chains.forEach((fn) => {
        this.config = fn(this.config)
      })
    }
    return this.config
  }
}
