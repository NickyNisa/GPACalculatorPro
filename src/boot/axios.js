import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth-store'
const api = axios.create({ baseURL: 'http://172.26.117.16:3007/api/v1' })

api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.accessToken) {
      config.headers['Authorization'] = `Bearer ${authStore.accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
