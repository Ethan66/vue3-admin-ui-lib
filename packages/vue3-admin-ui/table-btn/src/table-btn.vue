<template>
  <div class="table-btn">
    <el-button
      v-for="item in btns"
      link
      :type="item.type"
      size="small"
      v-bind="item"
      :key="item.name"
      @click="() => item.click(row)"
      >{{ item.name }}</el-button
    >
  </div>
</template>

<script lang="ts" setup name="table-btn">
import { computed, unref, type PropType } from 'vue'
import * as Icons from '@element-plus/icons-vue'

type Config = {
  name: string
  click: (row: object) => {}
  code?: string
  disabled?: boolean
  show?: boolean
  type?: string
}[]

const isFun = (val: unknown) =>
  Object.prototype.toString.call(val) === '[object Function]'

const props = defineProps({
  row: {
    type: Object,
    required: true
  },
  config: {
    type: Object as PropType<{
      codes?: string[]
      names: string[]
      icons?: string[]
      clicks: () => {}[]
      shows?: () => {}[]
      disableds?: () => {}[]
      types?: string[]
    }>,
    required: true
  },
  permission: Array as PropType<string[]>
})

const { config, row, permission } = unref(props)
const primarys = computed(() => {
  const arr: string[] = []
  arr.length = config.names.length
  arr.fill('primary')
  return arr
})
const btns = computed(() => {
  const newConfig = { types: primarys.value, ...config }
  const result: Config = Object.keys(newConfig).reduce(
    (result: Config, key: string) => {
      const arr = newConfig[key]
      Array.isArray(arr) &&
        arr.forEach((item: any, i: number) => {
          if (!result[i]) {
            result[i] = Object.create(null)
          }
          key === 'icons' && (item = Icons[item])
          key === 'disableds' && (item = isFun(item) ? item(row) : item)
          key === 'shows' && (item = isFun(item) ? item(row) : item)
          key === 'types' && (item = item || 'primary')
          result[i][key.endsWith('s') ? key.slice(0, -1) : key] = item
        })
      return result
    },
    []
  )
  return permission?.includes('*:*:*')
    ? result.filter(item => item.show !== false)
    : result.filter(
        item =>
          (!item.code || permission?.includes(item.code)) && item.show !== false
      )
})
</script>

<style lang="scss" scoped>
.table-btn {
  .el-button {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
