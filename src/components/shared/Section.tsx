import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  centered?: boolean;
  bgColor?: 'white' | 'gray' | 'blue' | 'gradient';
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  title,
  subtitle,
  centered = false,
  bgColor = 'white',
  id,
}) => {
  // Styles de fond
  const bgStyles = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-600 text-white',
    gradient: 'bg-gradient-to-r from-blue-600 to-blue-800 text-white',
  };

  return (
    <section className={`py-16 ${bgStyles[bgColor]} ${className}`} id={id}>
      <div className="container mx-auto px-4 max-w-6xl">
        {(title || subtitle) && (
          <div className={`${centered ? 'text-center' : ''} mb-12`}>
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-3"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className={`${bgColor === 'white' || bgColor === 'gray' ? 'text-gray-600' : 'opacity-90'} max-w-2xl ${centered ? 'mx-auto' : ''}`}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section; 