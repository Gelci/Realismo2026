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
    title: "Olhar Profundo,usando a cor azul",
    category: "Retrato",
    year: "2024",
    imageUrl: "/artes/cat.jpg" // O caminho da sua imagem
  },
  {
    id: 2,
    title: "Olhar Oriental",
    category: "Retrato",
    year: "2022",
    imageUrl: "/artes/Japa.jpg" // O caminho da sua imagem
  },
  {
    id: 3,
    title: "Auto Retrato",
    category: "Retrato",
    year: "2021",
    imageUrl: "/artes/Andrielly.jpg" // O caminho da sua imagem
  },
  {
    id: 4,
    title: "O Artista Rap",
    category: "Retrato",
    year: "2016",
    imageUrl: "/artes/projota.jpg" // O caminho da sua imagem
  },
  {
    id: 5,
    title: "Artista Debby Ryan",
    category: "Retrato",
    year: "2016",
    imageUrl: "/artes/retrato1.jpg" // O caminho da sua imagem
  },
  {
    id: 6,
    title: "Sobrenatural a Série",
    category: "Retrato",
    year: "2018",
    imageUrl: "/artes/Sobrenatural.jpg" // O caminho da sua imagem
  },
  {
  id: 7, // Use um número novo
  title: "Almas Gêmeas",
  category: "Retrato", // Categoria
  year: "2017",
  imageUrl: "/artes/Caomulher.jpg" // O caminho da sua imagem
  },
  {
  id: 8, // Use um número novo
  title: "Expirado na cantora Amy",
  category: "Retrato", // Categoria
  year: "2022",
  imageUrl: "/artes/Amy.jpg" // O caminho da sua imagem
  }
];
