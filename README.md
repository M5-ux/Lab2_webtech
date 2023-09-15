# Application Node.js avec Routes

Ceci est un exemple d'application Node.js simple avec plusieurs routes. L'application utilise le module HTTP pour créer un serveur web et gérer différentes routes.

## Configuration requise

Avant de commencer, assurez-vous d'avoir Node.js installé sur votre système. Vous pouvez le télécharger depuis [le site officiel de Node.js](https://nodejs.org/).

## Installation

1. Clonez ce référentiel sur votre ordinateur en utilisant la commande suivante :

git clone https://github.com/M5-ux/ece-webtech-gr06-605


2. Accédez au répertoire du projet : 
cd nom-du-repertoire


3. Installez les dépendances en exécutant la commande suivante : 
npm install


## Utilisation

Pour lancer l'application, utilisez l'une des commandes suivantes :

- Pour démarrer l'application en mode production :
npm start


- Pour démarrer l'application en mode développement avec nodemon (rechargement automatique lors des modifications) :
npm run dev


L'application sera accessible à l'adresse [http://localhost:8081](http://localhost:8081) dans votre navigateur.

## Routes disponibles

- `/` : Page d'accueil avec un lien vers `/hello`.
- `/hello` : Prend un paramètre `name` dans la requête et répond avec un message de salutation personnalisé. Par exemple, `/hello?name=John` affichera "Salut, John !" sur la page.
- `/about` : Affiche les informations de l'objet JSON contenu dans le fichier `about.json` de manière lisible.

## Structure du projet

- `index.js` : Point d'entrée de l'application.
- `app.js` : Gestionnaire de routes et de logique de l'application.
- `content/about.json` : Fichier JSON contenant des informations à afficher sur la page "À propos".

## Contribuer

N'hésitez pas à contribuer en ouvrant des problèmes ou en soumettant des demandes de tirage (pull requests) pour améliorer l'application.



