import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '../utils/cn';
import { useDarkMode } from '../hooks/useDarkMode';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isDark, toggleTheme } = useDarkMode();

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
            "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-5",
            scrolled ? "bg-paper/90 backdrop-blur-md border-b border-graphite/10 py-4" : "bg-transparent"
        )}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <a href="#home" className="text-2xl font-serif font-bold tracking-tighter text-graphite">
                    Gelci<span className="italic font-normal opacity-70">Arts</span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm uppercase tracking-widest font-medium hover:text-lead-light transition-colors text-graphite"
                        >
                            {link.name}
                        </a>
                    ))}

                    {/* Botão de Tema (Desktop) */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-graphite/10 transition-colors text-graphite cursor-pointer"
                        title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
                        aria-label="Alternar tema"
                    >
                        <motion.div
                            initial={false}
                            animate={{ rotate: isDark ? 180 : 0, scale: 1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 200, damping: 12 }}
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </motion.div>
                    </button>
                </div>

                {/* Controles Mobile (Tema + Menu Hambúrguer) */}
                <div className="flex items-center gap-4 md:hidden">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-graphite/10 transition-colors text-graphite cursor-pointer"
                        title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
                        aria-label="Alternar tema"
                    >
                        <motion.div
                            initial={false}
                            animate={{ rotate: isDark ? 180 : 0, scale: 1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 200, damping: 12 }}
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </motion.div>
                    </button>

                    <button className="text-graphite cursor-pointer" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
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
                        {navLinks.map((link, idx) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-serif italic text-graphite"
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
