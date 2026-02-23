/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// --- Tipos ---
export interface Drawing {
  id: number;
  title: string;
  category: string;
  year: string;
  imageUrl: string;
}

// --- Dados das Obras ---
// Para adicionar uma nova obra:
// 1. Coloque a imagem na pasta 'public/artes'
// 2. Adicione um novo objeto na lista abaixo seguindo o modelo:
// {
//   id: 7, // Número sequencial único
//   title: "Nome da Obra",
//   category: "Retrato", // Opções: Retrato, Natureza Morta, Paisagem, Estudo
//   year: "2024",
//   imageUrl: "/artes/nome-do-arquivo.jpg" // Caminho da imagem
// }

export const DRAWINGS: Drawing[] = [
  {
    id: 1,
    title: "Olhar Profundo",
    category: "Retrato",
    year: "2023",
    imageUrl: "https://picsum.photos/seed/portrait1/800/1000?grayscale"
  },
  {
    id: 2,
    title: "Texturas do Tempo",
    category: "Natureza Morta",
    year: "2024",
    imageUrl: "https://picsum.photos/seed/still/800/800?grayscale"
  },
  {
    id: 3,
    title: "Expressão Silenciosa",
    category: "Retrato",
    year: "2023",
    imageUrl: "https://picsum.photos/seed/portrait2/800/1100?grayscale"
  },
  {
    id: 4,
    title: "O Velho Pescador",
    category: "Retrato",
    year: "2024",
    imageUrl: "https://picsum.photos/seed/oldman/800/900?grayscale"
  },
  {
    id: 5,
    title: "Luz e Sombra",
    category: "Estudo",
    year: "2022",
    imageUrl: "https://picsum.photos/seed/study1/800/800?grayscale"
  },
  {
    id: 6,
    title: "Arquitetura Clássica",
    category: "Paisagem",
    year: "2023",
    imageUrl: "https://picsum.photos/seed/arch/1000/800?grayscale"
  },
  {
  id: 7, // Use um número novo
  title: "Testando o titulo da obra",
  category: "Retrato", // Categoria
  year: "2024",
  imageUrl: "/artes/Caomulher.jpg" // O caminho da sua imagem
  }
];
