import React from 'react';
import { Eye } from 'lucide-react';
import { useVisitorStats } from '../hooks/useVisitorStats';

export const VisitorStats = () => {
    const { visits, onlineUsers } = useVisitorStats();

    if (visits === null) return null;

    return (
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-lead-light font-mono opacity-60 hover:opacity-100 transition-opacity select-none">
            {/* Indicador Online */}
            <div className="flex items-center gap-2" title="Pessoas acessando agora">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>{onlineUsers} Online</span>
            </div>
            
            <div className="w-px h-3 bg-current opacity-20" />

            {/* Contador Total */}
            <div className="flex items-center gap-2" title="Total de acessos">
                <Eye size={12} />
                <span>{visits.toLocaleString()} Acessos</span>
            </div>
        </div>
    );
};
