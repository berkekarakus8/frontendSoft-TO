import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error(`Failed to load ${key} from localStorage`, error);
    return defaultValue;
  }
};

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save ${key} to localStorage`, error);
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    matches: loadFromLocalStorage('fav_matches', []),
    leagues: loadFromLocalStorage('fav_leagues', []),
    teams: loadFromLocalStorage('fav_teams', []),
  },
  reducers: {
    toggleFavoriteMatch(state, action) {
      const matchId = action.payload;
      const index = state.matches.indexOf(matchId);
      if (index >= 0) {
        state.matches.splice(index, 1);
      } else {
        state.matches.push(matchId);
      }
      saveToLocalStorage('fav_matches', state.matches);
    },
    toggleFavoriteLeague(state, action) {
      const leagueId = action.payload;
      const index = state.leagues.indexOf(leagueId);
      if (index >= 0) {
        state.leagues.splice(index, 1);
      } else {
        state.leagues.push(leagueId);
      }
      saveToLocalStorage('fav_leagues', state.leagues);
    },
    toggleFavoriteTeam(state, action) {
      const teamId = action.payload;
      const index = state.teams.indexOf(teamId);
      if (index >= 0) {
        state.teams.splice(index, 1);
      } else {
        state.teams.push(teamId);
      }
      saveToLocalStorage('fav_teams', state.teams);
    }
  }
});

export const { toggleFavoriteMatch, toggleFavoriteLeague, toggleFavoriteTeam } = favoritesSlice.actions;
export default favoritesSlice.reducer;
