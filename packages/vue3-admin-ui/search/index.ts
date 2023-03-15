import SearchModuleComponent from './src/search'

import { install } from '../_utils'

export const SearchModule = install(SearchModuleComponent)

export type SearchModuleInstance = InstanceType<typeof SearchModuleComponent>

export default SearchModule
