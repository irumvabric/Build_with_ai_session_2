import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null
  }),
  actions: {
    async login(email, password) {
      // Mock authentication
      if (email === 'admin@gmail.com' && password === '12345678') {
        const user = {
          id: 1,
          email: email,
          name: 'Admin User',
          token: 'mock-jwt-token'
        };
        
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }
      return false; // Login failed
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
    }
  }
});
