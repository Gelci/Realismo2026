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
    year: "2016",
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
  },
  {
  id: 9, // Use um número novo
  title: "Alto retrato de um casal",
  category: "Retrato", // Categoria
  year: "2021",
  imageUrl: "/artes/CasalDiego.jpg" // O caminho da sua imagem
  },
  {
  id: 10, // Use um número novo
  title: "Cantora Cintia Luz",
  category: "Retrato", // Categoria
  year: "2022",
  imageUrl: "/artes/Cintia.jpg" // O caminho da sua imagem
  },
  {
  id: 11, // Use um número novo
  title: "Casal Feliz",
  category: "Retrato", // Categoria
  year: "2021",
  imageUrl: "/artes/decir.jpg" // O caminho da sua imagem
  },
  {
  id: 12, // Use um número novo
  title: "Mulheres da Família",
  category: "Retrato", // Categoria
  year: "2022",
  imageUrl: "/artes/familia.jpg" // O caminho da sua imagem
  },
  {
  id: 13, // Use um número novo
  title: "O Rei da Selva",
  category: "Retrato", // Categoria
  year: "2023",
  imageUrl: "/artes/leao.jpg" // O caminho da sua imagem
  },
  {
  id: 14, // Use um número novo
  title: "Felino",
  category: "Retrato", // Categoria
  year: "2015",
  imageUrl: "/artes/cat2.jpg" // O caminho da sua imagem
  },
  {
  id: 15, // Use um número novo
  title: "Menino",
  category: "Retrato", // Categoria
  year: "2022",
  imageUrl: "/artes/menino.jpg" // O caminho da sua imagem
  },
  {
  id: 16, // Use um número novo
  title: "Casal e seus Pets",
  category: "Retrato", // Categoria
  year: "2024",
  imageUrl: "/artes/pedreiro.jpg" // O caminho da sua imagem
  },
  {
  id: 17, // Use um número novo
  title: "Guerreira do The Walking Dead ",
  category: "Retrato", // Categoria
  year: "2015",
  imageUrl: "/artes/michonne.jpg" // O caminho da sua imagem
  },
  {
  id: 18, // Use um número novo
  title: "Amizade Fiél",
  category: "Retrato", // Categoria
  year: "2023",
  imageUrl: "/artes/cao2.jpg" // O caminho da sua imagem
  },
  {
  id: 19, // Use um número novo
  title: "Filhão",
  category: "Retrato", // Categoria
  year: "2024",
  imageUrl: "/artes/rakin.jpg" // O caminho da sua imagem
  },
  {
  id: 20, // Use um número novo
  title: "Chow Chow de estimação",
  category: "Retrato", // Categoria
  year: "2024",
  imageUrl: "/artes/negra.jpg" // O caminho da sua imagem
  },
  {
  id: 21, // Use um número novo
  title: "Casal Feliz",
  category: "Retrato", // Categoria
  year: "2023",
  imageUrl: "/artes/rodrigo.jpg" // O caminho da sua imagem
  },
  {
  id: 22, // Use um número novo
  title: "Lindão :)",
  category: "Retrato", // Categoria
  year: "2023",
  imageUrl: "/artes/rakin2.jpg" // O caminho da sua imagem
  },
  {
  id: 23, // Use um número novo
  title: "Estudos",
  category: "Estudo", // Categoria
  year: "2021",
  imageUrl: "/artes/01.jpg" // O caminho da sua imagem
  },
  {
  id: 24, // Use um número novo
  title: "Pequeno Anjo",
  category: "Estudo", // Categoria
  year: "2021",
  imageUrl: "/artes/02.jpg" // O caminho da sua imagem
  },
  {
  id: 25, // Use um número novo
  title: "Rakin sem muito Realismo",
  category: "Estudo", // Categoria
  year: "2025",
  imageUrl: "/artes/rakin3.jpg" // O caminho da sua imagem
  },
  {
  id: 26, // Use um número novo
  title: "Menina da Flor",
  category: "Estudo", // Categoria
  year: "2024",
  imageUrl: "/artes/03.jpg" // O caminho da sua imagem
  }
];
