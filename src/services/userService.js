import { fetchClient } from '../api/fetchClient'

export const userService = {
  getAllUsers: () => fetchClient('/users'),
  getUserById: (id) => fetchClient(`/users/${id}`),
  createUser: (userData) => fetchClient('/users', { method: 'POST', body: userData }),
  updateUser: (id, userData) => fetchClient(`/users/${id}`, { method: 'PUT', body: userData }),
  deleteUser: (id) => fetchClient(`/users/${id}`, { method: 'DELETE' }),
}
