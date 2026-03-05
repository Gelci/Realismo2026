import React from 'react';
import { useVisitorStats } from '../hooks/useVisitorStats';

export const VisitorStats = () => {
    // Mantemos o hook para que a contagem seja enviada ao Supabase,
    // mas não renderizamos nada visualmente.
    useVisitorStats();

    return null;
};
