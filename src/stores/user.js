import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCurrentUser, signOut } from '../utils/auth'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const loading = ref(true)

  const fetchUser = async () => {
    try {
      const { user: currentUser, error } = await getCurrentUser()
      if (error) throw error
      user.value = currentUser
    } catch (error) {
      console.error('获取用户信息失败:', error)
      user.value = null
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      const { error } = await signOut()
      if (error) throw error
      user.value = null
    } catch (error) {
      console.error('退出登录失败:', error)
    }
  }

  return {
    user,
    loading,
    fetchUser,
    logout
  }
})