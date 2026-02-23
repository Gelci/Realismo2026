/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Mail, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowUpRight,
  User,
  Image as ImageIcon,
  MessageSquare
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface Drawing {
  id: number;
  title: string;
  category: string;
  year: string;
  imageUrl: string;
}

// --- Mock Data ---
const DRAWINGS: Drawing[] = [
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
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Galeria', href: '#gallery' },
    { name: 'Sobre', href: '#about' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "bg-paper/90 backdrop-blur-md border-b border-graphite/10 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#home" className="text-2xl font-serif font-bold tracking-tighter text-graphite">
          Gelci<span className="italic font-normal opacity-70">Arts</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm uppercase tracking-widest font-medium hover:text-lead-light transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-paper border-b border-graphite/10 p-6 flex flex-col space-y-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-serif italic"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 paper-texture opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm uppercase tracking-[0.3em] text-lead-light mb-4 block">
            Realismo em Grafite
          </span>
          <h1 className="text-7xl md:text-9xl font-serif leading-tight mb-6">
            A alma no <br />
            <span className="italic">traço.</span>
          </h1>
          <p className="text-lg text-lead-dark max-w-md mb-8 font-light leading-relaxed">
            Explorando a profundidade da luz e sombra através do grafite. 
            Cada desenho é uma jornada de paciência e precisão por Gelcimar Barbosa.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#gallery" 
              className="px-8 py-4 bg-graphite text-paper rounded-full flex items-center gap-2 hover:bg-lead-dark transition-all group"
            >
              Ver Galeria <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 border border-graphite/20 rounded-full hover:bg-graphite/5 transition-all"
            >
              Encomendas
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative aspect-[4/5] max-w-md mx-auto lg:ml-auto"
        >
          <div className="absolute -inset-4 border border-graphite/10 rounded-2xl -rotate-3 pointer-events-none" />
          <div className="absolute -inset-4 border border-graphite/10 rounded-2xl rotate-2 pointer-events-none" />
          <img 
            src="https://picsum.photos/seed/hero-graphite/800/1000?grayscale" 
            alt="Graphite Drawing Example" 
            className="w-full h-full object-cover rounded-xl shadow-2xl grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-6 -right-6 bg-paper p-4 shadow-xl rounded-lg border border-graphite/5">
            <p className="text-xs font-mono uppercase tracking-tighter text-lead-light">Obra em Destaque</p>
            <p className="font-serif italic text-lg">"O Olhar"</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const [filter, setFilter] = useState('Todos');
  const categories = ['Todos', 'Retrato', 'Natureza Morta', 'Paisagem', 'Estudo'];

  const filteredDrawings = filter === 'Todos' 
    ? DRAWINGS 
    : DRAWINGS.filter(d => d.category === filter);

  return (
    <section id="gallery" className="py-24 bg-white/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-5xl font-serif mb-4">Galeria</h2>
            <p className="text-lead-dark max-w-sm">Uma seleção de obras originais e estudos técnicos.</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-4 py-2 text-sm uppercase tracking-widest transition-all border-b-2",
                  filter === cat ? "border-graphite text-graphite" : "border-transparent text-lead-light hover:text-graphite"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredDrawings.map((drawing) => (
              <motion.div
                layout
                key={drawing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-[3/4] rounded-lg mb-4 bg-paper">
                  <img 
                    src={drawing.imageUrl} 
                    alt={drawing.title}
                    className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-graphite/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-paper border border-paper/30 px-6 py-2 rounded-full backdrop-blur-sm">
                      Ver Detalhes
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-serif italic">{drawing.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-lead-light">{drawing.category}</p>
                  </div>
                  <span className="text-xs font-mono text-lead-light">{drawing.year}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl max-w-md mx-auto">
              <img 
                src="https://picsum.photos/seed/artist/800/800?grayscale" 
                alt="Gelcimar Barbosa" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-graphite text-paper p-6 rounded-2xl shadow-xl">
              <p className="text-4xl font-serif italic">15+</p>
              <p className="text-xs uppercase tracking-widest opacity-70">Anos de Traço</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-5xl font-serif mb-8">Gelcimar Barbosa</h2>
            <div className="space-y-6 text-lead-dark leading-relaxed">
              <p>
                Conhecido no mundo artístico como <span className="font-bold text-graphite">GelciArts</span>, 
                sou um especialista em realismo a grafite. Minha paixão é capturar a essência humana 
                e a beleza dos detalhes que muitas vezes passam despercebidos.
              </p>
              <p>
                Cada obra é resultado de dezenas de horas de observação meticulosa. Utilizo técnicas 
                clássicas de sombreamento e texturização para criar imagens que desafiam a percepção 
                entre o desenho e a fotografia.
              </p>
              <div className="pt-6 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-graphite mb-2">Técnica</h4>
                  <p className="text-sm">Grafite sobre papel (H a 9B), esfuminho e borracha de precisão.</p>
                </div>
                <div>
                  <h4 className="font-bold text-graphite mb-2">Foco</h4>
                  <p className="text-sm">Retratos hiper-realistas, anatomia e texturas orgânicas.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-graphite text-paper relative">
      <div className="absolute inset-0 paper-texture opacity-5 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-serif mb-6">Vamos criar algo <span className="italic">eterno?</span></h2>
          <p className="text-lead-light mb-12 text-lg">
            Disponível para encomendas personalizadas e projetos comerciais. 
            Transforme sua foto favorita em uma obra de arte única.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <a href="#" className="p-8 border border-paper/10 rounded-2xl hover:bg-paper/5 transition-all group">
              <Instagram className="mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-sm uppercase tracking-widest">@gelciarts</p>
            </a>
            <a href="mailto:contato@gelciarts.com" className="p-8 border border-paper/10 rounded-2xl hover:bg-paper/5 transition-all group">
              <Mail className="mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-sm uppercase tracking-widest">contato@gelciarts.com</p>
            </a>
            <div className="p-8 border border-paper/10 rounded-2xl hover:bg-paper/5 transition-all group">
              <MessageSquare className="mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-sm uppercase tracking-widest">WhatsApp</p>
            </div>
          </div>

          <form className="text-left bg-paper/5 p-8 rounded-3xl border border-paper/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 opacity-70">Nome</label>
                <input type="text" className="w-full bg-transparent border-b border-paper/20 py-2 focus:border-paper transition-colors outline-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 opacity-70">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-paper/20 py-2 focus:border-paper transition-colors outline-none" />
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-widest mb-2 opacity-70">Mensagem</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-paper/20 py-2 focus:border-paper transition-colors outline-none resize-none"></textarea>
            </div>
            <button className="w-full py-4 bg-paper text-graphite rounded-full font-bold uppercase tracking-widest hover:bg-lead-light transition-all">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-graphite/5">
      <div className="container mx-auto px-6 flex flex-col md:row justify-between items-center gap-6">
        <p className="text-sm text-lead-light">
          © {new Date().getFullYear()} GelciArts. Todos os direitos reservados.
        </p>
        <div className="flex space-x-6">
          <a href="#" className="text-lead-light hover:text-graphite transition-colors">Instagram</a>
          <a href="#" className="text-lead-light hover:text-graphite transition-colors">Behance</a>
          <a href="#" className="text-lead-light hover:text-graphite transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-graphite selection:text-paper">
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />
      
      {/* Custom Cursor or other decorative elements could go here */}
      <div className="fixed bottom-8 right-8 z-40">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 bg-graphite text-paper rounded-full flex items-center justify-center shadow-xl"
        >
          <ArrowUpRight className="-rotate-45" size={20} />
        </motion.button>
      </div>
    </div>
  );
}
