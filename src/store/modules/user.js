import { login, getUserInfo } from '@/api/sys'
import router from '@/router'
import _md5 from 'md5'
import { setStorage, getStorage, removeStorageAll } from '@/utils/storage'
import { setTimeStamp } from '@/utils/auth'
import { TOKEN } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    token: getStorage(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, payload) {
      state.token = payload
      setStorage(TOKEN, payload)
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },

  actions: {
    loginAction(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username, password: _md5(password) })
          .then((data) => {
            this.commit('user/setToken', data.token)
            setTimeStamp()
            router.push('/')
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    async getUserInfoAction(context) {
      const data = await getUserInfo()
      this.commit('user/setUserInfo', data)
      return data
    },

    async logoutAction() {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', '')
      removeStorageAll()
      router.push('/login')
    }
  }
}
