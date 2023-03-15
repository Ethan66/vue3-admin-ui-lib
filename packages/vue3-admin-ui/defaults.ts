import * as components from './components'
import { version } from './package.json'
import type { App } from 'vue'

/**
 * 注册组件
 *
 * @param app 应用实例
 */
const install = (app: App): App => {
  Object.entries(components).forEach(([key, value]): void => {
    app.component(key, value)
  })

  return app
}

export default {
  version,
  install
}
