/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { 
  Instagram, 
  Mail, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft,
  ArrowUpRight,
  User,
  Image as ImageIcon,
  MessageSquare,
  Loader2,
  CheckCircle,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DRAWINGS, type Drawing } from './data/artes';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Custom Hooks ---
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
};

// --- Components ---

const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 border-2 border-graphite rounded-full pointer-events-none z-[100] hidden md:block mix-blend-difference"
      animate={{
        x: x - 12,
        y: y - 12,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'transparent',
        borderColor: isHovering ? 'transparent' : 'white'
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
    >
      {isHovering && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="w-full h-full flex items-center justify-center text-[4px] font-bold text-black uppercase tracking-widest"
        >
        </motion.div>
      )}
    </motion.div>
  );
};

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
            className="absolute top-full left-0 w-full bg-paper border-b border-graphite/10 p-6 flex flex-col space-y-4 md:hidden shadow-xl"
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
  const [selectedDrawing, setSelectedDrawing] = useState<Drawing | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const categories = ['Todos', 'Retrato', 'Natureza Morta', 'Paisagem', 'Estudo'];

  const filteredDrawings = filter === 'Todos' 
    ? DRAWINGS 
    : DRAWINGS.filter(d => d.category === filter);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedDrawing) return;
    setIsZoomed(false);
    const currentIndex = filteredDrawings.findIndex(d => d.id === selectedDrawing.id);
    const nextIndex = (currentIndex + 1) % filteredDrawings.length;
    setSelectedDrawing(filteredDrawings[nextIndex]);
  }, [filteredDrawings, selectedDrawing]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedDrawing) return;
    setIsZoomed(false);
    const currentIndex = filteredDrawings.findIndex(d => d.id === selectedDrawing.id);
    const prevIndex = (currentIndex - 1 + filteredDrawings.length) % filteredDrawings.length;
    setSelectedDrawing(filteredDrawings[prevIndex]);
  }, [filteredDrawings, selectedDrawing]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedDrawing) return;
      if (e.key === 'Escape') {
        if (isZoomed) setIsZoomed(false);
        else setSelectedDrawing(null);
      }
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDrawing, isZoomed, handleNext, handlePrev]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

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
                onClick={() => setSelectedDrawing(drawing)}
              >
                <div className="relative overflow-hidden aspect-[3/4] rounded-lg mb-4 bg-paper shadow-md group-hover:shadow-xl transition-all duration-500">
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedDrawing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-graphite/95 backdrop-blur-sm p-4"
            onClick={() => setSelectedDrawing(null)}
          >
            <button 
              className="absolute top-6 right-6 text-paper/70 hover:text-paper transition-colors"
              onClick={() => setSelectedDrawing(null)}
            >
              <X size={32} />
            </button>

            <button 
              className="absolute left-4 md:left-8 text-paper/50 hover:text-paper transition-colors hidden md:block"
              onClick={handlePrev}
            >
              <ChevronLeft size={48} />
            </button>

            <button 
              className="absolute right-4 md:right-8 text-paper/50 hover:text-paper transition-colors hidden md:block"
              onClick={handleNext}
            >
              <ChevronRight size={48} />
            </button>

            <div 
              className="max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row gap-8 bg-paper rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="flex-1 bg-black flex items-center justify-center relative overflow-hidden cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onClick={toggleZoom}
              >
                <div 
                  className={cn(
                    "relative transition-transform duration-200 ease-out w-full h-full flex items-center justify-center",
                    isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                  )}
                >
                  <img 
                    ref={imageRef}
                    src={selectedDrawing.imageUrl} 
                    alt={selectedDrawing.title}
                    className={cn(
                      "max-w-full max-h-[60vh] md:max-h-[85vh] object-contain transition-all duration-200",
                      isZoomed ? "scale-[2.5]" : "scale-100"
                    )}
                    style={isZoomed ? {
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                    } : undefined}
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white/70 pointer-events-none">
                   {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
                </div>
              </div>
              <div className="w-full md:w-80 p-8 flex flex-col justify-center bg-paper border-l border-graphite/5 relative z-10">
                <span className="text-xs uppercase tracking-widest text-lead-light mb-2">{selectedDrawing.category}</span>
                <h3 className="text-3xl font-serif mb-4">{selectedDrawing.title}</h3>
                <div className="w-12 h-1 bg-graphite mb-6"></div>
                <p className="text-lead-dark mb-8 text-sm leading-relaxed">
                  Uma obra detalhada criada em {selectedDrawing.year}. Este desenho explora as nuances de luz e sombra, 
                  utilizando grafite de alta qualidade sobre papel texturizado.
                </p>
                <div className="mt-auto">
                  <p className="text-xs text-lead-light uppercase tracking-widest mb-1">Ano</p>
                  <p className="font-mono">{selectedDrawing.year}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      // Reset after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

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

          <form onSubmit={handleSubmit} className="text-left bg-paper/5 p-8 rounded-3xl border border-paper/10 relative overflow-hidden">
            <AnimatePresence>
              {formStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-graphite z-20 flex flex-col items-center justify-center text-center p-8"
                >
                  <CheckCircle size={64} className="text-green-400 mb-4" />
                  <h3 className="text-2xl font-serif mb-2">Mensagem Enviada!</h3>
                  <p className="text-lead-light">Obrigado pelo contato. Responderei em breve.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 opacity-70">Nome</label>
                <input required type="text" className="w-full bg-transparent border-b border-paper/20 py-2 focus:border-paper transition-colors outline-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 opacity-70">Email</label>
                <input required type="email" className="w-full bg-transparent border-b border-paper/20 py-2 focus:border-paper transition-colors outline-none" />
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-widest mb-2 opacity-70">Mensagem</label>
              <textarea required rows={4} className="w-full bg-transparent border-b border-paper/20 py-2 focus:border-paper transition-colors outline-none resize-none"></textarea>
            </div>
            <button 
              disabled={formStatus === 'submitting'}
              className="w-full py-4 bg-paper text-graphite rounded-full font-bold uppercase tracking-widest hover:bg-lead-light transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {formStatus === 'submitting' ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Enviando...
                </>
              ) : (
                'Enviar Mensagem'
              )}
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
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
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

const App = () => {
  return (
    <div className="font-sans text-graphite bg-paper min-h-screen relative selection:bg-graphite selection:text-paper">
      <CustomCursor />
      <div className="noise-overlay pointer-events-none fixed inset-0 z-50 opacity-[0.03]"></div>
      <Navbar />
      <Hero />
      <Gallery />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
