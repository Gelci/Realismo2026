import React from 'react';
import { Instagram } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="py-12 border-t border-graphite/5 bg-paper relative">
            <div className="absolute inset-0 paper-texture opacity-30 pointer-events-none" />
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                <p className="text-sm text-lead-light font-medium tracking-wide">
                    © {new Date().getFullYear()} GelciArts. Todos os direitos reservados.
                </p>
                <div className="flex space-x-6">
                    <a
                        href="https://www.instagram.com/gelciarts/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-lead-dark hover:text-graphite transition-all group"
                    >
                        <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                        <span className="uppercase tracking-widest text-xs font-bold group-hover:underline decoration-1 underline-offset-4">Instagram</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};
