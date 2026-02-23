# Como Adicionar Novas Obras ao Site

Siga estes passos simples para adicionar seus novos desenhos à galeria:

## 1. Prepare a Imagem
1.  Digitalize ou tire uma foto de alta qualidade da sua obra.
2.  Nomeie o arquivo de forma simples, sem espaços ou acentos.
    *   Exemplo: `retrato-idoso.jpg` ou `natureza-morta-1.jpg`.
3.  Copie o arquivo da imagem para a pasta: `public/artes`.
    *   Se a pasta `artes` não existir dentro de `public`, você pode criá-la.

## 2. Atualize a Lista de Obras
1.  Abra o arquivo: `src/data/artes.ts`.
2.  Encontre a lista `DRAWINGS` (que começa com `export const DRAWINGS = [`).
3.  Adicione um novo bloco de informações no final da lista (antes do `];`).

Use este modelo:

```typescript
  {
    id: 7, // Coloque um número que ainda não foi usado
    title: "Título da Sua Obra",
    category: "Retrato", // Escolha: Retrato, Natureza Morta, Paisagem, ou Estudo
    year: "2024",
    imageUrl: "/artes/nome-do-seu-arquivo.jpg" // O caminho da imagem que você salvou
  },
```

**Importante:** Não esqueça da vírgula `,` se houver mais itens depois ou antes.

## 3. Veja o Resultado
Se o site estiver rodando (`npm run dev`), as alterações aparecerão automaticamente. Se não, inicie o site novamente.
