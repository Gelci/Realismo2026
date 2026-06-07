import React from 'react';
import { useVisitorStats } from '../hooks/useVisitorStats';
import { useDrawingInteractions } from '../hooks/useDrawingInteractions';
import { Eye, Users, Heart } from 'lucide-react';

export const VisitorStats = () => {
    const { visits, onlineUsers } = useVisitorStats();
    const { getTotalLikes } = useDrawingInteractions();
    const totalInteractions = getTotalLikes();

    return (
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-lead-light font-medium tracking-wide">
            {visits !== null && (
                <div className="flex items-center gap-1.5 text-lead-dark dark:text-lead-light" title="Total de visualizações">
                    <Eye size={14} className="opacity-70" />
                    <span>{visits.toLocaleString()} visualizações</span>
                </div>
            )}
            
            <div className="flex items-center gap-1.5 text-lead-dark dark:text-lead-light" title="Usuários ativos agora">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <Users size={14} className="opacity-70" />
                <span>{onlineUsers} online</span>
            </div>

            {totalInteractions > 0 && (
                <div className="flex items-center gap-1.5 text-lead-dark dark:text-lead-light" title="Total de interações recebidas">
                    <Heart size={14} className="text-rose-500 fill-rose-500/10 opacity-90 animate-pulse" />
                    <span>{totalInteractions} curtidas</span>
                </div>
            )}
        </div>
    );
};
