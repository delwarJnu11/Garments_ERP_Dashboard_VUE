import { defineStore } from 'pinia'
import { api } from '@/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    tokenExpiry: localStorage.getItem('token_expiry') || null,
    user: null,
  }),
  getters: {
    isAuthenticated(state) {
      return !!state.token
    },
  },
  actions: {
    async login(credentials) {
      try {
        const res = await api.post('/login', credentials)

        this.token = res.data.authorisation.token
        this.user = res.data.user

        // Set expiry for 1 hour from now
        const expiry = Date.now() + 60 * 60 * 2000

        localStorage.setItem('token', this.token)
        localStorage.setItem('token_expiry', expiry)

        this.tokenExpiry = expiry

        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },

    // Call this when the app starts
    initAuth() {
      const token = localStorage.getItem('token')
      const expiry = localStorage.getItem('token_expiry')

      if (token && expiry && Date.now() < parseInt(expiry)) {
        this.token = token
        this.tokenExpiry = expiry
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      } else {
        this.logout() // expired or not available
      }
    },

    logout() {
      this.token = null
      this.tokenExpiry = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('token_expiry')
      delete api.defaults.headers.common['Authorization']
    }
  }
})
