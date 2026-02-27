import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { DRAWINGS, type Drawing } from '../data/artes';
import { cn } from '../utils/cn';
import { SketchCircle, SketchHighlight } from './ui/Sketches';

export const Gallery = () => {
    const [filter, setFilter] = useState('Todos');
    const [selectedDrawing, setSelectedDrawing] = useState<Drawing | null>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLImageElement>(null);

    const categories = useMemo(() => ['Todos', 'Retrato', 'Natureza Morta', 'Paisagem', 'Estudo'], []);

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { Todos: DRAWINGS.length };
        categories.slice(1).forEach(cat => {
            counts[cat] = DRAWINGS.filter(d => d.category === cat).length;
        });
        return counts;
    }, [categories]);

    const filteredDrawings = useMemo(() =>
        filter === 'Todos'
            ? DRAWINGS
            : DRAWINGS.filter(d => d.category === filter),
        [filter]);

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
        <section id="gallery" className="py-24 bg-white/30 relative">
            <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none rotate-180">
                <SketchCircle className="w-full h-full text-graphite" />
            </div>

            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h2 className="text-5xl font-serif mb-4 relative inline-block">
                            Galeria
                            <SketchHighlight className="absolute -bottom-2 -right-4 w-32 h-6 text-lead-light opacity-30 z-0 rotate-2" />
                        </h2>
                        <p className="text-lead-dark max-w-sm">Uma seleção de obras originais e estudos técnicos.</p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={cn(
                                    "px-4 py-2 text-sm uppercase tracking-widest transition-all border-b-2 relative flex items-center gap-2",
                                    filter === cat ? "border-graphite text-graphite" : "border-transparent text-lead-light hover:text-graphite"
                                )}
                            >
                                <span>{cat}</span>
                                <span className={cn(
                                    "text-[10px] font-mono px-1.5 py-0.5 rounded-full",
                                    filter === cat ? "bg-graphite text-paper" : "bg-graphite/5 text-lead-light"
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
                                        <div className="absolute inset-0 bg-graphite/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                                            <span className="text-paper border border-paper/30 px-6 py-2 rounded-full backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 font-medium tracking-widest text-xs uppercase">
                                                Ver Detalhes
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-start px-2">
                                        <div>
                                            <h3 className="text-xl font-serif italic group-hover:text-graphite transition-colors">{drawing.title}</h3>
                                            <p className="text-xs uppercase tracking-widest text-lead-light">{drawing.category}</p>
                                        </div>
                                        <span className="text-xs font-mono text-lead-light border border-graphite/10 px-2 py-1 rounded">{drawing.year}</span>
                                    </div>
                                </motion.div>
                            ))
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
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-graphite/98 backdrop-blur-md p-4"
                        onClick={() => setSelectedDrawing(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-paper/70 hover:text-paper transition-colors z-10"
                            onClick={() => setSelectedDrawing(null)}
                        >
                            <X size={32} />
                        </button>

                        <button
                            className="absolute left-4 md:left-8 text-paper/50 hover:text-paper transition-colors hidden md:block z-10"
                            onClick={handlePrev}
                        >
                            <ChevronLeft size={48} />
                        </button>

                        <button
                            className="absolute right-4 md:right-8 text-paper/50 hover:text-paper transition-colors hidden md:block z-10"
                            onClick={handleNext}
                        >
                            <ChevronRight size={48} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row gap-8 bg-paper rounded-lg overflow-hidden shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                className="flex-1 bg-black flex items-center justify-center relative overflow-hidden cursor-zoom-in min-h-[40vh] md:min-h-0"
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
                                <span className="text-xs uppercase tracking-widest text-lead-light mb-2 font-bold">{selectedDrawing.category}</span>
                                <h3 className="text-3xl font-serif mb-4 text-graphite">{selectedDrawing.title}</h3>
                                <div className="w-12 h-1 bg-graphite mb-6"></div>
                                <p className="text-lead-dark mb-8 text-sm leading-relaxed">
                                    Uma obra detalhada criada em {selectedDrawing.year}. Este desenho explora as nuances de luz e sombra,
                                    utilizando grafite de alta qualidade sobre papel texturizado.
                                </p>
                                <div className="mt-auto flex justify-between items-end border-t border-graphite/10 pt-6">
                                    <div>
                                        <p className="text-[10px] text-lead-light uppercase tracking-widest mb-1 font-bold">Ano</p>
                                        <p className="font-mono text-graphite">{selectedDrawing.year}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-lead-light uppercase tracking-widest mb-1 font-bold">ID</p>
                                        <p className="font-mono text-graphite">#{selectedDrawing.id.toString().padStart(3, '0')}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
