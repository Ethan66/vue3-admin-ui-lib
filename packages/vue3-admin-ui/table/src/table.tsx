import { computed, defineComponent, toRefs, unref, watch, ref } from 'vue'
import TableBtn from '../../table-btn/src/table-btn.vue'

const App = defineComponent({
  name: 'table-module',
  props: {
    table: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
    const { table: config } = toRefs(props)
    const table = unref(config)
    const { slots, attrs } = context
    const fields = computed(() => {
      return Object.keys(table).filter(
        key => !key.startsWith('$') && table[key].show === true
      )
    })
    const parentAttr = computed(() => {
      return Object.keys(table)
        .filter(key => key.startsWith('$'))
        .reduce((data, key) => {
          if (!['$pages', '$api', '$onGetData'].includes(key)) {
            data[key.slice(1)] = table[key]
          }
          return data
        }, Object.create(null))
    })
    const tableKey = ref(0)
    const tableModuleRef = ref()
    watch(
      () => parentAttr.value.data,
      () => {
        tableKey.value = Math.random()
      }
    )
    const onChangeSizes = (val: number[]) => {
      table.$pages.pageSize = val
      table.$changePage(table, 1)
    }
    return () => (
      <div class="table-module">
        {slots.headerBtn?.()}
        <el-table
          {...parentAttr.value}
          {...attrs}
          ref="tableModuleRef"
          v-loading={table.$loading}
          key={tableKey.value}
        >
          {fields.value.map(field => {
            const value = table[field]
            if (value.slot || value['header-slot']) {
              return (
                <el-table-column
                  key={field}
                  label={value.label}
                  prop={value.prop}
                  {...value.$attr}
                  {...value.$on}
                >
                  {{
                    default: value.slot
                      ? (scope: any) => {
                          if (value.slot === 'btn') {
                            return (
                              <TableBtn
                                row={scope.row}
                                config={{
                                  ...value.$attr,
                                  clicks: value.clicks,
                                  shows: value.shows,
                                  disableds: value.disableds
                                }}
                                permission={table.$permissions}
                              ></TableBtn>
                            )
                          }
                          return slots[value.slot]?.({
                            row: scope.row,
                            index: scope.$index
                          })
                        }
                      : undefined,
                    header: value['header-slot']
                      ? (scope: any) => {
                          return slots[value['header-slot']]?.({
                            column: scope.column,
                            index: scope.$index,
                            ...value,
                            ...value.$attr
                          })
                        }
                      : undefined
                  }}
                </el-table-column>
              )
            } else {
              return (
                <el-table-column
                  key={field}
                  label={value.label}
                  prop={value.prop}
                  {...value.$attr}
                  {...value.$on}
                ></el-table-column>
              )
            }
          })}
        </el-table>
        {table.$pages.current ? (
          <div class="page-wrap">
            <el-pagination
              v-model:current-page={table.$pages.current}
              v-model:page-size={table.$pages.pageSize}
              page-sizes={table.$pages.pageSizes}
              small={true}
              background
              layout="total, sizes, prev, pager, next"
              total={table.$pages.total}
              onSizeChange={onChangeSizes}
              onCurrentChange={table.$changePage.bind(null, table)}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
})

export default App
