import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Info, ThumbsUp, Heart, Share2 } from 'lucide-react';
import { DRAWINGS, type Drawing } from '../data/artes';
import { cn } from '../utils/cn';
import { SketchCircle, SketchHighlight } from './ui/Sketches';
import { useDrawingInteractions } from '../hooks/useDrawingInteractions';

export const Gallery = () => {
    const [filter, setFilter] = useState('Todos');
    const [selectedDrawing, setSelectedDrawing] = useState<Drawing | null>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Estado e interações de curtidas (Supabase + LocalStorage)
    const { interactions, userReactions, toggleLike, toggleLove } = useDrawingInteractions();
    const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);
    const [copied, setCopied] = useState(false);

    // Efeito para carregar obra específica via link direto (hash #gallery-obra-X)
    useEffect(() => {
        const hash = window.location.hash;
        if (hash.startsWith('#gallery-obra-')) {
            const id = parseInt(hash.replace('#gallery-obra-', ''), 10);
            const found = DRAWINGS.find(d => d.id === id);
            if (found) {
                setSelectedDrawing(found);
                setTimeout(() => {
                    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                }, 500);
            }
        }
    }, []);

    // Sincronizar hash da URL com a obra selecionada
    useEffect(() => {
        if (selectedDrawing) {
            window.history.pushState(null, '', `#gallery-obra-${selectedDrawing.id}`);
        } else {
            if (window.location.hash.startsWith('#gallery-obra-')) {
                window.history.pushState(null, '', '#gallery');
            }
        }
    }, [selectedDrawing]);

    // Disparar animação de corações subindo
    const triggerFloatingHearts = (e: React.MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;
        const newHearts = Array.from({ length: 4 }).map((_, i) => ({
            id: Date.now() + Math.random() + i,
            x: x + (Math.random() - 0.5) * 40, // Dispersão horizontal
            y: y - 10,
        }));
        setFloatingHearts(prev => [...prev, ...newHearts]);
        
        setTimeout(() => {
            setFloatingHearts(prev => prev.filter(h => !newHearts.some(nh => nh.id === h.id)));
        }, 1000);
    };

    // Copiar link de compartilhamento da obra
    const handleShare = (drawing: Drawing) => {
        const shareUrl = `${window.location.origin}${window.location.pathname}#gallery-obra-${drawing.id}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
            console.error('Erro ao copiar link:', err);
        });
    };

    // Categorias, incluindo a categoria especial de Favoritas
    const categories = useMemo(() => ['Todos', 'Favoritas', 'Retrato', 'Natureza Morta', 'Paisagem', 'Estudo', 'Desenho', 'Animais'], []);

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { 
            Todos: DRAWINGS.length,
            Favoritas: DRAWINGS.filter(d => userReactions[d.id]?.liked || userReactions[d.id]?.loved).length
        };
        categories.slice(2).forEach(cat => {
            counts[cat] = DRAWINGS.filter(d => d.category === cat).length;
        });
        return counts;
    }, [categories, userReactions]);

    const filteredDrawings = useMemo(() => {
        if (filter === 'Todos') return DRAWINGS;
        if (filter === 'Favoritas') {
            return DRAWINGS.filter(d => userReactions[d.id]?.liked || userReactions[d.id]?.loved);
        }
        return DRAWINGS.filter(d => d.category === filter);
    }, [filter, userReactions]);

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
        if (!isZoomed || !containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isZoomed || !containerRef.current) return;
        const touch = e.touches[0];
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = ((touch.clientX - left) / width) * 100;
        const y = ((touch.clientY - top) / height) * 100;
        setMousePosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    };

    const toggleZoom = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsZoomed(!isZoomed);
    };

    return (
        <section id="gallery" className="py-24 bg-white/30 dark:bg-black/10 relative">
            <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none rotate-180 text-graphite">
                <SketchCircle className="w-full h-full" />
            </div>

            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-serif mb-4 relative inline-block text-graphite">
                            Galeria
                            <SketchHighlight className="absolute -bottom-2 -right-4 w-32 h-6 text-lead-light opacity-30 z-0 rotate-2" />
                        </h2>
                        <p className="text-lead-dark max-w-sm text-sm md:text-base">Uma seleção de obras originais e estudos técnicos.</p>
                    </div>

                    <div className="flex flex-wrap gap-2 md:gap-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={cn(
                                    "px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm uppercase tracking-widest transition-all border-b-2 relative flex items-center gap-2 cursor-pointer",
                                    filter === cat ? "border-graphite text-graphite font-semibold" : "border-transparent text-lead-light hover:text-graphite"
                                )}
                            >
                                <span>{cat}</span>
                                <span className={cn(
                                    "text-[10px] font-mono px-1.5 py-0.5 rounded-full transition-colors",
                                    filter === cat ? "bg-graphite text-paper" : "bg-graphite/5 text-lead-light dark:bg-graphite/10"
                                )}>
                                    {categoryCounts[cat]}
                                </span>
                                {filter === cat && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 w-full h-[2px] bg-graphite"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    <AnimatePresence mode="popLayout">
                        {filteredDrawings.length > 0 ? (
                            filteredDrawings.map((drawing) => (
                                <motion.div
                                    layout
                                    key={drawing.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    className="group cursor-pointer"
                                    onClick={() => setSelectedDrawing(drawing)}
                                    whileHover={{ y: -10 }}
                                >
                                    <div className="relative overflow-hidden aspect-[3/4] rounded-lg mb-4 bg-paper shadow-md group-hover:shadow-2xl transition-all duration-500 border border-transparent group-hover:border-graphite/10">
                                        <div className="absolute inset-0 border-2 border-graphite/5 rounded-lg pointer-events-none z-20 transition-all duration-500 group-hover:border-graphite/20 group-hover:scale-95" />
                                        <img
                                            src={drawing.imageUrl}
                                            alt={drawing.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
                                            referrerPolicy="no-referrer"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                                            <span className="text-white border border-white/30 px-6 py-2 rounded-full backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 font-medium tracking-widest text-xs uppercase">
                                                Ver Detalhes
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-start px-2">
                                        <div>
                                            <h3 className="text-lg md:text-xl font-serif italic group-hover:text-graphite transition-colors text-graphite">{drawing.title}</h3>
                                            <p className="text-[10px] md:text-xs uppercase tracking-widest text-lead-light">{drawing.category}</p>
                                        </div>
                                        
                                        {/* Botões de Likes/Amei Rápidos */}
                                        <div className="flex items-center gap-2 text-xs font-mono ml-4 shrink-0 mt-1">
                                            {/* Curtir (Like) */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleLike(drawing.id);
                                                }}
                                                className={cn(
                                                    "flex items-center gap-1 p-1.5 rounded-full transition-all cursor-pointer hover:bg-graphite/5",
                                                    userReactions[drawing.id]?.liked 
                                                        ? "text-blue-600 dark:text-blue-400 font-bold" 
                                                        : "text-lead-light hover:text-graphite"
                                                )}
                                                title="Curtir"
                                            >
                                                <ThumbsUp size={13} className={cn("transition-transform duration-300", userReactions[drawing.id]?.liked && "fill-current scale-110")} />
                                                <span>{interactions[drawing.id]?.likes_count ?? 0}</span>
                                            </button>

                                            {/* Amei (Love) */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleLove(drawing.id);
                                                    triggerFloatingHearts(e);
                                                }}
                                                className={cn(
                                                    "flex items-center gap-1 p-1.5 rounded-full transition-all cursor-pointer hover:bg-graphite/5",
                                                    userReactions[drawing.id]?.loved 
                                                        ? "text-rose-600 dark:text-rose-400 font-bold" 
                                                        : "text-lead-light hover:text-graphite"
                                                )}
                                                title="Amei"
                                            >
                                                <Heart size={13} className={cn("transition-transform duration-300", userReactions[drawing.id]?.loved && "fill-current scale-110")} />
                                                <span>{interactions[drawing.id]?.loves_count ?? 0}</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : filter === 'Favoritas' ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-20 text-center"
                            >
                                <Heart className="w-16 h-16 mx-auto mb-4 text-rose-500/20 animate-pulse" />
                                <p className="font-serif italic text-xl text-lead-light mb-2">Nenhum desenho favorito ainda...</p>
                                <p className="text-sm text-lead-light max-w-md mx-auto">Interaja com os desenhos usando os botões Curtir (👍) ou Amei (❤️) para listar suas obras favoritas aqui.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-20 text-center"
                            >
                                <SketchCircle className="w-16 h-16 mx-auto mb-4 text-graphite/10" />
                                <p className="font-serif italic text-xl text-lead-light">Novas obras em breve para esta categoria...</p>
                            </motion.div>
                        )}
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
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/98 backdrop-blur-md p-4"
                        onClick={() => setSelectedDrawing(null)}
                    >
                        <div className="absolute top-4 right-4 flex gap-4 z-[70]">
                            <button
                                className="text-white/70 hover:text-white transition-colors bg-black/40 p-2 rounded-full backdrop-blur-sm cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDetails(!showDetails);
                                }}
                                title="Ver Detalhes"
                            >
                                <Info size={24} />
                            </button>
                            <button
                                className="text-white/70 hover:text-white transition-colors bg-black/40 p-2 rounded-full backdrop-blur-sm cursor-pointer"
                                onClick={() => setSelectedDrawing(null)}
                                title="Fechar"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <button
                            className="absolute left-2 md:left-8 text-white/50 hover:text-white transition-colors z-[70] hidden sm:block cursor-pointer"
                            onClick={handlePrev}
                        >
                            <ChevronLeft size={48} />
                        </button>

                        <button
                            className="absolute right-2 md:right-8 text-white/50 hover:text-white transition-colors z-[70] hidden sm:block cursor-pointer"
                            onClick={handleNext}
                        >
                            <ChevronRight size={48} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full h-full max-w-7xl max-h-[95vh] relative rounded-lg overflow-hidden shadow-2xl bg-black"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                ref={containerRef}
                                className="w-full h-full flex items-center justify-center cursor-zoom-in relative touch-none"
                                onMouseMove={handleMouseMove}
                                onTouchMove={handleTouchMove}
                                onClick={toggleZoom}
                            >
                                <div
                                    className={cn(
                                        "relative w-full h-full flex items-center justify-center",
                                        isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                                    )}
                                >
                                    <img
                                        ref={imageRef}
                                        src={selectedDrawing.imageUrl}
                                        alt={selectedDrawing.title}
                                        className={cn(
                                            "max-w-full max-h-full object-contain transition-transform duration-200",
                                            isZoomed ? "scale-[2.5]" : "scale-100"
                                        )}
                                        style={isZoomed ? {
                                            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                                        } : undefined}
                                        referrerPolicy="no-referrer"
                                    />
                                </div>
                                
                                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white/70 pointer-events-none z-10">
                                    {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
                                </div>
                            </div>

                            <AnimatePresence>
                                {showDetails && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        className="absolute bottom-0 left-0 w-full md:w-[400px] bg-paper/95 backdrop-blur-md border-t md:border-t-0 md:border-r border-graphite/5 p-6 md:p-8 md:h-full md:top-0 md:bottom-auto shadow-2xl overflow-y-auto"
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <span className="text-xs uppercase tracking-widest text-lead-light font-bold">{selectedDrawing.category}</span>
                                            <button 
                                                onClick={() => setShowDetails(false)}
                                                className="md:hidden text-graphite/50 hover:text-graphite cursor-pointer"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                        
                                        <h3 className="text-2xl md:text-3xl font-serif mb-4 text-graphite">{selectedDrawing.title}</h3>
                                        <div className="w-12 h-1 bg-graphite mb-6"></div>
                                        <p className="text-lead-dark mb-6 text-sm leading-relaxed">
                                            Desenho técnico de alta precisão. Esta obra explora a profundidade do contraste de luz e sombra,
                                            utilizando técnicas avançadas de grafite sobre papel de alta gramatura, idealizado e executado por Gelci.
                                        </p>

                                        {/* Interações no Lightbox */}
                                        <div className="flex flex-col gap-4 py-6 my-6 border-t border-b border-graphite/10">
                                            <p className="text-xs uppercase tracking-widest text-lead-light font-bold">Avalie esta obra</p>
                                            <div className="flex flex-wrap items-center gap-3">
                                                {/* Gostei */}
                                                <button
                                                    onClick={() => toggleLike(selectedDrawing.id)}
                                                    className={cn(
                                                        "flex items-center gap-2 px-4 py-2 rounded-full border transition-all cursor-pointer text-xs uppercase tracking-wider font-semibold",
                                                        userReactions[selectedDrawing.id]?.liked 
                                                            ? "bg-blue-600/10 border-blue-600 text-blue-600 dark:text-blue-400" 
                                                            : "border-graphite/20 text-lead-dark hover:bg-graphite/5 hover:text-graphite"
                                                    )}
                                                >
                                                    <ThumbsUp size={14} className={cn("transition-transform duration-300", userReactions[selectedDrawing.id]?.liked && "fill-current scale-110")} />
                                                    <span>{userReactions[selectedDrawing.id]?.liked ? "Curtiu!" : "Curtir"}</span>
                                                    <span className="opacity-60 font-mono">({interactions[selectedDrawing.id]?.likes_count ?? 0})</span>
                                                </button>

                                                {/* Amei */}
                                                <button
                                                    onClick={(e) => {
                                                        toggleLove(selectedDrawing.id);
                                                        triggerFloatingHearts(e);
                                                    }}
                                                    className={cn(
                                                        "flex items-center gap-2 px-4 py-2 rounded-full border transition-all cursor-pointer text-xs uppercase tracking-wider font-semibold",
                                                        userReactions[selectedDrawing.id]?.loved 
                                                            ? "bg-rose-600/10 border-rose-600 text-rose-600 dark:text-rose-400" 
                                                            : "border-graphite/20 text-lead-dark hover:bg-graphite/5 hover:text-graphite"
                                                    )}
                                                >
                                                    <Heart size={14} className={cn("transition-transform duration-300", userReactions[selectedDrawing.id]?.loved && "fill-current scale-110")} />
                                                    <span>{userReactions[selectedDrawing.id]?.loved ? "Amei!" : "Amei"}</span>
                                                    <span className="opacity-60 font-mono">({interactions[selectedDrawing.id]?.loves_count ?? 0})</span>
                                                </button>

                                                {/* Compartilhar */}
                                                <button
                                                    onClick={() => handleShare(selectedDrawing)}
                                                    className="flex items-center justify-center p-2 rounded-full border border-graphite/20 text-lead-dark hover:bg-graphite/5 hover:text-graphite transition-all cursor-pointer relative"
                                                    title="Copiar link da obra"
                                                >
                                                    <Share2 size={14} />
                                                    {copied && (
                                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-graphite text-paper text-[10px] py-1 px-2 rounded whitespace-nowrap shadow-md">
                                                            Copiado!
                                                        </span>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-auto pt-4 grid grid-cols-2 gap-4">
                                            <div className="text-left">
                                                <p className="text-[10px] text-lead-light uppercase tracking-widest mb-1 font-bold">Ano</p>
                                                <p className="font-serif text-graphite">{selectedDrawing.year}</p>
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[10px] text-lead-light uppercase tracking-widest mb-1 font-bold">Código da Obra</p>
                                                <p className="font-mono text-graphite">#{selectedDrawing.id.toString().padStart(3, '0')}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Animações de Corações Flutuantes */}
            {floatingHearts.map(heart => (
                <motion.span
                    key={heart.id}
                    initial={{ y: 0, x: 0, opacity: 1, scale: 0.5 }}
                    animate={{ y: -140, x: (Math.random() - 0.5) * 65, opacity: 0, scale: 1.6 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="fixed pointer-events-none z-[999] text-2xl select-none"
                    style={{ left: heart.x, top: heart.y, transform: 'translate(-50%, -50%)' }}
                >
                    ❤️
                </motion.span>
            ))}
        </section>
    );
};
