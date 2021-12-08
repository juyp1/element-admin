import { createI18n } from 'vue-i18n'
import zhLocale from './lang/zh'
import enLocale from './lang/en'
import store from '@/store'
const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}
const locale = 'zh'
// 国际化缓存处理
// vuex缓存,LocalStorage缓存
/**
 * 返回当前 lang
 */
function getLanguage() {
  console.log('store.getters.language', store)
  return store && store.getters && store.getters.language
}
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getLanguage(), // set locale
  messages // set locale messages
})
export default i18n
