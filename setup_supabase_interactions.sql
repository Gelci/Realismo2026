-- Configuração do Sistema de Curtidas (Likes/Amei) no Supabase

-- 1. Criar a tabela drawing_interactions se não existir
CREATE TABLE IF NOT EXISTS public.drawing_interactions (
  drawing_id integer PRIMARY KEY,
  likes_count integer DEFAULT 0,
  loves_count integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.drawing_interactions ENABLE ROW LEVEL SECURITY;

-- 3. Remover políticas antigas para evitar conflitos
DROP POLICY IF EXISTS "Allow public read access on interactions" ON public.drawing_interactions;

-- 4. Criar política para permitir que qualquer um leia os contadores
CREATE POLICY "Allow public read access on interactions" ON public.drawing_interactions
  FOR SELECT TO anon, authenticated USING (true);

-- 5. Criar ou Atualizar a função RPC para registrar likes e loves de forma segura
-- A função gerencia incrementos (+1) ou decrementos (-1) para ambos os tipos: 'like' ou 'love'
CREATE OR REPLACE FUNCTION public.toggle_drawing_interaction(drawing_id_param integer, interaction_type text, increment_val integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Garante que o registro exista para aquela obra
  INSERT INTO public.drawing_interactions (drawing_id, likes_count, loves_count)
  VALUES (drawing_id_param, 0, 0)
  ON CONFLICT (drawing_id) DO NOTHING;

  IF interaction_type = 'like' THEN
    UPDATE public.drawing_interactions
    SET likes_count = GREATEST(0, likes_count + increment_val),
        updated_at = now()
    WHERE drawing_id = drawing_id_param;
  ELSIF interaction_type = 'love' THEN
    UPDATE public.drawing_interactions
    SET loves_count = GREATEST(0, loves_count + increment_val),
        updated_at = now()
    WHERE drawing_id = drawing_id_param;
  END IF;
END;
$$;

-- 6. Conceder permissão de execução da função para usuários anônimos e autenticados
GRANT EXECUTE ON FUNCTION public.toggle_drawing_interaction(integer, text, integer) TO anon;
GRANT EXECUTE ON FUNCTION public.toggle_drawing_interaction(integer, text, integer) TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.drawing_interactions TO service_role;
