import { fetchClient } from '../api/fetchClient'

export const eventService = {
  getEvents: (filters = {}) => {
    const params =
      typeof filters === 'object'
        ? new URLSearchParams(filters)
        : new URLSearchParams({ page: filters })
    const queryString = params.toString()
    return fetchClient(`/events${queryString ? `?${queryString}` : ''}`)
  },
  getEventsCounter: () => fetchClient('/events/pages'),
  getUserEvents: () => fetchClient(`/events/users/`),
  getEventById: (id) => fetchClient(`/events/${id}`),
  createEvent: (eventData) => fetchClient('/events', { method: 'POST', body: eventData }),
  signupEvent: (eventId) => fetchClient(`/events/${eventId}/signup`, { method: 'POST' }),
  cancelEvent: (eventId) => fetchClient(`/events/${eventId}/cancel`, { method: 'DELETE' }),
}
