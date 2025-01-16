import { computed, defineComponent, ref, toRefs, unref } from 'vue'
import FormItem from '../../form-item'

const App = defineComponent({
  name: 'form-wrap',
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
    const { form: initConfig } = toRefs(props)
    const form = unref(initConfig)
    const { slots, attrs, expose } = context
    const ruleFormRef = ref()
    expose({ formRef: ruleFormRef })

    /**
     * name: 获取显示的配置项
     */
    const fields = computed(() => {
      return Object.keys(config.value).filter(
        (key) => !key.startsWith('$') && config.value[key].show === true
      )
    })
    const config = computed(() => {
      return form.config
    })
    const maxLabelWidth = computed(() => {
      const maxLength = fields.value.reduce((res, key) => {
        const len = config.value[key].label.length
        return res > len ? res : len
      }, 0)
      return maxLength < 4 ? maxLength + 1 : maxLength
    })

    return () => (
      <el-form
        model={form.data}
        size={form.size}
        label-width={`${form.labelWidth || maxLabelWidth.value * 20}px`}
        rules={config.value.$rules}
        ref={ruleFormRef}
        key={form.data}
        inline
        {...attrs}
      >
        {fields.value.map((key) => {
          const value = config.value[key]
          if (value.slot) {
            return (
              <el-form-item
                style={{ width: `calc(${form['item-width']} - 20px)` }}
                class={config.value[key].$attr.class || ''}
                key={key}
                label={value.label}
                prop={value.key}
              >
                <FormItem
                  form={config.value}
                  field={key}
                  onlyRead={form.$onlyRead}
                  data={form.data}
                  item={config.value[key]}
                  slots={slots}
                ></FormItem>
              </el-form-item>
            )
          } else {
            return (
              <el-form-item
                style={{ width: `calc(${form['item-width']} - 20px)` }}
                class={config.value[key].$attr.class || ''}
                key={key}
                label={value.label}
                prop={value.key}
              >
                <FormItem
                  form={config.value}
                  field={key}
                  onlyRead={form.$onlyRead}
                  data={form.data}
                  item={config.value[key]}
                ></FormItem>
              </el-form-item>
            )
          }
        })}
      </el-form>
    )
  }
})

export default App
