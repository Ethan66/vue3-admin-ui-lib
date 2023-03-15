import DialogModuleComponent from './src/dialog'

import { install } from '../_utils'

export const DialogModule = install(DialogModuleComponent)

export type DialogModuleInstance = InstanceType<typeof DialogModuleComponent>

export default DialogModule
