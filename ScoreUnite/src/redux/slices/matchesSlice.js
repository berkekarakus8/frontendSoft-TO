import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { matchService } from '../../services/api';

export const fetchMatches = createAsyncThunk(
  'matches/fetchMatches',
  async (_, { rejectWithValue }) => {
    try {
      const response = await matchService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchMatchDetails = createAsyncThunk(
  'matches/fetchMatchDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await matchService.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    list: [],
    selectedMatch: null,
    loading: false,
    detailsLoading: false,
    error: null,
  },
  reducers: {
    setSelectedMatch(state, action) {
      state.selectedMatch = action.payload;
    },
    updateLiveMatches(state, action) {
      // Action.payload contains updated matches list
      state.list = action.payload;
      // If the selected match is updated, update it too
      if (state.selectedMatch) {
        const updatedSelected = action.payload.find(m => m.id === state.selectedMatch.id);
        if (updatedSelected) {
          state.selectedMatch = updatedSelected;
        }
      }
    },
    simulateMatchTick(state) {
      state.list = state.list.map(match => {
        if (match.status !== 'LIVE') return match;

        const nextMin = match.minute + 1;
        let nextStatus = 'LIVE';
        let nextLive = true;

        if (nextMin >= 90) {
          nextStatus = 'FT';
          nextLive = false;
        }

        const updatedTimeline = match.timeline ? [...match.timeline] : [];
        let updatedHomeScore = match.homeScore;
        let updatedAwayScore = match.awayScore;
        const updatedStats = match.stats ? JSON.parse(JSON.stringify(match.stats)) : {};

        // Random event generator (0 to 100)
        const rand = Math.random() * 100;
        
        // 3% chance of goal
        if (rand < 3 && nextMin < 90) {
          const isHome = Math.random() < 0.5;
          const team = isHome ? 'home' : 'away';
          
          if (isHome) updatedHomeScore++;
          else updatedAwayScore++;

          // Try to select a player
          const startingPlayers = match.lineups?.[team]?.starting || [];
          const scorer = startingPlayers[Math.floor(Math.random() * startingPlayers.length)]?.shortName || 'Oyuncu';
          const assister = startingPlayers[Math.floor(Math.random() * startingPlayers.length)]?.shortName || null;

          updatedTimeline.push({
            minute: nextMin,
            type: 'goal',
            team,
            player: scorer,
            assist: assister !== scorer ? assister : null,
            detail: Math.random() < 0.5 ? 'Sağ ayakla şut' : 'Kafa vuruşu'
          });

          // Adjust stats
          if (updatedStats.shots) {
            updatedStats.shots[team] = (updatedStats.shots[team] || 0) + 1;
            updatedStats.shotsOnTarget[team] = (updatedStats.shotsOnTarget[team] || 0) + 1;
          }
        } 
        // 6% chance of yellow card
        else if (rand < 9 && nextMin < 90) {
          const isHome = Math.random() < 0.5;
          const team = isHome ? 'home' : 'away';
          const startingPlayers = match.lineups?.[team]?.starting || [];
          const player = startingPlayers[Math.floor(Math.random() * startingPlayers.length)]?.shortName || 'Oyuncu';

          updatedTimeline.push({
            minute: nextMin,
            type: 'yellow_card',
            team,
            player,
            detail: 'Sert müdahale'
          });

          if (updatedStats.fouls) {
            updatedStats.fouls[team] = (updatedStats.fouls[team] || 0) + 1;
          }
        }
        // 3% chance of substitution
        else if (rand < 12 && nextMin < 90) {
          const isHome = Math.random() < 0.5;
          const team = isHome ? 'home' : 'away';
          const startingPlayers = match.lineups?.[team]?.starting || [];
          const benchPlayers = match.lineups?.[team]?.bench || [];

          if (startingPlayers.length > 0 && benchPlayers.length > 0) {
            const playerOut = startingPlayers[Math.floor(Math.random() * startingPlayers.length)]?.shortName;
            const playerIn = benchPlayers[Math.floor(Math.random() * benchPlayers.length)]?.shortName;

            updatedTimeline.push({
              minute: nextMin,
              type: 'substitution',
              team,
              playerIn,
              playerOut
            });
          }
        }

        // Slightly nudge possession & passes (always running)
        if (updatedStats.possession) {
          const homePoss = Math.max(30, Math.min(70, updatedStats.possession.home + (Math.random() < 0.5 ? 1 : -1)));
          updatedStats.possession.home = homePoss;
          updatedStats.possession.away = 100 - homePoss;
        }

        if (updatedStats.passes) {
          updatedStats.passes.home += Math.floor(Math.random() * 3);
          updatedStats.passes.away += Math.floor(Math.random() * 3);
        }

        return {
          ...match,
          minute: nextMin,
          status: nextStatus,
          live: nextLive,
          homeScore: updatedHomeScore,
          awayScore: updatedAwayScore,
          timeline: updatedTimeline,
          stats: updatedStats
        };
      });

      // Synchronize selectedMatch
      if (state.selectedMatch) {
        const updatedSelected = state.list.find(m => m.id === state.selectedMatch.id);
        if (updatedSelected) {
          state.selectedMatch = updatedSelected;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchMatches
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch matches';
      })
      // fetchMatchDetails
      .addCase(fetchMatchDetails.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(fetchMatchDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.selectedMatch = action.payload;
      })
      .addCase(fetchMatchDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.payload || 'Failed to fetch match details';
      });
  },
});

export const { setSelectedMatch, updateLiveMatches, simulateMatchTick } = matchesSlice.actions;
export default matchesSlice.reducer;
