import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Phone, Menu, X, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';

// Lazy loading des composants pour améliorer les performances
const Home = lazy(() => import('./components/Home'));
const Services = lazy(() => import('./components/Services'));
const Pricing = lazy(() => import('./components/Pricing'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

// Composant de chargement
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fermer le menu mobile lors de la navigation
  const closeMenu = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Link to="/" onClick={closeMenu}>
                  <img 
                    src="/wuro-logo.png" 
                    alt="Wuro Technologies" 
                    className="h-12 w-[60px] object-contain" 
                    loading="lazy" 
                  />
                </Link>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-700 hover:text-blue-600" onClick={closeMenu}>Accueil</Link>
                <Link to="/services" className="text-gray-700 hover:text-blue-600" onClick={closeMenu}>Services</Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600" onClick={closeMenu}>À propos</Link>
                <Link to="/pricing" className="text-gray-700 hover:text-blue-600" onClick={closeMenu}>Tarif</Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600" onClick={closeMenu}>Contact</Link>
                <a href="tel:+22670204548" className="flex items-center text-blue-600">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>Contactez-nous</span>
                </a>
              </div>

              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 pb-4">
                <div className="flex flex-col space-y-4">
                  <Link to="/" className="text-gray-700 hover:text-blue-600" onClick={closeMenu}>Accueil</Link>
                  <Link to="/services" className="text-gray-700 hover:text-blue-600" onClick={closeMenu}>Services</Link>
                  <Link to="/about" className="text-gray-700 hover:text-blue-600" onClick={closeMenu}>À propos</Link>
                  <Link to="/pricing" className="text-gray-700 hover:text-blue-600" onClick={closeMenu}>Tarif</Link>
                  <Link to="/contact" className="text-gray-700 hover:text-blue-600" onClick={closeMenu}>Contact</Link>
                  <a href="tel:+226 70 20 45 48" className="flex items-center text-blue-600">
                    <Phone className="w-5 h-5 mr-2" />
                    <span>Contactez-nous</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>

        <main className="flex-grow pt-16">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>

        {/* Footer */}
        <footer className="bg-[#001233] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Links Section */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Liens utiles</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-300 hover:text-white" onClick={closeMenu}>Page d'accueil</Link></li>
                  <li><Link to="/about" className="text-gray-300 hover:text-white" onClick={closeMenu}>À propos de nous</Link></li>
                  <li><Link to="/services" className="text-gray-300 hover:text-white" onClick={closeMenu}>Services</Link></li>
                  <li><Link to="/pricing" className="text-gray-300 hover:text-white" onClick={closeMenu}>Tarifs</Link></li>
                  <li><Link to="/contact" className="text-gray-300 hover:text-white" onClick={closeMenu}>Contactez-nous</Link></li>
                </ul>
              </div>

              {/* About Section */}
              <div>
                <h4 className="text-lg font-semibold mb-4">À propos de nous</h4>
                <p className="text-gray-300 mb-4">
                  Nous sommes une équipe de passionnés dont le but est d'améliorer la
                  vie de chacun grâce à des produits disruptifs. Nous fabriquons
                  d'excellents produits pour résoudre vos problèmes commerciaux.
                </p>
                <p className="text-gray-300">
                  Nos produits sont conçus pour les petites et moyennes entreprises
                  désireuses d'optimiser leurs performances.
                </p>
              </div>

              {/* Contact Section */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Rejoignez-nous</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/contact" className="text-gray-300 hover:text-white flex items-center" onClick={closeMenu}>
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Contactez-nous
                    </Link>
                  </li>
                  <li>
                    <a href="mailto:info@wurotechnologies.com" className="text-gray-300 hover:text-white">
                      info@wurotechnologies.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+226 70 20 45 48" className="text-gray-300 hover:text-white">
                      +226 70 20 45 48
                    </a>
                  </li>
                  <li>
                    <a href="tel:+226 75 50 03 89" className="text-gray-300 hover:text-white">
                      +226 75 50 03 89
                    </a>
                  </li>
                  <li>
                    <a href="tel:+226 06 11 11 41" className="text-gray-300 hover:text-white">
                      +226 06 11 11 41
                    </a>
                  </li>
                </ul>

                <div className="flex space-x-4 mt-6">
                  <a href="#" className="text-gray-300 hover:text-white" aria-label="Facebook">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white" aria-label="Twitter">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white" aria-label="LinkedIn">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white" aria-label="Message">
                    <MessageCircle className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm">
                Copyright © Wuro Technologies SARL
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white text-sm">English (US)</a>
                <span className="text-gray-600">|</span>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Français</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;