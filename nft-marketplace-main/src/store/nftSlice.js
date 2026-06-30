import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchInitialData = createAsyncThunk(
  'nft/fetchInitialData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/db.json');
      if (!response.ok) throw new Error('Veriler yüklenemedi');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  nfts: [],
  collections: [],
  users: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  exploreSearchTerm: '',
  collectionsSearchTerm: '',
  selectedNFT: null,
  selectedCollection: null,
};

const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {
    setExploreSearchTerm: (state, action) => {
      state.exploreSearchTerm = action.payload;
    },
    setCollectionsSearchTerm: (state, action) => {
      state.collectionsSearchTerm = action.payload;
    },
    setSelectedNFT: (state, action) => {
      state.selectedNFT = action.payload;
    },
    setSelectedCollection: (state, action) => {
      state.selectedCollection = action.payload;
    },
    addNFT: (state, action) => {
      state.nfts.push(action.payload);
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateNFTStatus: (state, action) => {
      const { id, status } = action.payload;
      const nft = state.nfts.find(n => n.id === id);
      if (nft) nft.status = status;
    },
    deleteNFT: (state, action) => {
      state.nfts = state.nfts.filter(nft => nft.id !== action.payload);
    },
    updateNFTDetails: (state, action) => {
      const { id, title, description, price } = action.payload;
      const nft = state.nfts.find(n => n.id === id);
      if (nft) {
        if (title) nft.title = title;
        if (description) nft.description = description;
        if (price !== undefined) nft.price = price;
      }
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      // Kullanıcıyı sil
      state.users = state.users.filter(u => u.id !== userId);
      // Kullanıcının sahip olduğu tüm NFT'leri zincirleme olarak (cascade) sil
      state.nfts = state.nfts.filter(nft => nft.ownerId !== userId);
    },
    transferOwnership: (state, action) => {
      const { nftId, newOwnerId } = action.payload;
      const nft = state.nfts.find(n => n.id === nftId);
      if (nft) {
        nft.ownerId = newOwnerId;
        nft.status = 'owned';
        // Dual-Transaction Guard: Expire other pending offers
        nft.offers.forEach(offer => {
          if (offer.status === 'pending') {
            offer.status = 'expired';
          }
        });
      }
    },
    addOffer: (state, action) => {
      const { nftId, offer } = action.payload;
      const nft = state.nfts.find(n => n.id === nftId);
      if (nft) {
        nft.offers.push(offer);
      }
    },
    handleOfferResponse: (state, action) => {
      const { nftId, offerId, responseStatus } = action.payload; // 'accepted' | 'rejected'
      const nft = state.nfts.find(n => n.id === nftId);
      if (nft) {
        const offer = nft.offers.find(o => o.id === offerId);
        if (offer) {
          offer.status = responseStatus;
        }
      }
    },
    processTransaction: (state, action) => {
      const { nftId, offerId, sellerId, buyerId, amount } = action.payload;
      
      const buyer = state.users.find(u => u.id === buyerId);
      const seller = state.users.find(u => u.id === sellerId);
      const nft = state.nfts.find(n => n.id === nftId);
      
      if (buyer && seller && nft) {
        // Bakiye transferi
        buyer.ethBalance -= amount;
        seller.ethBalance += amount;
        
        // Mülkiyet devri
        nft.ownerId = buyer.id;
        nft.status = 'owned';
        
        // Teklif durumlarını güncelle
        nft.offers.forEach(offer => {
          if (offer.id === offerId) {
            offer.status = 'accepted';
          } else if (offer.status === 'pending') {
            offer.status = 'expired';
          }
        });
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.nfts = action.payload.nfts;
        state.collections = action.payload.collections;
        state.users = action.payload.users;
      })
      .addCase(fetchInitialData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { 
  setExploreSearchTerm, 
  setCollectionsSearchTerm, 
  setSelectedNFT, 
  setSelectedCollection,
  addNFT, 
  updateNFTStatus,
  deleteNFT,
  updateNFTDetails,
  deleteUser,
  transferOwnership,
  addOffer,
  handleOfferResponse,
  processTransaction,
  addUser
} = nftSlice.actions;

export default nftSlice.reducer;
