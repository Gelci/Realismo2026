import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const useVisitorStats = () => {
    const [visits, setVisits] = useState<number | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<number>(1);

    useEffect(() => {
        // 1. Incrementar e buscar visitas totais
        const fetchVisits = async () => {
            try {
                // Chama a função RPC para incrementar
                await supabase.rpc('increment_visits');
                
                // Busca o valor atualizado
                const { data } = await supabase
                    .from('site_stats')
                    .select('total_visits')
                    .single();

                if (data) {
                    setVisits(data.total_visits);
                }
            } catch (err) {
                console.error('Erro ao buscar estatísticas:', err);
            }
        };

        fetchVisits();

        // 2. Monitorar usuários online em tempo real (Presence)
        const channel = supabase.channel('online-users', {
            config: {
                presence: {
                    key: Math.random().toString(36).substring(7), // ID único temporário para esta sessão
                },
            },
        });

        channel
            .on('presence', { event: 'sync' }, () => {
                const state = channel.presenceState();
                const count = Object.keys(state).length;
                setOnlineUsers(Math.max(1, count));
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    await channel.track({ online_at: new Date().toISOString() });
                }
            });

        return () => {
            channel.unsubscribe();
        };
    }, []);

    return { visits, onlineUsers };
};
