import { fetchClient } from '../api/fetchClient'

export const authService = {
  register: (userData) => fetchClient('/auth/register', { method: 'POST', body: userData }),
  login: (credentials) => fetchClient('/auth/login', { method: 'POST', body: credentials }),
  logout: () => {
    return fetchClient('/auth/logout', { method: 'POST' })
  },
}
