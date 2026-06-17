#  Vibesss - Plateforme de Blogging Immersive

Vibesss est une plateforme de blogging moderne conçue pour offrir une expérience d'écriture et de lecture fluide. Partagez vos "vibes" à travers des articles riches et une interface personnalisable.

---

##  Installation Rapide

### 1. Cloner et Installer
bash
git clone <votre_url_de_repo>
cd vibesss
npm install

2. Base de Données
Créez un fichier .env dans le dossier backend et lancez la migration : npm run migrate 

Stack Technique

Frontend

React 19 & Vite : Performance et rapidité.
Tailwind CSS & DaisyUI : Interface moderne et responsive.
Tiptap : Éditeur de texte riche (Rich Text Editor).
Lucide React : Icônes élégantes.

Backend

Node.js & Express 5 : API robuste.
MySQL : Gestion des données structurées.
Argon2 & JWT : Sécurité et authentification renforcée.
Sanitize-HTML : Protection contre les failles XSS.

 Fonctionnalités Clés

 Édition Avancée

Création d'articles avec mise en forme riche (gras, images, etc.).
Compteur de caractères intégré à l'éditeur.

 Modération Super-Admin

Actions Directes : Suppression d'articles, blogs et commentaires directement depuis la vue publique pour les admins.
Dashboard de Reporting : Gestion centralisée des signalements de la communauté.

💬 Interaction Sociale
Système de commentaires avec réponses.
Likes dynamiques sur les articles.
Signalement de contenu (Spam, Harcèlement, etc.).


vibesss/
├── backend/                # API Express & Base de données
│   ├── src/
│   │   ├── controllers/    # Logique métier
│   │   ├── models/         # Requêtes SQL (AbstractManager)
│   │   └── router.js       # Routes API
│   └── database.sql        # Schémas & Données initiales
├── frontend/               # Application React
│   ├── src/
│   │   ├── components/     # UI de modération & blog
│   │   ├── services/       # Appels API
│   │   └── pages/          # Home, BlogSpace, Profile
└── docker-compose.yml      # Orchestration Docker


Équipe

Projet réalizé par la TeamBossLady