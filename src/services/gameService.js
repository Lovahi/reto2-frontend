import { fetchClient } from '../api/fetchClient'

export const gameService = {
  getAllGames: (page = 1) => fetchClient(`/games?page=${page}`),
  getGamesCounter: () => fetchClient('/games/pages'),
  getGameById: (id) => fetchClient(`/games/${id}`),
  createGame: (gameData) => fetchClient('/games', { method: 'POST', body: gameData }),
  updateGame: (id, gameData) => fetchClient(`/games/${id}`, { method: 'PUT', body: gameData }),
  deleteGame: (id) => fetchClient(`/games/${id}`, { method: 'DELETE' }),
}
