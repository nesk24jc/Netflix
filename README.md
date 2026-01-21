João SANTOS , étudiant en BUT (2ème année) informatique passionné par le développement web, j'ai déjà fait un projet web qui permet les profs de créer des questionnaires et de les envoyer aux élèves, je m'en occupé  de la base de données.


1er sujet:
à mon avis pour faire un projetNetflix , il faudrait avoir l'architecture suivante : 

#Fonctionnement de l'application 
-D'abord l'utilsateur va créer un compte, ensuite il pourra se connecter.
-Ensuite il pourra choisir un film ou une série pour la regarder.
-Enfin il pourra se deconnecter.

#Serveur et base de données
il seras hébergé sur un serveur web, avec un serveur de base de données.
Tables -->>>>>

utilisateurs;
films;
séries;
categories;
------->>>

#Frontend
HTML, CSS, JS
Page interactive, responsive, avec un design modern et attrayant.

#Back-end
node.js ou php

Gestion des utilisateurs, des films et des séries.

#Sécurité
------pas de compétences pour sécuriser l'application------


2eme sujet:

Les trois couches application pour netflix:


couche donnés:

parlé sur le premier sujet | #Tables -->>>>>
mysql, mariadb, postgresql, sqlite, oracle, sql server


    
couche métier:
  avec du node.js , du php ou du python.
on va accéder à la couche données pour récupérer les données.
on va accéder à la couche données pour modifier les données.
on va accéder à la couche données pour supprimer les données.
les règles de gestion seront dans la couche métier.
par exemple , si on veut ajouter un film, on va accéder à la couche données pour ajouter le film.







couche presentation:
avec du html, css et js
react, vue.js, angular
->on aura des buttons pour choisir un film ou une série.
->le film ou la série sera affiché dans une page.
->le profil sera affiché dans une page.
->la page de connexion sera affiché dans une page.
->la page d'inscription sera affiché dans une page.
->la page de deconnexion sera affiché dans une page.
->la page de modification du profil sera affiché dans une page.
->la page de modification du mot de passe sera affiché dans une page.
->la page de modification du profil sera affiché dans une page.
-> les couleurs seront modernes et attrayantes.
-> un design responsive.
-> un design moderne.







4eme sujet:

Requetes front-end et back-end:

-> front-end:

exemples de requêtes Front-end :
`GET /api/movies` 
 `POST /api/login` 
 `GET /api/movies/123`  

-> back-end:
Le back-end (serveur) reçoit ces requêtes, traite la logique métier, interroge la base de données, et renvoie une réponse.


-> Réception : Le serveur reçoit la requête HTTP (ex: `GET /api/movies`).
-> Traitement : Il vérifie si l'utilisateur est connecté (session/token).
-> Données : Il fait une requête SQL à la base de données (ex: `SELECT * FROM films`).
-> Réponse : Il renvoie les données au front-end;


