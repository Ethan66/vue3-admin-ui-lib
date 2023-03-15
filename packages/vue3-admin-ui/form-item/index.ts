import FormItemComponent from './src/form-item'

import { install } from '../_utils'

export const FormItem = install(FormItemComponent)

export type FormItemInstance = InstanceType<typeof FormItemComponent>

export default FormItem
