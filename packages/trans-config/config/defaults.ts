import type { Defaults } from '../types/default'
import defaultInterceptors from './defaultInterceptors'
const defaults: Defaults = {
  items: {
    search: { show: true, el: 'input' },
    table: { show: true, el: 'cell', minWidth: 80 },
    dialog: { show: true, el: 'input' },
    dialog1: { show: true, el: 'input' },
    dialog2: { show: true, el: 'input' },
    dialog3: { show: true, el: 'input' }
  },
  // fields: {
  //   search: 'key',
  //   table: 'prop',
  //   dialog: 'key'
  // },
  // dialogBtn: {
  //   cancel: {
  //     name: '取消',
  //     type: 'delete',
  //     clickFn: '',
  //     disabled: false,
  //     show: true
  //   },
  //   confirm: {
  //     name: '确认',
  //     type: 'edit',
  //     color: 'primary',
  //     clickFn: 'handleSubmit',
  //     disabled: false,
  //     show: true
  //   }
  // },
  moduleFields: {
    search: { $data: {}, $inline: true, $search: () => {}, $default: {} },
    table: {
      $data: [],
      $permissions: [],
      $api: () => new Promise(() => {}),
      $onGetData: () => new Promise(() => {}),
      $loading: true,
      $border: false,
      $pages: { current: 1, pageSize: 20, total: 0, pageSizes: [20, 50, 100] },
      $typeIndexFn: () => ({})
    },
    dialog: {
      $rules: {}
    },
    dialog1: {
      $rules: {}
    },
    dialog2: {
      $rules: {}
    },
    dialog3: {
      $rules: {}
    }
  },
  extraFields: {
    dialog: {
      $dialog: {
        api: () => new Promise(() => {}),
        title: '',
        data: {},
        config: {},
        rules: {},
        show: false,
        'close-on-click-modal': false,
        'item-width': '50%',
        submit: () => new Promise(() => {})
      }
    },
    dialog1: {
      $dialog: {
        api: () => new Promise(() => {}),
        title: '',
        data: {},
        config: {},
        rules: {},
        show: false,
        'close-on-click-modal': false,
        'item-width': '50%',
        submit: () => new Promise(() => {})
      }
    },
    dialog2: {
      $dialog: {
        api: () => new Promise(() => {}),
        title: '',
        data: {},
        config: {},
        rules: {},
        show: false,
        'close-on-click-modal': false,
        'item-width': '50%',
        submit: () => new Promise(() => {})
      }
    },
    dialog3: {
      $dialog: {
        api: () => new Promise(() => {}),
        title: '',
        data: {},
        config: {},
        rules: {},
        show: false,
        'close-on-click-modal': false,
        'item-width': '50%',
        submit: () => new Promise(() => {})
      }
    }
  },
  // childKeys: ['show', 'el', 'label', 'options', 'span', 'slot', 'default'],
  // listeners: ['click', 'change', 'input', 'focus', 'blur'],
  placeholders: ['text', 'input', 'number', 'password', 'textarea'],
  interceptors: defaultInterceptors
}

export default defaults
