import React from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

/**
 * GelciArts Portfolio - 2026
 * Uma experiência imersiva focada no realismo em grafite.
 */
const App = () => {
  return (
    <div className="relative min-h-screen bg-paper">
      {/* Elementos de Interface Fixos */}
      <CustomCursor />

      {/* Camada de Textura Global */}
      <div className="noise-overlay fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay"></div>

      {/* Seções da Aplicação */}
      <Navbar />

      <main>
        <Hero />
        <Gallery />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
