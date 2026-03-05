-- Atualização de Segurança do Supabase
-- Baseado na solicitação para remover a exibição de acessos no site e manter apenas no Supabase.

-- 1. Remover a política de leitura pública ("Allow public read access")
-- Como o site não exibe mais o contador, não é necessário permitir que usuários anônimos leiam a tabela site_stats.
-- Isso aumenta a segurança, garantindo que os dados de acesso fiquem privados.

DROP POLICY IF EXISTS "Allow public read access" ON "public"."site_stats";

-- 2. Garantir que a função de incremento funcione
-- A função increment_visits deve ser definida como SECURITY DEFINER para poder atualizar a tabela
-- mesmo sem permissões de UPDATE para o usuário anônimo.
-- Exemplo de como a função deve estar configurada (apenas para referência, não precisa rodar se já estiver ok):

/*
CREATE OR REPLACE FUNCTION increment_visits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO site_stats (id, total_visits)
  VALUES (1, 1)
  ON CONFLICT (id)
  DO UPDATE SET total_visits = site_stats.total_visits + 1;
END;
$$;
*/

-- Nota sobre o comando fornecido:
-- O comando 'alter policy ... using ( 7 )' está incorreto porque a cláusula USING espera uma condição booleana (true/false).
-- Além disso, como removemos a necessidade de leitura pública, a melhor prática é remover a política inteira em vez de alterá-la.
