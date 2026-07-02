import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const loadSearchHistory = () => {
  try {
    const saved = localStorage.getItem('search_history');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const saveSearchHistory = (history) => {
  try {
    localStorage.setItem('search_history', JSON.stringify(history));
  } catch (e) {}
};

export const searchAll = createAsyncThunk(
  'search/searchAll',
  async (query, { rejectWithValue }) => {
    if (!query || query.trim() === '') {
      return { matches: [], teams: [], leagues: [] };
    }
    try {
      // Query json-server using ?q= search parameters
      const [matchesRes, teamsRes, leaguesRes] = await Promise.all([
        api.get(`/matches?q=${encodeURIComponent(query)}`),
        api.get(`/teams?q=${encodeURIComponent(query)}`),
        api.get(`/leagues?q=${encodeURIComponent(query)}`),
      ]);

      return {
        matches: matchesRes.data || [],
        teams: teamsRes.data || [],
        leagues: leaguesRes.data || [],
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: { matches: [], teams: [], leagues: [] },
    loading: false,
    error: null,
    history: loadSearchHistory(),
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    addToHistory(state, action) {
      const q = action.payload.trim();
      if (!q) return;
      
      // Filter out existing, add to front, limit to 10
      state.history = [q, ...state.history.filter(item => item !== q)].slice(0, 10);
      saveSearchHistory(state.history);
    },
    removeFromHistory(state, action) {
      state.history = state.history.filter(item => item !== action.payload);
      saveSearchHistory(state.history);
    },
    clearHistory(state) {
      state.history = [];
      saveSearchHistory([]);
    },
    clearResults(state) {
      state.results = { matches: [], teams: [], leagues: [] };
      state.query = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAll.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Search failed';
      });
  }
});

export const { setQuery, addToHistory, removeFromHistory, clearHistory, clearResults } = searchSlice.actions;
export default searchSlice.reducer;
