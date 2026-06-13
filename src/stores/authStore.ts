import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', () => {
    const isAuthenticated = ref(false)
    const user = ref<{ id: string, name: string, email: string } | null>(null)

    function setUser(userData: { id: string, name: string, email: string }) {
        user.value = userData
        isAuthenticated.value = true
    }

    function clearUser() {
        user.value = null
        isAuthenticated.value = false
    }

    return {
        isAuthenticated,
        user,
        setUser,
        clearUser
    }
})