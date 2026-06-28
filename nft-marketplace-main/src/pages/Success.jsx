import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage } from '../store/authSlice';
import { CheckCircle2 } from 'lucide-react';

export default function Success() {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setActivePage('home'));
    }, 3000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="w-full flex items-center justify-center p-20 animate-fade-in">
      <div className="flex flex-col items-center gap-6 bg-surface-white border border-emerald-200 rounded-3xl p-16 shadow-xl text-center max-w-lg w-full">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <CheckCircle2 className="w-16 h-16" />
        </div>
        <h1 className="text-4xl font-extrabold text-charcoal-deep">Ödeme Başarılı!</h1>
        <p className="text-smoke-grey text-lg">
          İşleminiz blokzincirinde onaylandı ve varlık cüzdanınıza aktarıldı. 
          <br /><br />
          <span className="text-sm font-semibold text-iris-periwinkle animate-pulse">Anasayfaya yönlendiriliyorsunuz...</span>
        </p>
      </div>
    </div>
  );
}
