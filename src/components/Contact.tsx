import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';

export const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-graphite text-paper relative">
            <div className="absolute inset-0 paper-texture opacity-5 pointer-events-none" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl font-serif mb-6 text-paper drop-shadow-md">Vamos criar algo <span className="italic text-white">eterno?</span></h2>
                    <p className="text-lead-light mb-12 text-lg font-light tracking-wide italic">
                        Disponível para encomendas personalizadas e projetos comerciais.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-2xl mx-auto">
                        <a href="mailto:gelci31@gmail.com" className="bg-paper p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col items-center border border-transparent hover:border-graphite/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-graphite/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <div className="bg-graphite text-paper p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <Mail size={32} strokeWidth={1.5} />
                            </div>
                            <p className="text-xs uppercase tracking-[0.2em] mb-2 text-lead-light font-bold">Email</p>
                            <p className="text-xl md:text-2xl font-serif text-graphite group-hover:text-black transition-colors">gelci31@gmail.com</p>
                        </a>

                        <a href="https://wa.me/554797194402" target="_blank" rel="noopener noreferrer" className="bg-paper p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col items-center border border-transparent hover:border-graphite/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-graphite/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <div className="bg-green-600 text-white p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <MessageSquare size={32} strokeWidth={1.5} />
                            </div>
                            <p className="text-xs uppercase tracking-[0.2em] mb-2 text-lead-light font-bold">WhatsApp</p>
                            <p className="text-xl md:text-2xl font-serif text-graphite group-hover:text-black transition-colors">(47) 9719-4402</p>
                        </a>
                    </div>

                    <p className="text-lead-light/40 text-[10px] uppercase tracking-widest font-bold">Respostas em até 24 horas</p>
                </div>
            </div>
        </section>
    );
};
