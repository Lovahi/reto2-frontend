import { fetchClient } from '../api/fetchClient'

export const eventService = {
  getEvents: (page = 1) => fetchClient(`/events?page=${page}`),
  getEventsCounter: () => fetchClient('/events/pages'),
  getEventById: (id) => fetchClient(`/events/${id}`),
  getEventsByTitle: (title) => fetchClient(`/events/title/${title}`),
  createEvent: (eventData) => fetchClient('/events', { method: 'POST', body: eventData }),
}
