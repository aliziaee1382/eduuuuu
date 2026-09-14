import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-slate-800 text-slate-100 border border-indigo-500/30 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-md animate-bounce-short">
      <div className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      <p className="text-sm font-medium">{toastMessage}</p>
    </div>
  );
};
