import FormWrapComponent from './src/form-wrap'

import { install } from '../_utils'

export const FormWrap = install(FormWrapComponent)

export type FormWrapInstance = InstanceType<typeof FormWrapComponent>

export default FormWrap
