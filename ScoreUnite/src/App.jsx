import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';
import MainLayout from './components/layout/MainLayout';
import SearchModal from './components/common/SearchModal';
import { simulateMatchTick } from './redux/slices/matchesSlice';

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dynamic game simulation loop running every 8 seconds
    const interval = setInterval(() => {
      dispatch(simulateMatchTick());
    }, 8000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      <MainLayout />
      <SearchModal />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
