import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaArrowRight, FaQuestionCircle } from 'react-icons/fa';
import { debounce } from '../utils/performance';

// Composant Section importé depuis les composants partagés
import Section from './shared/Section';
import Button from './shared/Button';

export default function Contact() {
  // État du formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  // État de validation du formulaire
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  // État de soumission du formulaire
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Données pour les FAQs
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

  useEffect(() => {
    // Initialisation d'AOS avec des paramètres optimisés
    AOS.init({
      duration: 800,
      once: true,
      delay: 0,
      throttleDelay: 99,
    });
  }, []);

  // Gestion des changements dans le formulaire avec debounce pour améliorer les performances
  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validation en temps réel
    validateField(name, value);
  }, 300);

  // Validation d'un champ spécifique
  const validateField = (name: string, value: string) => {
    let errorMessage = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          errorMessage = 'Le nom est requis';
        }
        break;
      case 'email':
        if (!value.trim()) {
          errorMessage = 'L\'email est requis';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = 'Format d\'email invalide';
        }
        break;
      case 'message':
        if (!value.trim()) {
          errorMessage = 'Le message est requis';
        } else if (value.trim().length < 10) {
          errorMessage = 'Le message doit contenir au moins 10 caractères';
        }
        break;
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
    
    return !errorMessage;
  };

  // Validation du formulaire complet
  const validateForm = () => {
    const nameValid = validateField('name', formData.name);
    const emailValid = validateField('email', formData.email);
    const messageValid = validateField('message', formData.message);
    
    return nameValid && emailValid && messageValid;
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Simulation d'envoi de formulaire
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Réinitialisation du formulaire après succès
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      setSubmitSuccess(true);
      
      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Informations de contact
  const contactInfo = [
    {
      icon: <FaPhoneAlt className="text-blue-600 text-xl" />,
      title: "Téléphone",
      details: [
        "+226 70 20 45 48",
        "+226 75 50 03 89",
        "+226 06 11 11 41"
      ]
    },
    {
      icon: <FaEnvelope className="text-blue-600 text-xl" />,
      title: "Email",
      details: [
        "info@wurotechnologies.com",
        "support@wurotechnologies.com"
      ]
    },
    {
      icon: <FaMapMarkerAlt className="text-blue-600 text-xl" />,
      title: "Adresse",
      details: [
        "Ouagadougou, Burkina Faso",
        "Quartier Cissin, Secteur 17"
      ]
    },
    {
      icon: <FaClock className="text-blue-600 text-xl" />,
      title: "Heures d'ouverture",
      details: [
        "Lundi - Vendredi: 8h - 18h",
        "Samedi: 9h - 13h"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <Section 
        bgColor="gradient" 
        title="Contactez-nous" 
        subtitle="Nous sommes là pour répondre à toutes vos questions et vous aider à optimiser votre flotte"
        centered
      >
        <div className="flex justify-center mt-8">
          <Button 
            to="#contact-form" 
            variant="primary" 
            size="lg" 
            className="bg-white text-black hover:bg-gray-100"
            icon
          >
            Nous contacter maintenant
          </Button>
        </div>
      </Section>

      {/* Informations de contact */}
      <Section 
        bgColor="white" 
        title="Nos coordonnées" 
        subtitle="Plusieurs façons de nous joindre pour discuter de vos besoins"
        centered
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm text-center"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {info.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{info.title}</h3>
              <ul className="space-y-2">
                {info.details.map((detail, i) => (
                  <li key={i} className="text-gray-600">{detail}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section 
        bgColor="gray" 
        title="Questions fréquentes" 
        subtitle="Trouvez rapidement des réponses à vos questions"
        centered
      >
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer bg-white hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FaQuestionCircle className="text-blue-600 flex-shrink-0" />
                      <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                    </div>
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
      </Section>

      {/* Formulaire de contact */}
      <Section 
        bgColor="white" 
        title="Envoyez-nous un message" 
        subtitle="Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais"
        centered
        id="contact-form"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Message envoyé avec succès!</h3>
                <p className="text-gray-600 mb-6">Nous vous répondrons dans les plus brefs délais.</p>
                <Button 
                  onClick={() => setSubmitSuccess(false)} 
                  variant="primary"
                >
                  Envoyer un autre message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      defaultValue={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                      placeholder="Votre nom"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      defaultValue={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                      placeholder="votre@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      defaultValue={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="+226 XX XX XX XX"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                    <select
                      id="subject"
                      name="subject"
                      defaultValue={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="devis">Demande de devis</option>
                      <option value="demo">Demande de démonstration</option>
                      <option value="support">Support technique</option>
                      <option value="partnership">Partenariat</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    defaultValue={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                    placeholder="Comment pouvons-nous vous aider?"
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>
                
                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                    {submitError}
                  </div>
                )}
                
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    {!isSubmitting && <FaArrowRight />}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </Section>

      {/* Carte */}
      <Section bgColor="gray">
        <div className="rounded-lg overflow-hidden shadow-md">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125233.44894766428!2d-1.6097851672656152!3d12.368446316064392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe2e9c72785dc8ff%3A0x9a8001dc72a8108e!2sOuagadougou%2C%20Burkina%20Faso!5e0!3m2!1sfr!2sfr!4v1647872564018!5m2!1sfr!2sfr" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            title="Carte de localisation"
          ></iframe>
        </div>
      </Section>

      {/* CTA Section */}
      <Section bgColor="white">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-xl p-8 md:p-10 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Prêt à optimiser votre flotte?</h2>
          <p className="mb-6 max-w-2xl mx-auto opacity-90">
            Découvrez comment notre solution de gestion de flotte peut transformer vos opérations et réduire vos coûts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              to="/pricing" 
              variant="primary" 
              className="bg-white text-black hover:bg-gray-100"
              icon
            >
              Voir nos tarifs
            </Button>
            <Button 
              to="/services" 
              variant="outline"
            >
              Découvrir nos services
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
} 