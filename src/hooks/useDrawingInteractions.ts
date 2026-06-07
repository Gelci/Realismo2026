import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { DRAWINGS } from '../data/artes';

export interface DrawingStats {
    likes_count: number;
    loves_count: number;
}

export interface UserReaction {
    liked: boolean;
    loved: boolean;
}

export const useDrawingInteractions = () => {
    const [interactions, setInteractions] = useState<Record<number, DrawingStats>>({});
    const [userReactions, setUserReactions] = useState<Record<number, UserReaction>>({});
    const [loading, setLoading] = useState<boolean>(true);

    // 1. Inicializar sementes estáticas de forma determinística
    const generateSeeds = () => {
        const seeds: Record<number, DrawingStats> = {};
        DRAWINGS.forEach((drawing) => {
            // Sementes geradas de forma orgânica com base no ID da obra
            const likesSeed = (drawing.id * 7) % 23 + 5;
            const lovesSeed = (drawing.id * 11) % 13 + 2;
            seeds[drawing.id] = {
                likes_count: likesSeed,
                loves_count: lovesSeed,
            };
        });
        return seeds;
    };

    useEffect(() => {
        // A. Carregar reações do usuário salvas localmente
        let savedReactions: Record<number, UserReaction> = {};
        try {
            const raw = localStorage.getItem('gelci_arts_user_reactions');
            if (raw) {
                savedReactions = JSON.parse(raw);
            }
        } catch (e) {
            console.error('Erro ao ler reações do localStorage:', e);
        }
        setUserReactions(savedReactions);

        // B. Inicializar estado local com as sementes (fallback)
        const seeds = generateSeeds();
        
        // Ajustar sementes se o usuário tiver reagido offline
        // (Isso garante que reações dadas offline sejam somadas visualmente caso o DB não carregue)
        Object.keys(savedReactions).forEach((key) => {
            const id = Number(key);
            if (seeds[id]) {
                if (savedReactions[id].liked) seeds[id].likes_count += 1;
                if (savedReactions[id].loved) seeds[id].loves_count += 1;
            }
        });
        
        setInteractions(seeds);

        // C. Buscar estatísticas reais do Supabase
        const fetchInteractions = async () => {
            try {
                const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
                const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

                if (!supabaseUrl || !supabaseAnonKey) {
                    setLoading(false);
                    return;
                }

                const { data, error } = await supabase
                    .from('drawing_interactions')
                    .select('drawing_id, likes_count, loves_count');

                if (error) {
                    console.warn('Supabase retornou erro. Usando sementes offline:', error.message);
                } else if (data) {
                    // Mapear dados retornados do banco por ID
                    const dbData: Record<number, DrawingStats> = {};
                    
                    // Inicializar com as sementes (para obras sem registro no DB ainda)
                    const baseSeeds = generateSeeds();
                    
                    DRAWINGS.forEach((d) => {
                        dbData[d.id] = { ...baseSeeds[d.id] };
                    });

                    data.forEach((row: any) => {
                        if (row.drawing_id !== undefined) {
                            dbData[row.drawing_id] = {
                                likes_count: row.likes_count ?? 0,
                                loves_count: row.loves_count ?? 0,
                            };
                        }
                    });

                    setInteractions(dbData);
                }
            } catch (err) {
                console.error('Erro ao conectar com o Supabase para carregar interações:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchInteractions();
    }, []);

    // 2. Alternar Curtida (Gostei/Like)
    const toggleLike = async (drawingId: number) => {
        const isLiked = !!userReactions[drawingId]?.liked;
        const incrementVal = isLiked ? -1 : 1;

        // A. Atualizar reações do usuário localmente
        const currentReaction = userReactions[drawingId] || { liked: false, loved: false };
        const updatedReactions = {
            ...userReactions,
            [drawingId]: {
                ...currentReaction,
                liked: !isLiked
            }
        };
        setUserReactions(updatedReactions);
        localStorage.setItem('gelci_arts_user_reactions', JSON.stringify(updatedReactions));

        // B. Atualização otimista do contador visual
        setInteractions((prev) => {
            const current = prev[drawingId] || { likes_count: 0, loves_count: 0 };
            return {
                ...prev,
                [drawingId]: {
                    ...current,
                    likes_count: Math.max(0, current.likes_count + incrementVal),
                }
            };
        });

        // C. Sincronizar com o Supabase em segundo plano
        try {
            const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
            const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

            if (supabaseUrl && supabaseAnonKey) {
                await supabase.rpc('toggle_drawing_interaction', {
                    drawing_id_param: drawingId,
                    interaction_type: 'like',
                    increment_val: incrementVal
                });
            }
        } catch (err) {
            console.error('Falha ao enviar curtida para o servidor:', err);
        }
    };

    // 3. Alternar Amei (Love)
    const toggleLove = async (drawingId: number) => {
        const isLoved = !!userReactions[drawingId]?.loved;
        const incrementVal = isLoved ? -1 : 1;

        // A. Atualizar reações do usuário localmente
        const currentReaction = userReactions[drawingId] || { liked: false, loved: false };
        const updatedReactions = {
            ...userReactions,
            [drawingId]: {
                ...currentReaction,
                loved: !isLoved
            }
        };
        setUserReactions(updatedReactions);
        localStorage.setItem('gelci_arts_user_reactions', JSON.stringify(updatedReactions));

        // B. Atualização otimista do contador visual
        setInteractions((prev) => {
            const current = prev[drawingId] || { likes_count: 0, loves_count: 0 };
            return {
                ...prev,
                [drawingId]: {
                    ...current,
                    loves_count: Math.max(0, current.loves_count + incrementVal),
                }
            };
        });

        // C. Sincronizar com o Supabase em segundo plano
        try {
            const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
            const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

            if (supabaseUrl && supabaseAnonKey) {
                await supabase.rpc('toggle_drawing_interaction', {
                    drawing_id_param: drawingId,
                    interaction_type: 'love',
                    increment_val: incrementVal
                });
            }
        } catch (err) {
            console.error('Falha ao enviar amei para o servidor:', err);
        }
    };

    // Calcular o total geral de curtidas de todas as obras combinadas
    const getTotalLikes = () => {
        return Object.values(interactions).reduce(
            (acc, curr) => acc + (curr.likes_count ?? 0) + (curr.loves_count ?? 0),
            0
        );
    };

    return {
        interactions,
        userReactions,
        loading,
        toggleLike,
        toggleLove,
        getTotalLikes,
    };
};
