# Guide de Déploiement StockTracker sur Vercel

## Prérequis
- Compte Vercel (https://vercel.com)
- Compte GitHub pour héberger le code
- Base de données PostgreSQL (recommandé : Neon, Supabase, ou PlanetScale)

## Structure du Projet
Votre application StockTracker est structurée comme suit :
```
├── client/          # Frontend React
├── server/          # Backend Express.js
├── shared/          # Types partagés
├── package.json     # Configuration npm
└── vercel.json      # Configuration Vercel
```

## Étapes de Déploiement

### 1. Préparation du Code
1. Uploadez le code sur GitHub
2. Assurez-vous que tous les fichiers sont présents

### 2. Configuration Base de Données
1. Créez une base de données PostgreSQL sur Neon (gratuit) :
   - Allez sur https://neon.tech
   - Créez un nouveau projet
   - Copiez l'URL de connexion

### 3. Déploiement sur Vercel
1. Connectez-vous sur https://vercel.com
2. Cliquez "New Project"
3. Importez votre repository GitHub
4. Configurez les variables d'environnement :
   - `DATABASE_URL` : URL de votre base PostgreSQL
   - `NODE_ENV` : production

### 4. Configuration Build
Vercel détectera automatiquement :
- Frontend : React (port 3000)
- Backend : Express.js (port 5000)
- Build command : `npm run build`
- Start command : `npm start`

### 5. Variables d'Environnement
Dans les settings Vercel, ajoutez :
```
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
```

## Commandes de Build
```bash
# Installation des dépendances
npm install

# Build du frontend
npm run build

# Démarrage en production
npm start
```

## Structure de Production
- Frontend buildé dans `dist/public`
- Backend bundlé dans `dist/index.js`
- Assets statiques servis par Express

## Domaine Personnalisé
1. Dans Vercel Dashboard → Settings → Domains
2. Ajoutez votre domaine
3. Configurez les DNS selon les instructions

## Surveillance et Logs
- Logs disponibles dans Vercel Dashboard
- Monitoring des performances inclus
- Alertes automatiques en cas d'erreur

## Support
En cas de problème :
1. Vérifiez les logs Vercel
2. Testez la base de données
3. Vérifiez les variables d'environnement