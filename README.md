# SoleyEvazyon

SoleyEvazyon est une application web de voyage conçue avec Next.js. Elle offre une plateforme intuitive pour explorer, réserver et partager des expériences de voyage uniques. L'application combine une interface utilisateur élégante avec des fonctionnalités robustes pour gérer un catalogue diversifié de destinations de voyage.

## Configuration requise

Pour utiliser ou contribuer à SoleyEvazyon, vous devez avoir les outils suivants installés sur votre système :

- #### Node.js
  Un environnement d'exécution JavaScript côté serveur. Téléchargez et installez-le depuis [le site officiel de Node.js](https://nodejs.org/).
- #### Next.js
  Un framework React pour la production. Next.js est installé via npm ou yarn après l'installation de Node.js.

## Installation

1. Clonez ce référentiel sur votre ordinateur en utilisant la commande suivante :

```
git clone https://github.com/M5-ux/ece-webtech-gr06-605
```

2. Accédez au répertoire du projet :

```
cd nom-du-repertoire
```

3. Installez les dépendances en exécutant la commande suivante :

```
npm install
```

Ou, si vous utilisez yarn :

```
yarn install
```

## Utilisation

Pour lancer l'application, utilisez l'une des commandes suivantes :

1. Construire pour la Production :

```
npm run build
```

2. Lancer l'Application en Production :

```
npm start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Routes disponibles

- `/` : La page d'accueil présente un aperçu des services et propose des liens rapides vers nos destinations, informations, contacts, et un accès utilisateur via le bouton de connexion.
- `/destinations` : Explorez une liste complète de destinations captivantes à travers le monde.
- `/destinationsDescription/destinations/[id]` : Plongez dans les détails et les merveilles de chaque destination.
- `/about` : Apprenez-en plus sur SoleyEvazyon et notre passion pour les voyages.
- `/contacts` : Obtenez nos coordonnées pour une assistance ou des questions.
- `/login` : Connectez-vous pour une expérience personnalisée et des fonctionnalités exclusives.

## Structure du projet

Le projet est organisé comme suit :

- `client/` : Contient les scripts clients spécifiques, pour gerer les logiques côté client.
  - `components/` : Réutilisables à travers le projet, nos composants rendent l'interface utilisateur intuitive et engageante.
  - `pages/` : Chaque fichier JS représente une page distincte de notre site, grâce au routage intuitif de Next.js.
  - `styles/` : Contient les feuilles de style globales et les modules CSS pour un design cohérent et élégant.
  - `utils/` : Fonctions utilitaires et configurations, y compris l'intégration avec Supabase pour les fonctionnalités backend.
  - `public/` : Assets publics tels que images et logos utilisés sur le site.
- `server/` : Contient les scripts serveur spécifiques, pour gérer les API ou les logiques côté serveur.
- `supabase/`: Dossier dédié à la configuration et aux scripts relatifs à Supabase, le Backend-as-a-Service que nous utilisons pour la gestion des données et l'authentification.

Chaque dossier est essentiel pour organiser le code de l'application et séparer les préoccupations pour la maintenabilité et l'évolutivité.

## Bonus

Nous avons tenus à réaliser quelques bonus :

- Utilisation de Prettier et ESLint pour le formatage automatique de notre code
- Utilisation de la librairie AOS pour les animations du contenu des pages

## API

Pour notre API, nous avons utilisé une API de méteo : [Visualcrossing Weather API](https://www.visualcrossing.com/weather-api)
Elle se charge de donner la météo en fonction de la destination.

## Contribuer

N'hésitez pas à contribuer en ouvrant des problèmes ou en soumettant des demandes de tirage (pull requests) pour améliorer l'application.

## Auteurs

- [Jonathan VELIN](https://github.com/jonathan971)
- [Mathias NERIS](https://github.com/M5-ux)
- [Omar LAHBABI](https://github.com/omar2929)
