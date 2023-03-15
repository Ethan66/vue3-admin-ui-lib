import { defineComponent, unref } from 'vue'
import * as Element from 'element-plus'

const App = defineComponent({
  name: 'form-item',
  props: {
    slots: Object,
    item: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    field: {
      type: String,
      required: true
    },
    form: Object
  },
  setup(props) {
    const { slots, item, data, field, form } = unref(props)
    return () => {
      if (item.slot) {
        return slots?.[item.slot]({
          form,
          data
        })
      } else {
        const { Tag, ChildTag, isGroup } = getTag(item.el)
        return ChildTag || isGroup ? (
          <Tag {...item.$attr} v-model={data[field]} {...item.$on}>
            {item.options?.map(
              (child: { label: string; value: any; disabled: boolean }) => {
                return isGroup ? (
                  <ChildTag
                    key={child.value}
                    label={child.value}
                    disabled={child.disabled}
                  >
                    {child.label}
                  </ChildTag>
                ) : (
                  <ChildTag
                    key={child.value}
                    label={child.label}
                    value={child.value}
                    disabled={child.disabled}
                  ></ChildTag>
                )
              }
            )}
          </Tag>
        ) : (
          <Tag {...item.$attr} v-model={data[field]} {...item.$on}></Tag>
        )
      }
    }
  }
})

const getElement = (type: string) => {
  if (!type) return undefined
  let newType = type[0].toUpperCase() + type.slice(1)
  newType = newType.replace(/-([a-z])/, (a, b) => b.toUpperCase())
  return Element['El' + newType]
}

const getTag = (el: string): { Tag: any; ChildTag: any; isGroup: boolean } => {
  const Tag = getElement(el)
  const match = el.match(/^(.+?)(-group)$|^select$/)
  const ChildTag = getElement(
    match?.[2] ? match[1] : match?.[0] ? 'option' : ''
  )
  return {
    Tag,
    ChildTag,
    isGroup: !!match?.[2]
  }
}

export default App
