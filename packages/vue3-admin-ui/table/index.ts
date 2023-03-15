import TableModuleComponent from './src/table'

import { install } from '../_utils'

export const TableModule = install(TableModuleComponent)

export type TableModuleInstance = InstanceType<typeof TableModuleComponent>

export default TableModule
