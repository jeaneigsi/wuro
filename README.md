# Wuro Technologies - Gestion de Flotte

Ce projet est un site web moderne pour Wuro Technologies, une entreprise spécialisée dans la gestion de flotte et la télématique en Afrique.

## Fonctionnalités

- **Design moderne et réactif** : Interface utilisateur élégante et adaptée à tous les appareils
- **Optimisations de performance** : Lazy loading, code splitting, debounce et throttle
- **Animations fluides** : Utilisation de Framer Motion et AOS pour des animations fluides
- **Formulaire de contact** : Formulaire de contact avec validation en temps réel
- **Composants réutilisables** : Architecture modulaire avec des composants partagés

## Pages

- **Accueil** : Présentation de l'entreprise et des services principaux
- **Services** : Détail des services de gestion de flotte
- **À propos** : Informations sur l'entreprise, sa mission et ses valeurs
- **Tarifs** : Grille tarifaire des différentes offres
- **Contact** : Formulaire de contact et informations de contact

## Technologies utilisées

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- React Icons

## Optimisations de performance

- Lazy loading des composants
- Code splitting
- Préchargement des images
- Debounce et throttle pour les événements
- Détection du support WebP

## Structure du projet

```
src/
├── components/
│   ├── Home.tsx
│   ├── Services.tsx
│   ├── About.tsx
│   ├── Pricing.tsx
│   ├── Contact.tsx
│   └── shared/
│       ├── Button.tsx
│       └── Section.tsx
├── utils/
│   └── performance.ts
└── App.tsx
```

## Installation et démarrage

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm start

# Construction pour la production
npm run build
``` 