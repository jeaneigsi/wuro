import React, { useEffect, lazy, Suspense } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaArrowRight, FaTruck, FaMapMarkedAlt, FaGasPump, FaTools, FaUserCog, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Définition des données pour les plans
const plans = [
  {
    name: "Lite",
    description: "Idéal pour les petites entreprises avec une flotte limitée",
    price: 6500,
    icon: <FaTruck className="text-blue-600 text-3xl mb-4" />,
    features: [
      "Analyse complète du véhicule",
      "Gestion du carburant",
      "Application web et mobile",
      "Géo-clôtures et points d'intérêts",
      "Module Maintenance",
      "Gestion utilisateurs",
      "Support multilingue"
    ],
    notIncluded: [
      "Système gestion état des moteurs",
      "Analyse du comportement conducteur"
    ],
    popular: false
  },
  {
    name: "Standard",
    description: "Pour les entreprises en croissance avec des besoins avancés",
    price: 8000,
    icon: <FaMapMarkedAlt className="text-blue-600 text-3xl mb-4" />,
    features: [
      "Toutes les fonctionnalités Lite",
      "Système gestion état des moteurs",
      "Suivi de la temperature",
      "Analyse de l'état des moteurs",
      "Gestion des dépenses",
      "Rappels de maintenance",
      "Suivi du régime moteur (RPM)"
    ],
    notIncluded: [
      "Analyse complète du conducteur",
      "Télématique vidéo"
    ],
    popular: true
  },
  {
    name: "Premium",
    description: "Solution complète pour les grandes flottes avec besoins complexes",
    price: 9000,
    icon: <FaChartLine className="text-blue-600 text-3xl mb-4" />,
    features: [
      "Toutes les fonctionnalités Standard",
      "Analyse complète du conducteur",
      "Planification et suivi des trajets",
      "Télématique vidéo",
      "Blocks",
      "Suivi de la charge"
    ],
    popular: false
  }
];

// Définition des catégories de fonctionnalités pour la comparaison
const featureCategories = [
  {
    name: "Suivi et localisation",
    icon: <FaMapMarkedAlt className="text-blue-600 text-xl" />,
    features: [
      {
        name: "Localisation GPS en temps réel",
        availability: [true, true, true]
      },
      {
        name: "Historique des trajets",
        availability: [true, true, true]
      },
      {
        name: "Géo-clôtures personnalisables",
        availability: [true, true, true]
      },
      {
        name: "Points d'intérêt",
        availability: [true, true, true]
      },
      {
        name: "Alertes de mouvement",
        availability: [true, true, true]
      }
    ]
  },
  {
    name: "Gestion du carburant",
    icon: <FaGasPump className="text-blue-600 text-xl" />,
    features: [
      {
        name: "Suivi de consommation",
        availability: [true, true, true]
      },
      {
        name: "Détection des anomalies",
        availability: [true, true, true]
      },
      {
        name: "Rapports d'économie",
        availability: [true, true, true]
      },
      {
        name: "Alertes de ravitaillement",
        availability: [false, true, true]
      },
      {
        name: "Analyse avancée de consommation",
        availability: [false, true, true]
      }
    ]
  },
  {
    name: "Maintenance des véhicules",
    icon: <FaTools className="text-blue-600 text-xl" />,
    features: [
      {
        name: "Planification des entretiens",
        availability: [true, true, true]
      },
      {
        name: "Rappels automatiques",
        availability: [true, true, true]
      },
      {
        name: "Suivi des réparations",
        availability: [false, true, true]
      },
      {
        name: "Historique de maintenance",
        availability: [false, true, true]
      },
      {
        name: "Diagnostics avancés",
        availability: [false, false, true]
      }
    ]
  },
  {
    name: "Gestion des conducteurs",
    icon: <FaUserCog className="text-blue-600 text-xl" />,
    features: [
      {
        name: "Profils des conducteurs",
        availability: [true, true, true]
      },
      {
        name: "Analyse du comportement",
        availability: [false, true, true]
      },
      {
        name: "Scores de conduite",
        availability: [false, true, true]
      },
      {
        name: "Formation ciblée",
        availability: [false, false, true]
      },
      {
        name: "Télématique vidéo",
        availability: [false, false, true]
      }
    ]
  },
  {
    name: "Sécurité et protection",
    icon: <FaShieldAlt className="text-blue-600 text-xl" />,
    features: [
      {
        name: "Alertes en temps réel",
        availability: [true, true, true]
      },
      {
        name: "Immobilisation à distance",
        availability: [false, true, true]
      },
      {
        name: "Détection de vol",
        availability: [false, true, true]
      },
      {
        name: "Surveillance vidéo",
        availability: [false, false, true]
      },
      {
        name: "Alertes de comportement dangereux",
        availability: [false, false, true]
      }
    ]
  }
];

// Définition des données pour les FAQs
const pricingFaqs = [
  {
    question: "Est ce que mes appareils GPS sont ils compatibles avec votre plateforme ?",
    answer: "Oui ! Si vous possédez déjà un équipement GPS, il est entièrement compatible avec notre plateforme. Aucun besoin d'en acheter un nouveau !"
  },
  {
    question: "Quels types de véhicules sont compatibles avec votre solution ?",
    answer: "Notre plateforme est compatible avec une large gamme de véhicules : voitures, camions, motos, et même équipements industriels."
  },
  {
    question: "Quelles sont les options de paiement ?",
    answer: "Nous acceptons plusieurs moyens de paiement : orange money, carte bancaire et virement bancaire. Vous pouvez choisir un paiement annuel avec possibilité de fractionnement."
  },
  {
    question: "Comment puis-je contacter le support client ?",
    answer: "Notre support est disponible 24/7 via téléphone, email ou chat en ligne. Nous sommes là pour vous accompagner à chaque étape !"
  },
  {
    question: "Y a-t-il des frais d'installation supplémentaires ?",
    answer: "Non, tous nos forfaits incluent l'installation et la configuration initiale de votre système. Nos techniciens se déplacent sur votre site pour assurer une mise en place optimale."
  },
  {
    question: "Puis-je changer de forfait en cours d'année ?",
    answer: "Absolument ! Vous pouvez passer à un forfait supérieur à tout moment. Le changement prend effet immédiatement et la différence de prix est calculée au prorata de la période restante."
  }
];

// Fonction pour ouvrir le formulaire de contact avec le plan sélectionné
const handleContactClick = (planName: string) => {
  // Stocker le plan sélectionné dans le localStorage pour le récupérer sur la page de contact
  localStorage.setItem('selectedPlan', planName);
  // Rediriger vers la page de contact
  window.location.href = '/contact';
};

export default function Pricing() {
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
              Tarifs simples et transparents
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg opacity-90 mb-8"
            >
              Choisissez le forfait qui correspond le mieux aux besoins de votre entreprise.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Pricing Cards - Design amélioré et plus compact */}
      <section className="py-16 -mt-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden ${plan.popular ? 'border-2 border-blue-500 relative transform md:scale-105 z-10' : 'border border-gray-200'}`}
              >
                {plan.popular && (
                  <div className="bg-blue-500 text-white text-xs font-bold uppercase py-1 px-4 absolute top-0 right-0 rounded-bl-lg">
                    Recommandé
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-center">
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{plan.name}</h3>
                  <p className="text-gray-600 mb-6 h-12 text-center">{plan.description}</p>
                  <div className="mb-6 text-center">
                    <span className="text-sm text-gray-500">XOF</span>
                    <span className="text-4xl font-bold text-gray-800"> {plan.price.toLocaleString()}</span>
                    <span className="text-gray-500">/an</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1 flex-shrink-0">
                          <FaCheck />
                        </span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded && plan.notIncluded.map((feature, i) => (
                      <li key={i} className="flex items-start text-gray-400">
                        <span className="mr-2 mt-1 flex-shrink-0">
                          <FaTimes />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact">
                    <button 
                      className={`w-full py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        plan.popular 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'border border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}
                      onClick={() => handleContactClick(plan.name)}
                    >
                      Nous contacter
                      <FaArrowRight className="text-sm" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison - Design amélioré avec accordéon */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Comparaison détaillée des fonctionnalités</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Un aperçu complet de ce qui est inclus dans chaque forfait pour vous aider à faire le meilleur choix.</p>
          </div>
          
          <div className="space-y-4">
            {featureCategories.map((category, categoryIndex) => (
              <motion.div 
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="mr-3">{category.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                    </div>
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="overflow-x-auto p-2">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="p-4 text-left text-gray-600 font-semibold border-b w-1/3">Fonctionnalité</th>
                          {plans.map((plan, index) => (
                            <th key={index} className="p-4 text-center text-gray-600 font-semibold border-b">
                              {plan.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {category.features.map((feature, featureIndex) => (
                          <tr key={featureIndex} className={featureIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="p-4 border-b text-gray-700">{feature.name}</td>
                            {feature.availability.map((available, i) => (
                              <td key={i} className="p-4 text-center border-b">
                                {available === true ? (
                                  <FaCheck className="text-green-500 mx-auto" />
                                ) : available === false ? (
                                  <FaTimes className="text-gray-400 mx-auto" />
                                ) : (
                                  <span className="text-gray-700">{available}</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Pourquoi choisir notre solution</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Des avantages concrets pour votre entreprise</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <FaGasPump className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Réduction des coûts</h3>
              <p className="text-gray-600">Économisez jusqu'à 25% sur vos coûts de carburant et d'entretien grâce à notre solution de gestion de flotte.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <FaChartLine className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Productivité accrue</h3>
              <p className="text-gray-600">Améliorez l'efficacité de vos opérations et augmentez la productivité de votre flotte de 30% en moyenne.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <FaShieldAlt className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sécurité renforcée</h3>
              <p className="text-gray-600">Protégez vos véhicules et vos conducteurs grâce à nos fonctionnalités de sécurité avancées et nos alertes en temps réel.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Plus compact et élégant */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Questions fréquentes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Trouvez des réponses aux questions les plus courantes sur nos forfaits.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pricingFaqs.map((faq, index) => (
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-xl p-8 md:p-10 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Vous avez encore des questions?</h2>
              <p className="max-w-2xl mx-auto opacity-90">Notre équipe est prête à vous aider à trouver le forfait parfait pour votre entreprise.</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <button className="w-full sm:w-auto px-6 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg transition-all flex items-center justify-center gap-2 text-sm font-medium">
                  Nous contacter
                  <FaArrowRight />
                </button>
              </Link>
              <Link to="/services">
                <button className="w-full sm:w-auto px-6 py-3 border border-white hover:bg-blue-700 text-white rounded-lg transition-all text-sm font-medium">
                  Découvrir nos services
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
