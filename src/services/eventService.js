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
  getUserEvents: (userId) => fetchClient(`/users/${userId}/events`),
  getEventById: (id) => fetchClient(`/events/${id}`),
  createEvent: (eventData) => fetchClient('/events', { method: 'POST', body: eventData }),
  signupEvent: (eventId) => fetchClient(`/events/${eventId}/signup`, { method: 'POST' }),
  cancelEvent: (eventId) => fetchClient(`/events/${eventId}/signup`, { method: 'DELETE' }),
  getEventUsers: (id) => fetchClient(`/events/${id}/users`),
}
