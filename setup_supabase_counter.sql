-- Configuração Completa do Contador de Visitas no Supabase

-- 1. Criar a tabela site_stats se não existir
CREATE TABLE IF NOT EXISTS public.site_stats (
  id bigint PRIMARY KEY DEFAULT 1,
  total_visits bigint DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 2. Garantir que existe o registro inicial (ID=1)
INSERT INTO public.site_stats (id, total_visits)
VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

-- 4. Remover políticas antigas para evitar conflitos
DROP POLICY IF EXISTS "Allow public read access" ON public.site_stats;
DROP POLICY IF EXISTS "Allow update via function only" ON public.site_stats;

-- (Opcional) Política para permitir leitura apenas para authenticated users (se você logar no painel)
-- CREATE POLICY "Allow authenticated read access" ON public.site_stats FOR SELECT TO authenticated USING (true);

-- 5. Criar ou Atualizar a função de incremento (RPC)
-- SECURITY DEFINER é crucial: permite que a função rode com permissões de admin,
-- ignorando as restrições de RLS para quem chama (o usuário anônimo do site).
CREATE OR REPLACE FUNCTION public.increment_visits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.site_stats
  SET total_visits = total_visits + 1
  WHERE id = 1;
END;
$$;

-- 6. Dar permissão para usuários anônimos e autenticados executarem a função
GRANT EXECUTE ON FUNCTION public.increment_visits() TO anon;
GRANT EXECUTE ON FUNCTION public.increment_visits() TO authenticated;
GRANT SELECT, UPDATE ON public.site_stats TO service_role;

-- Confirmação
SELECT * FROM public.site_stats;
