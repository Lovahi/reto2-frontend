const BASE_URL = import.meta.env.VITE_API_URL

import { useAuthStore } from '../stores/authStore'

export const fetchClient = async (endpoint, options = {}) => {
  const authStore = useAuthStore()
  const { body, ...customConfig } = options
  const headers = { 'Content-Type': 'application/json', ...customConfig.headers }

  // Si hay un token en el store de Pinia, lo añadimos
  if (authStore.token) {
    headers.Authorization = `Bearer ${authStore.token}`
  }

  const config = {
    ...customConfig,
    headers,
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config)

    // Si es un status 204 (No Content), no intentamos parsear JSON
    if (response.status === 204) {
      return null
    }

    const data = await response.json()

    if (response.ok) {
      return data
    }

    throw new Error(data.message || 'Error en la petición')
  } catch (error) {
    console.error('Fetch Error:', error)
    throw error
  }
}
