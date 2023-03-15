import { computed, defineComponent, ref, unref } from 'vue'
import { Search, Delete } from '@element-plus/icons-vue'
import FormItem from '../../form-item'

const App = defineComponent({
  name: 'search-module',
  props: {
    search: {
      type: Object,
      required: true
    },
    min: {
      type: Number
    },
    table: Object
  },
  setup(props, context) {
    const { search: form, min, table } = unref(props)
    const { slots, attrs } = context
    const isShowAll = ref(false)
    const fields = computed(() => {
      const result = Object.keys(form).filter(
        key => !key.startsWith('$') && form[key].show === true
      )
      return !min || isShowAll.value ? result : result.slice(0, min)
    })
    const onSearch = () => {
      const value = { ...form.$data }
      Object.keys(value).forEach(key => {
        if (/\w+,\w+/.test(key)) {
          const tmpKeys = key.split(',')
          const tmp = value[key] || []
          value[tmpKeys[0]] = tmp[0]
          value[tmpKeys[1]] = tmp[1]
          form.$data[tmpKeys[0]] = tmp[0]
          form.$data[tmpKeys[1]] = tmp[1]
          delete value[key]
        }
      })
      attrs.onSearch
        ? (attrs.onSearch as (val: object) => {})(value)
        : form.$search(value, table)
    }

    const onClear = () => {
      fields.value.forEach(key => {
        if (form[key].default !== undefined) {
          form.$data[key] = form[key].default
        } else {
          form.$data[key] = undefined
        }
      })
    }
    return () => (
      <el-form class="search-module" inline={form.$inline} model={form.$data}>
        {fields.value.map(key => {
          const value = form[key]
          if (value.slot) {
            return (
              <el-form-item key={key} label={value.label}>
                <FormItem
                  form={form}
                  field={key}
                  data={form.$data}
                  item={form[key]}
                  slots={slots}
                ></FormItem>
              </el-form-item>
            )
          } else {
            return (
              <el-form-item key={key} label={value.label}>
                <FormItem
                  form={form}
                  field={key}
                  data={form.$data}
                  item={form[key]}
                ></FormItem>
              </el-form-item>
            )
          }
        })}
        <el-form-item>
          <el-button type="primary" icon={Search} onClick={onSearch}>
            查询
          </el-button>
          <el-button type="danger" icon={Delete} onClick={onClear}>
            重置
          </el-button>
          {slots.btn?.()}
          {min ? (
            <el-button
              text
              onClick={() => (isShowAll.value = !isShowAll.value)}
            >
              {isShowAll.value ? '收起' : '更多搜索'}
            </el-button>
          ) : (
            ''
          )}
        </el-form-item>
      </el-form>
    )
  }
})

export default App
