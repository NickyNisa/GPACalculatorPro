import { boot } from 'quasar/wrappers'
import axios from 'axios'
const api = axios.create({ baseURL: 'http://localhost:3000' })

api.interceptors.request.use(
  (config) => {
    config.headers['Content-type'] = 'application/json; charset=UTF-8'
    config.headers['Authorization'] = 'Bearer coc2026'
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
