import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { FaArrowRight, FaChartLine, FaShieldAlt, FaClock, FaUsers, FaLaptopCode, FaHeadset, FaTruck, FaMapMarkedAlt, FaGasPump } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// Import dynamique pour améliorer les performances
const Typewriter = lazy(() => import('typewriter-effect'));

// Définition des données pour les fonctionnalités
const features = [
  {
    icon: <FaMapMarkedAlt className="text-blue-600 text-xl" />,
    title: "Suivi GPS en temps réel",
    description: "Localisez vos véhicules en temps réel avec une précision inégalée et optimisez vos itinéraires pour réduire les coûts."
  },
  {
    icon: <FaGasPump className="text-blue-600 text-xl" />,
    title: "Gestion du carburant",
    description: "Surveillez la consommation de carburant et identifiez les anomalies pour réduire vos dépenses jusqu'à 15%."
  },
  {
    icon: <FaShieldAlt className="text-blue-600 text-xl" />,
    title: "Sécurité avancée",
    description: "Protégez vos véhicules contre le vol et assurez la sécurité de vos conducteurs grâce à nos alertes instantanées."
  },
  {
    icon: <FaChartLine className="text-blue-600 text-xl" />,
    title: "Analyse de performance",
    description: "Obtenez des rapports détaillés sur les performances de votre flotte pour prendre des décisions éclairées."
  },
  {
    icon: <FaUsers className="text-blue-600 text-xl" />,
    title: "Gestion des conducteurs",
    description: "Suivez le comportement des conducteurs et encouragez une conduite plus sécuritaire et économique."
  },
  {
    icon: <FaHeadset className="text-blue-600 text-xl" />,
    title: "Support 24/7",
    description: "Notre équipe d'experts est disponible 24h/24 et 7j/7 pour vous assister et répondre à toutes vos questions."
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  const slides = [
    {
      image: '../src/assets/image5.jpg',
      alt: 'Gestion de flotte de camions',
    },
    {
      image: '../src/assets/image6.jpg',
      alt: 'Suivi GPS de véhicules',
    },

    {
      image: '../src/assets/image8.png',
      alt: 'Surveillance de véhicules',
    },
    {
      image: '../src/assets/image7.png',
      alt: 'Analyse de flotte',
    },

  ];

  // Préchargement des images pour améliorer les performances
  useEffect(() => {
    const preloadImages = () => {
      const imagePromises = slides.map((slide) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = slide.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      Promise.all(imagePromises)
        .then(() => setIsImagesLoaded(true))
        .catch((error) => console.error("Erreur lors du chargement des images:", error));
    };

    preloadImages();
  }, []);

  useEffect(() => {
    // Initialisation d'AOS avec des paramètres optimisés
    AOS.init({
      duration: 800,
      once: true,
      delay: 0,
      throttleDelay: 99,
    });

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndXRef.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const getSlideClass = (index: number) => {
    if (index === currentSlide) {
      return 'active';
    } else if (index === (currentSlide + 1) % slides.length) {
      return 'next';
    } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
      return 'prev';
    } else {
      return 'hidden';
    }
  };

  const progressWidth = `${((currentSlide + 1) / slides.length) * 100}%`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section avec animation d'écriture */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
                <span className="block mb-2">Leader d'Afrique dans</span>
                <div className="min-h-[120px] md:min-h-[96px] overflow-hidden relative text-blue-600">
                  <Suspense fallback={<div className="h-[120px] md:h-[96px]">Chargement...</div>}>
                    <Typewriter
                      options={{
                        strings: ['le suivi de vos véhicules', 'la gestion de votre flotte', 'l\'optimisation de vos trajets', 'la sécurité de vos conducteurs'],
                        autoStart: true,
                        loop: true,
                        delay: 50,
                        deleteSpeed: 25,
                        wrapperClassName: "text-4xl md:text-5xl font-bold leading-tight"
                      }}
                    />
                  </Suspense>
                </div>
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-lg">
                Notre plateforme de télématique avancée vous permet de suivre, gérer et optimiser votre flotte de véhicules en temps réel, réduisant vos coûts opérationnels jusqu'à 25%.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/pricing">
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all flex items-center gap-2 text-sm font-medium">
                    Voir nos tarifs
                    <FaArrowRight />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-all text-sm font-medium">
                    Nous contacter
                  </button>
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:w-1/2"
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={slides[currentSlide].image} 
                  alt={slides[currentSlide].alt} 
                  className="w-full h-auto rounded-lg transition-opacity duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: progressWidth }}
                  ></div>
                </div>
                <button 
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full text-blue-600"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full text-blue-600"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Redesign avec des cartes plus compactes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Nos solutions de gestion de flotte</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Découvrez comment notre plateforme de télématique peut transformer la gestion de votre flotte et optimiser vos opérations quotidiennes.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistiques Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Pourquoi choisir notre solution</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Des résultats concrets pour votre entreprise grâce à notre technologie de pointe</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">25%</div>
              <p className="text-gray-700">Réduction des coûts de carburant</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">30%</div>
              <p className="text-gray-700">Amélioration de la productivité</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">40%</div>
              <p className="text-gray-700">Réduction des temps d'arrêt</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-gray-700">Taux de satisfaction client</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Plus compact et moderne */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-xl p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Prêt à optimiser votre flotte?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Rejoignez des centaines d'entreprises qui font confiance à notre solution de gestion de flotte pour réduire leurs coûts et améliorer leur efficacité.</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/pricing">
                <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all flex items-center justify-center gap-2 text-sm font-medium">
                  Voir nos tarifs
                  <FaArrowRight />
                </button>
              </Link>
              <Link to="/contact">
                <button className="w-full sm:w-auto px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-all text-sm font-medium">
                  Nous contacter
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
