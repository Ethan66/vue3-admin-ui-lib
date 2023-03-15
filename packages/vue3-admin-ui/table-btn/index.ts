import TableBtnComponent from './src/table-btn.vue'

import { install } from '../_utils'

export const TableBtn = install(TableBtnComponent)

export type TableBtnInstance = InstanceType<typeof TableBtnComponent>

export default TableBtn
