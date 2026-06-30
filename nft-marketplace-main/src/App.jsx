import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInitialData } from './store/nftSlice';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import Collections from './pages/Collections';
import NFTDetail from './pages/NFTDetail';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Success from './pages/Success';
import About from './pages/About';
import Contact from './pages/Contact';
import CollectionDetail from './pages/CollectionDetail';

export default function App() {
  const dispatch = useDispatch();
  const { activePage } = useSelector(state => state.auth);
  const status = useSelector(state => state.nft.status);
  const nfts = useSelector(state => state.nft.nfts);
  
  // Tüm state'i alıp LocalStorage'a yazmak için
  const fullState = useSelector(state => state);

  // Başlangıç verisini çekme
  useEffect(() => {
    if (nfts.length === 0 && status === 'idle') {
      dispatch(fetchInitialData());
    }
  }, [dispatch, nfts.length, status]);

  // LocalStorage kalıcılığını React yaşam döngüsüyle (Component-level) sağlama
  // (store.subscribe KULLANILMADAN)
  useEffect(() => {
    const stateToSave = {
      auth: fullState.auth,
      nft: fullState.nft,
      cart: fullState.cart,
    };
    localStorage.setItem('nexus_nft_state', JSON.stringify(stateToSave));
  }, [fullState.auth, fullState.nft, fullState.cart]);

  // Sayfa yönlendirici (Conditional Router)
  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Home />;
      case 'explore': return <Explore />;
      case 'collections': return <Collections />;
      case 'nft-detail': return <NFTDetail />;
      case 'collection-detail': return <CollectionDetail />;
      case 'cart': return <Cart />;
      case 'checkout': return <Checkout />;
      case 'auth': return <Auth />;
      case 'profile': return <Profile />;
      case 'success': return <Success />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      default: return <Home />;
    }
  };

  return (
    <>
      <Navbar />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
      <Toast />
    </>
  );
}
