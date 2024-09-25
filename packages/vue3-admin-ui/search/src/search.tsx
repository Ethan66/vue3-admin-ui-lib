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
    const ruleFormRef = ref()
    const fields = computed(() => {
      const result = Object.keys(form).filter(
        (key) => !key.startsWith('$') && form[key].show === true
      )
      return !min || isShowAll.value ? result : result.slice(0, min)
    })
    const onSearch = () => {
      ruleFormRef.value.validate((valid: boolean) => {
        if (valid) {
          const value = { ...(form.$default || {}), ...form.$data }
          Object.keys(value).forEach((key) => {
            form.$data[key] ??= value[key]?.default ?? value[key]
            if (/\w+,\w+/.test(key)) {
              const tmpKeys = key.split(',')
              const tmp = value[key] || []
              value[tmpKeys[0]] = tmp[0]
              value[tmpKeys[1]] = tmp[1]
              form.$data[tmpKeys[0]] = tmp[0]
              form.$data[tmpKeys[1]] = tmp[1]
              delete value[key]
            }
            if (value[key] === '') {
              delete value[key]
            }
            if (![null, undefined].includes(value[key])) {
              if (form[key]?.$attr.type === 'number') {
                value[key] = String(Number(value[key])) !== 'NaN' ? Number(value[key]) : value[key]
              }
            }
          })
          attrs.onSearch
            ? (attrs.onSearch as (val: object) => {})(value)
            : form.$search(value, table)
        }
      })
    }

    const onClear = () => {
      ruleFormRef.value.resetFields()
      Object.keys(form.$data).forEach((key) => {
        if (form[key]?.default !== undefined) {
          form.$data[key] = form[key].default
        } else {
          delete form.$data[key]
        }
      })
      if (form.$default) {
        Object.assign(form.$data, form.$default)
      }
    }
    const handleEmpty = (e: any) => {
      e.preventDefault()
    }
    return () => (
      <el-form
        class="search-module"
        rules={form.$rules}
        ref={ruleFormRef}
        inline={form.$inline}
        model={form.$data}
        onSubmit={handleEmpty}
      >
        {fields.value.map((key) => {
          const value = form[key]
          if (value.slot) {
            return (
              <el-form-item key={key} label={value.label} prop={value.key}>
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
              <el-form-item key={key} label={value.label} prop={value.key}>
                <FormItem form={form} field={key} data={form.$data} item={form[key]}></FormItem>
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
            <el-button text onClick={() => (isShowAll.value = !isShowAll.value)}>
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
