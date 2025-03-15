import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { FaArrowRight, FaLightbulb, FaHandshake, FaUsers, FaChartLine, FaHeart, FaTruck, FaMapMarkedAlt, FaGasPump, FaTools, FaUserCog, FaShieldAlt, FaInfoCircle, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Définition des données pour les valeurs
const values = [
  {
    icon: <FaLightbulb className="text-blue-600 text-xl" />,
    title: "Innovation",
    description: "Nous développons constamment de nouvelles technologies pour améliorer notre plateforme de gestion de flotte et offrir des solutions toujours plus performantes."
  },
  {
    icon: <FaHandshake className="text-blue-600 text-xl" />,
    title: "Intégrité",
    description: "Nous agissons avec honnêteté et transparence dans toutes nos interactions avec nos clients et partenaires pour bâtir des relations de confiance durables."
  },
  {
    icon: <FaUsers className="text-blue-600 text-xl" />,
    title: "Collaboration",
    description: "Nous travaillons en étroite collaboration avec nos clients pour comprendre leurs besoins spécifiques et leur offrir des solutions personnalisées."
  },
  {
    icon: <FaChartLine className="text-blue-600 text-xl" />,
    title: "Excellence",
    description: "Nous nous efforçons d'offrir un service de la plus haute qualité et de dépasser les attentes de nos clients dans tous les aspects de notre activité."
  },
  {
    icon: <FaHeart className="text-blue-600 text-xl" />,
    title: "Engagement",
    description: "Nous sommes passionnément engagés à aider nos clients à optimiser leurs opérations de flotte et à atteindre leurs objectifs commerciaux."
  }
];

// Définition des données pour les informations utiles
const usefulInfo = [
  {
    icon: <FaPhoneAlt className="text-blue-600 text-xl" />,
    title: "Support 24/7",
    description: "Notre équipe de support technique est disponible 24h/24 et 7j/7 pour répondre à toutes vos questions et résoudre vos problèmes."
  },
  {
    icon: <FaMapMarkerAlt className="text-blue-600 text-xl" />,
    title: "Couverture nationale",
    description: "Nos services sont disponibles dans tout le pays, avec une présence locale dans les principales villes pour un support rapide."
  },
  {
    icon: <FaEnvelope className="text-blue-600 text-xl" />,
    title: "Demande de démo",
    description: "Contactez-nous pour organiser une démonstration personnalisée de notre plateforme adaptée à vos besoins spécifiques."
  },
  {
    icon: <FaInfoCircle className="text-blue-600 text-xl" />,
    title: "Documentation complète",
    description: "Accédez à notre base de connaissances détaillée pour tirer le meilleur parti de notre solution de gestion de flotte."
  }
];

export default function About() {
  useEffect(() => {
    // Initialisation d'AOS avec lazy loading pour améliorer les performances
    AOS.init({
      duration: 800, // Réduction de la durée pour améliorer la réactivité
      once: true,
      delay: 0, // Pas de délai pour améliorer la réactivité
      throttleDelay: 99, // Optimisation du throttle
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section - Plus compact et élégant */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                À propos de nous
              </h1>
              <p className="text-lg opacity-90 mb-6 max-w-lg">
                Découvrez notre mission et les valeurs qui font de notre entreprise le leader de la gestion de flotte et de la télématique en Afrique.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:w-1/2"
            >
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Notre équipe" 
                className="w-full h-auto rounded-lg shadow-lg"
                loading="lazy" // Ajout du lazy loading pour les images
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notre mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Notre mission</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Nous aidons les entreprises à optimiser leurs opérations de flotte, à réduire leurs coûts et à améliorer leur efficacité grâce à des solutions technologiques innovantes et faciles à utiliser.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm text-center"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTruck className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Optimisation de flotte</h3>
              <p className="text-gray-600">Nous aidons les entreprises à maximiser l'efficacité de leur flotte et à réduire les coûts opérationnels.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm text-center"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sécurité renforcée</h3>
              <p className="text-gray-600">Nous améliorons la sécurité des conducteurs et protégeons les véhicules contre le vol et les utilisations non autorisées.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm text-center"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChartLine className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Données exploitables</h3>
              <p className="text-gray-600">Nous fournissons des insights précieux pour aider les entreprises à prendre des décisions éclairées basées sur des données réelles.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section - Design amélioré */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Notre histoire" 
                className="w-full h-auto rounded-lg shadow-lg"
                loading="lazy"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Notre vision</h2>
              <p className="text-gray-600 mb-4">
                Notre vision est de révolutionner la gestion de flotte en Afrique grâce à des solutions technologiques innovantes, adaptées aux réalités locales.
              </p>
              <p className="text-gray-600 mb-4">
                Face aux défis uniques du continent africain, nous développons une plateforme robuste capable de fonctionner même dans les zones à faible connectivité, offrant ainsi une solution adaptée aux besoins spécifiques de nos clients.
              </p>
              <p className="text-gray-600">
                Notre ambition est de devenir le partenaire privilégié des entreprises africaines pour optimiser leurs opérations, réduire leurs coûts et améliorer la sécurité de leurs flottes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Informations utiles - Remplace la section Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Informations utiles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Tout ce que vous devez savoir pour tirer le meilleur parti de nos services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {usefulInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{info.title}</h3>
                <p className="text-gray-600 text-center">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - Plus moderne et compact */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Nos valeurs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Les principes qui guident notre travail et nos interactions chaque jour.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Plus compact et attrayant */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-xl p-8 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Prêt à optimiser votre flotte?</h2>
            <p className="mb-6 max-w-2xl mx-auto opacity-90">
              Découvrez comment notre solution de gestion de flotte peut transformer vos opérations et réduire vos coûts.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/pricing">
                <button className="w-full sm:w-auto px-6 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg transition-all flex items-center gap-2 mx-auto">
                  Voir nos tarifs
                  <FaArrowRight />
                </button>
              </Link>
              <Link to="/contact">
                <button className="w-full sm:w-auto px-6 py-3 border border-white hover:bg-blue-700 text-white rounded-lg transition-all flex items-center gap-2 mx-auto">
                  Nous contacter
                  <FaArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}