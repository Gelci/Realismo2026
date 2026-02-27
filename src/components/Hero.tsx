import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { TextReveal } from './ui/TextReveal';
import { SketchCircle, SketchHighlight, SketchUnderline } from './ui/Sketches';

export const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section id="home" className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden">
            <div className="absolute inset-0 paper-texture opacity-50 pointer-events-none" />

            {/* Background Decor */}
            <div className="absolute top-20 right-0 w-64 h-64 opacity-10 pointer-events-none">
                <SketchCircle className="w-full h-full text-graphite animate-spin-slow" />
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-lead-light/50 z-20 pointer-events-none"
            >
                <span className="text-[10px] uppercase tracking-widest text-graphite/40">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-graphite/20 to-transparent"></div>
            </motion.div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-24">

                {/* Left Column: Logo & Text */}
                <motion.div style={{ y: y1 }} className="w-full md:w-1/2 flex flex-col items-start text-left">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-8 relative"
                    >
                        <img
                            src="/logo.jpg"
                            alt="GelciArts Logo"
                            className="h-40 md:h-52 lg:h-64 w-auto object-contain mix-blend-multiply filter contrast-125 brightness-105"
                            style={{
                                maskImage: 'radial-gradient(circle, black 60%, transparent 95%)',
                                WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 95%)'
                            }}
                        />
                    </motion.div>

                    <TextReveal>
                        <div className="relative inline-block">
                            <span className="text-sm uppercase tracking-[0.3em] text-lead-light mb-4 block pl-1 relative z-10 font-bold">
                                Realismo em Grafite
                            </span>
                            <SketchHighlight className="absolute -bottom-2 -left-2 w-full h-4 text-lead-light opacity-30 z-0" />
                        </div>
                    </TextReveal>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif leading-[0.9] mb-8 relative drop-shadow-sm">
                        <TextReveal delay={0.1}>A alma no</TextReveal>
                        <TextReveal delay={0.2} className="italic relative inline-block text-graphite/90">
                            traço.
                            <SketchUnderline className="absolute -bottom-2 left-0 w-full text-graphite opacity-80" />
                        </TextReveal>
                    </h1>

                    <TextReveal delay={0.3}>
                        <p className="text-lg text-lead-dark max-w-md mb-10 font-light leading-relaxed pl-1 border-l-2 border-graphite/10 pl-4">
                            Explorando a profundidade da luz e sombra através do grafite.
                            Cada desenho é uma jornada de paciência e precisão por Gelcimar Barbosa.
                        </p>
                    </TextReveal>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="flex flex-wrap gap-4 pl-1"
                    >
                        <a
                            href="#gallery"
                            className="px-8 py-4 bg-graphite text-paper rounded-full flex items-center gap-2 hover:bg-lead-dark transition-all group shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Ver Galeria <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-4 border border-graphite/20 rounded-full hover:bg-graphite/5 transition-all"
                        >
                            Contato
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right Column: Featured Image */}
                <motion.div
                    style={{ y: y2 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="w-full md:w-1/2 relative aspect-[4/5] max-w-lg mx-auto md:mr-0"
                >
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible" viewBox="0 0 400 500">
                        <motion.path
                            d="M10,10 L390,10 L390,490 L10,490 Z"
                            fill="none"
                            stroke="#1A1A1A"
                            strokeWidth="2"
                            strokeDasharray="10 10"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.2 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <motion.path
                            d="M-10,20 L380,20 L380,500 L-10,500 Z"
                            fill="none"
                            stroke="#1A1A1A"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.1 }}
                            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                        />
                    </svg>

                    <div className="absolute -inset-4 border-2 border-graphite/20 rounded-2xl -rotate-2 pointer-events-none" style={{ borderStyle: 'dashed' }} />
                    <div className="absolute -inset-4 border border-graphite/10 rounded-2xl rotate-3 pointer-events-none" />
                    <img
                        src="/destaque.jpg"
                        alt="Obra em Destaque"
                        className="w-full h-full object-cover rounded-xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 relative z-10"
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-8 -left-8 bg-paper p-6 shadow-xl rounded-lg border border-graphite/5 hidden md:block z-30">
                        <p className="text-xs font-mono uppercase tracking-tighter text-lead-light mb-1">Obra em Destaque</p>
                        <p className="font-serif italic text-xl">"O Olhar"</p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};
