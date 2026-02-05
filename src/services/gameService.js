import { fetchClient } from '../api/fetchClient'

export const gameService = {
  getAllGames: (filters = {}) => {
    const params =
      typeof filters === 'object'
        ? new URLSearchParams(filters)
        : new URLSearchParams({ page: filters })
    const queryString = params.toString()
    return fetchClient(`/games${queryString ? `?${queryString}` : ''}`)
  },
  getGamesCounter: () => fetchClient('/games/pages'),
  getGameById: (id) => fetchClient(`/games/${id}`),
}
