import React from 'react';
import { motion } from 'motion/react';
import { SketchHighlight, SketchUnderline } from './ui/Sketches';

export const About = () => {
    return (
        <section id="about" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 paper-texture opacity-50 pointer-events-none" />
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <div className="absolute top-0 -left-10 w-full h-full border-2 border-graphite/10 rounded-full scale-110 -rotate-6 pointer-events-none" style={{ borderStyle: 'dashed' }}></div>
                        <div className="aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl max-w-md mx-auto relative z-10">
                            <img
                                src="/artista.jpg"
                                alt="Gelcimar Barbosa"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-graphite text-paper p-6 rounded-2xl shadow-xl z-20">
                            <p className="text-4xl font-serif italic text-white">15+</p>
                            <p className="text-xs uppercase tracking-widest opacity-70">Anos de Traço</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <SketchUnderline className="absolute -top-10 left-0 w-64 text-graphite opacity-20 -rotate-3" />

                        <h2 className="text-5xl font-serif mb-8 relative inline-block text-graphite">
                            Gelcimar Barbosa
                        </h2>
                        <div className="space-y-6 text-lead-dark leading-relaxed">
                            <p>
                                Conhecido artisticamente como <span className="font-bold text-graphite relative inline-block">Gelci<SketchHighlight className="absolute bottom-0 left-0 w-full h-3 text-lead-light/30 -z-10" /></span>,
                                dedico minha vida a capturar a essência da alma humana através do grafite. Meu trabalho vai além do desenho; é uma busca incessante pela emoção que reside em cada olhar e expressão.
                            </p>
                            <p>
                                Cada obra é fruto de paciência e observação meticulosa. Utilizo o jogo de luz e sombra para criar texturas que convidam ao toque e olhares que parecem dialogar com o espectador. Minha arte é sobre eternizar momentos e sentimentos no papel.
                            </p>
                            <div className="pt-6 grid grid-cols-2 gap-8">
                                <div className="relative pl-4 border-l-2 border-graphite/20">
                                    <h4 className="font-bold text-graphite mb-2">Técnica</h4>
                                    <p className="text-sm">Grafite sobre papel (H a 9B), esfuminho e borracha de precisão.</p>
                                </div>
                                <div className="relative pl-4 border-l-2 border-graphite/20">
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
