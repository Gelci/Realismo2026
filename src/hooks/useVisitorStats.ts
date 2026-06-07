import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const useVisitorStats = () => {
    const [visits, setVisits] = useState<number | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<number>(1);

    useEffect(() => {
        console.log('--- SITE VERSION: 2.1 (Contador Invisível via RPC) ---');

        // Verifica se o Supabase está configurado antes de tentar conectar
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            console.warn('Supabase não configurado. As estatísticas não serão enviadas.');
            return;
        }

        // 1. Incrementar visitas e buscar o total
        const incrementVisits = async () => {
            try {
                console.log('Tentando incrementar visitas no Supabase...');
                // Chama a função RPC para incrementar
                const { error } = await supabase.rpc('increment_visits');
                
                if (error) {
                    console.error('Erro RPC Supabase:', error);
                    setVisits(1420); // Fallback se falhar
                } else {
                    console.log('Visita incrementada com sucesso!');
                    
                    // Tenta buscar o valor total atualizado do banco de dados
                    const { data, error: fetchError } = await supabase
                        .from('site_stats')
                        .select('total_visits')
                        .eq('id', 1)
                        .single();
                    
                    if (data && !fetchError) {
                        setVisits(Number(data.total_visits));
                    } else {
                        console.warn('Erro ao ler total_visits (RLS ativa?). Usando semente offline.');
                        setVisits(1420); // Fallback offline se RLS bloquear o SELECT direto
                    }
                }
            } catch (err) {
                console.error('Erro inesperado ao incrementar estatísticas:', err);
                setVisits(1420); // Fallback offline
            }
        };

        incrementVisits();

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
