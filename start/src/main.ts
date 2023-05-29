import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import adminDesign from 'vue3-admin-ui'
// import 'vue3-admin-ui/dist/style.css'
// import a from 'global-css-files'

const app = createApp(App).use(adminDesign)

app.use(router).use(ElementPlus)

app.mount('#app')
