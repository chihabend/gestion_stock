# StockTracker - Application de Gestion d'Inventaire

## Description
StockTracker est une application web moderne de gestion d'inventaire développée avec React et Express.js. Elle permet de gérer efficacement vos produits, suivre les stocks et visualiser les statistiques en temps réel.

## Fonctionnalités
- ✅ Tableau de bord avec statistiques en temps réel
- ✅ Gestion complète des produits (CRUD)
- ✅ Recherche et tri des produits
- ✅ Interface responsive et moderne
- ✅ Alertes de stock faible
- ✅ Base de données PostgreSQL

## Technologies Utilisées
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Express.js + TypeScript
- **Base de données**: PostgreSQL avec Drizzle ORM
- **UI**: Shadcn/UI + Radix UI
- **Déploiement**: Optimisé pour Vercel

## Installation Locale

### Prérequis
- Node.js 18+ 
- PostgreSQL

### Configuration
1. Clonez le repository
2. Installez les dépendances : `npm install`
3. Configurez la variable d'environnement :
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/stocktracker
   ```
4. Initialisez la base de données : `npm run db:push`
5. Lancez l'application : `npm run dev`

## Déploiement sur Vercel

### Étapes Rapides
1. **Préparez votre base de données**
   - Créez un compte sur [Neon](https://neon.tech) (gratuit)
   - Créez une nouvelle base de données
   - Copiez l'URL de connexion

2. **Déployez sur Vercel**
   - Uploadez le code sur GitHub
   - Connectez-vous sur [Vercel](https://vercel.com)
   - Importez votre repository
   - Ajoutez la variable d'environnement `DATABASE_URL`
   - Déployez !

### Configuration Automatique
- Le fichier `vercel.json` configure automatiquement le déploiement
- Le frontend est buildé dans `dist/public`
- Le backend est bundlé pour la production
- Les routes API sont automatiquement gérées

## Structure du Projet
```
├── client/           # Application React
│   ├── src/
│   │   ├── components/  # Composants UI
│   │   ├── pages/       # Pages de l'application
│   │   └── lib/         # Utilitaires
├── server/           # API Express.js
│   ├── routes.ts     # Endpoints API
│   ├── storage.ts    # Logique base de données
│   └── db.ts         # Configuration DB
├── shared/           # Types partagés
└── vercel.json       # Configuration déploiement
```

## API Endpoints
- `GET /api/products` - Liste des produits
- `POST /api/products` - Créer un produit
- `PUT /api/products/:id` - Modifier un produit
- `DELETE /api/products/:id` - Supprimer un produit
- `GET /api/products/stats` - Statistiques

## Variables d'Environnement
```env
DATABASE_URL=postgresql://...
NODE_ENV=production
```

## Support
Pour toute question ou problème, consultez les logs de déploiement ou vérifiez la configuration de la base de données.