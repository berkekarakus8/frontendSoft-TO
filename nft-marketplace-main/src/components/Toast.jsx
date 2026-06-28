import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../store/uiSlice';
import { Info, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

export default function Toast() {
  const dispatch = useDispatch();
  const { message, type, isVisible, id } = useSelector((state) => state.ui.toast);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, id, dispatch]);

  if (!isVisible) return null;

  const typeConfig = {
    info: { icon: <Info className="w-5 h-5 text-blue-500" />, bg: "bg-blue-50", border: "border-blue-200" },
    success: { icon: <CheckCircle className="w-5 h-5 text-emerald-500" />, bg: "bg-emerald-50", border: "border-emerald-200" },
    error: { icon: <AlertCircle className="w-5 h-5 text-rose-500" />, bg: "bg-rose-50", border: "border-rose-200" },
    warning: { icon: <AlertTriangle className="w-5 h-5 text-amber-500" />, bg: "bg-amber-50", border: "border-amber-200" },
  };

  const config = typeConfig[type] || typeConfig.info;

  return (
    <div className="toast-container">
      <div className={`toast-content ${config.bg} ${config.border}`}>
        {config.icon}
        <span className="toast-message">{message}</span>
      </div>
    </div>
  );
}
