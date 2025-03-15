import React, { useEffect, lazy, Suspense } from 'react';
import { ChevronRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { FaCheck, FaArrowRight, FaTruck, FaMapMarkedAlt, FaGasPump, FaTools, FaChartLine, FaShieldAlt, FaUserCog, FaRoute, FaVideo, FaTemperatureHigh, FaClipboardCheck, FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Composant FaHeadset pour le processus
const FaHeadset = ({ className }: { className?: string }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 512 512">
      <path d="M256 48C141.1 48 48 141.1 48 256v40c0 13.3-10.7 24-24 24s-24-10.7-24-24V256C0 114.6 114.6 0 256 0S512 114.6 512 256v40c0 13.3-10.7 24-24 24s-24-10.7-24-24V256c0-114.9-93.1-208-208-208zM80 304c0-26.5 21.5-48 48-48h16c26.5 0 48 21.5 48 48v128c0 26.5-21.5 48-48 48H128c-26.5 0-48-21.5-48-48V304zm336-48h16c26.5 0 48 21.5 48 48v128c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V304c0-26.5 21.5-48 48-48h16z"/>
    </svg>
  );
};

// Définition des données pour les services
const services = [
  {
    id: "fleet-management",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Gestion de flotte",
    icon: <FaTruck className="text-blue-600 text-3xl mb-4" />,
    description: "Solution complète pour gérer efficacement votre flotte de véhicules, optimiser les itinéraires et réduire les coûts opérationnels.",
    features: [
      "Tableau de bord centralisé",
      "Rapports automatisés",
      "Gestion des documents",
      "Alertes personnalisables"
    ]
  },
  {
    id: "gps-tracking",
    image: "https://images.unsplash.com/photo-1581362508254-7c9b84a5410c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Suivi GPS",
    icon: <FaMapMarkedAlt className="text-blue-600 text-3xl mb-4" />,
    description: "Suivez vos véhicules en temps réel avec notre technologie GPS avancée, offrant des mises à jour précises et instantanées.",
    features: [
      "Localisation en temps réel",
      "Historique des trajets",
      "Géo-clôtures personnalisables",
      "Alertes de mouvement"
    ]
  },
  {
    id: "fuel-management",
    image: "https://images.unsplash.com/photo-1545459720-aac8509eb149?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Gestion du carburant",
    icon: <FaGasPump className="text-blue-600 text-3xl mb-4" />,
    description: "Surveillez et optimisez la consommation de carburant pour réduire les coûts et améliorer l'efficacité de votre flotte.",
    features: [
      "Suivi de consommation",
      "Détection des anomalies",
      "Rapports d'économie",
      "Alertes de ravitaillement"
    ]
  },
  {
    id: "maintenance",
    image: "https://images.unsplash.com/photo-1530046339915-78e95787c8ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Maintenance préventive",
    icon: <FaTools className="text-blue-600 text-3xl mb-4" />,
    description: "Planifiez et suivez la maintenance de vos véhicules pour prévenir les pannes et prolonger leur durée de vie.",
    features: [
      "Planification des entretiens",
      "Rappels automatiques",
      "Suivi des réparations",
      "Historique de maintenance"
    ]
  },
  {
    id: "driver-management",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Gestion des conducteurs",
    icon: <FaUserCog className="text-blue-600 text-3xl mb-4" />,
    description: "Suivez les performances des conducteurs, encouragez une conduite sécuritaire et améliorez l'efficacité opérationnelle.",
    features: [
      "Profils des conducteurs",
      "Analyse du comportement",
      "Scores de conduite",
      "Formation ciblée"
    ]
  },
  {
    id: "analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Analyse de données",
    icon: <FaChartLine className="text-blue-600 text-3xl mb-4" />,
    description: "Obtenez des insights précieux grâce à nos outils d'analyse avancés pour prendre des décisions éclairées.",
    features: [
      "Tableaux de bord personnalisables",
      "Rapports détaillés",
      "Analyse prédictive",
      "Exportation des données"
    ]
  }
];

// Définition des données pour le processus
const process = [
  {
    title: "Consultation",
    icon: <FaClipboardCheck className="text-white text-xl" />,
    description: "Nous discutons de vos besoins spécifiques et identifions les solutions les plus adaptées à votre entreprise."
  },
  {
    title: "Installation",
    icon: <FaTools className="text-white text-xl" />,
    description: "Nos techniciens installent rapidement les équipements nécessaires sur vos véhicules avec un minimum de perturbation."
  },
  {
    title: "Formation",
    icon: <FaUserCog className="text-white text-xl" />,
    description: "Nous formons votre équipe à l'utilisation de notre plateforme pour en tirer le maximum de bénéfices."
  },
  {
    title: "Support continu",
    icon: <FaHeadset className="text-white text-xl" />,
    description: "Notre équipe de support est disponible 24/7 pour vous aider avec toute question ou problème technique."
  }
];

// Définition des données pour les fonctionnalités avancées
const advancedFeatures = [
  {
    title: "Télématique vidéo",
    icon: <FaVideo className="text-blue-600 text-2xl" />,
    description: "Caméras embarquées qui enregistrent les incidents et améliorent la sécurité des conducteurs."
  },
  {
    title: "Suivi de température",
    icon: <FaTemperatureHigh className="text-blue-600 text-2xl" />,
    description: "Surveillance en temps réel de la température pour les véhicules transportant des marchandises sensibles."
  },
  {
    title: "Optimisation d'itinéraires",
    icon: <FaRoute className="text-blue-600 text-2xl" />,
    description: "Algorithmes avancés pour planifier les itinéraires les plus efficaces et économiques."
  },
  {
    title: "Alertes de sécurité",
    icon: <FaExclamationTriangle className="text-blue-600 text-2xl" />,
    description: "Notifications instantanées en cas de comportement de conduite dangereux ou d'incidents."
  }
];

// Définition des données pour les FAQs
const faqs = [
  {
    question: "Est-ce que mes appareils GPS sont-ils compatibles avec votre plateforme ?",
    answer: "Oui ! Si vous possédez déjà un équipement GPS, il est entièrement compatible avec notre plateforme. Aucun besoin d'en acheter un nouveau !"
  },
  {
    question: "Quels types de véhicules sont compatibles avec votre solution ?",
    answer: "Notre plateforme est compatible avec une large gamme de véhicules : voitures, camions, motos, et même équipements industriels."
  },
  {
    question: "Quelles sont les options de paiement ?",
    answer: "Nous acceptons plusieurs moyens de paiement : orange money, carte bancaire et virement bancaire. Vous pouvez choisir un paiement mensuel ou annuel."
  },
  {
    question: "Comment puis-je contacter le support client ?",
    answer: "Notre support est disponible 24/7 via téléphone, email ou chat en ligne. Nous sommes là pour vous accompagner à chaque étape !"
  }
];

export default function Services() {
  useEffect(() => {
    // Initialisation d'AOS avec des paramètres optimisés pour les performances
    AOS.init({
      duration: 800,
      once: true,
      delay: 0,
      throttleDelay: 99,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section - Plus compact et élégant */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Solutions de gestion de flotte
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg opacity-90 mb-8"
            >
              Découvrez notre gamme complète de services conçus pour optimiser la gestion de votre flotte, réduire vos coûts et améliorer votre efficacité opérationnelle.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/contact">
                <button className="px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg transition-all flex items-center gap-2 mx-auto">
                  Nous contacter
                  <FaArrowRight />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid - Design amélioré et plus compact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Nos services de télématique</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Des solutions complètes pour répondre à tous vos besoins de gestion de flotte</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h3 className="text-xl font-bold text-white p-4">{service.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-center">
                    {service.icon}
                  </div>
                  <p className="text-gray-600 mb-4 text-center">{service.description}</p>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <FaCheck className="text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/pricing" className="block text-center mt-6">
                    <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                      Voir nos tarifs
                      <FaArrowRight className="text-sm" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fonctionnalités avancées */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Fonctionnalités avancées</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Des technologies de pointe pour une gestion optimale de votre flotte</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advancedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-sm text-center"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Redesign plus moderne */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Notre processus d'implémentation</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Une approche simple et efficace pour mettre en place notre solution</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg shadow-md relative z-10 h-full">
                  <div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-white opacity-90">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-blue-300 z-0 transform translate-x-1/2">
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-blue-300">
                      <FaArrowRight />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Plus compact et élégant */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Questions fréquentes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Trouvez des réponses aux questions les plus courantes sur nos services</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer bg-white hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 bg-white border-t border-gray-100">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Plus compact et attrayant */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-xl p-8 md:p-10 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Prêt à optimiser votre flotte?</h2>
              <p className="max-w-2xl mx-auto opacity-90">Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir comment notre solution peut transformer votre gestion de flotte.</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/pricing">
                <button className="w-full sm:w-auto px-6 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg transition-all flex items-center justify-center gap-2 text-sm font-medium">
                  Voir nos tarifs
                  <FaArrowRight />
                </button>
              </Link>
              <Link to="/contact">
                <button className="w-full sm:w-auto px-6 py-3 border border-white hover:bg-blue-700 text-white rounded-lg transition-all text-sm font-medium">
                  Demander une démo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
