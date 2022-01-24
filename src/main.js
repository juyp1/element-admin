import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import '@/styles/index.scss'
import installElementPlus from './plugins/element'
import './permission'
import installDirective from './directives'
// 导入 svgicon
import installIcons from './icons'
const app = createApp(App)
installIcons(app)
installElementPlus(app)
installDirective(app)
app.use(i18n)
app.use(store).use(router).mount('#app')
