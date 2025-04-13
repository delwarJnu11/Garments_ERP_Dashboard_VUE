import { defineStore } from 'pinia'
import { api } from '@/api' 

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),
  getters: {},
  actions: {
    async login(credentials) {
      try {
        const res = await api.post('/login', credentials) 
        console.log("token", res.data.authorisation.token)

        this.token = res.data.authorisation.token
        this.user = res.data.user
        localStorage.setItem('token', this.token) 

        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}` 
      } catch (error) {
        console.error('Login API error:', error)
        throw error
      }
    }
  }
})
