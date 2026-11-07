import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/boot/axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const accessToken = ref(null)
  const loading = ref(false)
  const errorMessage = ref('')

  const isAuthenticated = computed(() => accessToken.value !== null)
  const role = computed(() => user.value?.role ?? null)

  const login = async (username, password) => {
    loading.value = true
    errorMessage.value = ''
    try {
      const response = await api.post('/auth/login', { username, password })
      accessToken.value = response.data.data.accessToken
      user.value = response.data.data.user
      return response
    } catch (error) {
      errorMessage.value = error.response?.data?.message ?? 'เข้าสู่ระบบล้มเหลว'
      throw error
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    accessToken.value = null
    user.value = null
  }

  return { user, accessToken, loading, errorMessage, isAuthenticated, role, login, logout }
})
