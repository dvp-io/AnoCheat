# Changelog GeckoScript

## 2.7.0

Général :

- Nouvelle version du framework requise (2.5.1)

Fonctionalités :

- Une interface de configuration est disponible pour le centre de notifications
- Les notifications visuelles peuvent être personnalisées pour êtres plus discrètes, ou pas
- Les notifications sonores sont disponibles, pour ajouter des sons utilisez le gestionnaire de sons

Correctifs :

- Désormais après avoir choisis un thème le focus est replacé sur la zone de saisie #7
- Le color picker natif affiche maintenant la bonne couleur dès la connexion au chat #8
- Correction du conflit entre les racourcis du chat et du script #5

## 2.6.2

Fonctionalités :

- Les notices reçues sont maintenant notifiées
- Les réponses reçues sont maintenant notifiées
- Les mentions reçues sont maintenant notifiées

## 2.6.1

Correctifs :

- Correction d'un bug apparu lors de l'évènement de noël empêchant la détection de l'expéditeur

## 2.6.0

Général :

- Nouvelle version du Framework requise (2.4.2)

Fonctionalités :

- Les alertes sont maintenant notifiées
- Désormais quand vous recevez un nouveau MP vous êtes notifié

## 2.5.1

Général :

- Nouvelle version du Framework requise (2.4.1)
- Prise en charges des proxy DVP I/O France, Pologne et Finlande

Correctifs :

- Désormais l'historique personnel fonctionne avec les touches `ALT + ↑` et `ALT + ↓`
- Désormais la zone de saisie peut être masquée/affichée avec les touches `CTRL + ↓`
- Désormais la liste des membres peut être masquée/affichée avec les touches `CTRL + →`

## 2.5.0

Général :

- Nouvelle version du Framework requise (2.4.0)

Fonctionalités :

- Remplacement du color picker du chat par celui du navigateur pour plus de choix

## 2.4.1 (version spéciale FireFox uniquement)

Général :

- Fin du support de Scriptish, les méta renvoient maintenant vers la version classique

## 2.4.0

Général :

- Nouvelle version du Framework requise (2.3.0)

Fonctionalités :

- Ajout du style Magic Gecko, attention ça pique les yeux ! [Source](https://github.com/antoine-pous/magic-gecko/blob/master/magicGecko.css)
- Désormais si le focus est dans la zone de saisie la combinaison `Shift + ↑` ou `Shift + ↓` permet de parcourir l'historique des messages envoyés [#2](https://github.com/dvp-io/AnoCheat/issues/2)
- Désormais le BBCode JOIN est trim pour éviter de casser le lien vers le salon [Ticket 879](http://www.developpez.net/forums/issue.php?issueid=879)

Correctifs :

- Les onglets de conversation ne peuvent plus se superposer

## 2.3.6

Général :

- Nouvelle version du Framework requise (2.2.2)

Fonctionalités :

- Suppression du bouton d'upload (intégré au chat depuis la version 3.0.2)

## 2.3.5

Général :

- Nouvelle version du chat requise (3.0.3)
- Nouvelle version du Framework requise (2.2.1)

## 2.3.4

Général :

- Le script est désormais disponible pour Firefox

Correctifs :

- Correction d'un bug mineur qui empêchait le Drag & Drop des onglets de fonctionner sous Firefox 

## 2.3.3

Général :

- Nouvelle version du Framework requise (2.1.2)

Fonctionalités :

- Ajout d'un bouton dans la barre d'outil pour upload des fichiers facilement

## 2.3.2

Général :

- Nouvelle version du Framework requise (2.1.1)

Fonctionalités :

- Le combo ALT + Flèche du bas affiche/masque la zone de saisie
- Le combo ALT + Flèche de droite affiche/masque la liste des membres

Correctifs :

- Mise à jour des url prises en charge

## 2.3.1

Correctifs :

- Suppression de la réponse au double-clic (natif depuis la 3.0.1)

## 2.3.0

Général :

- Nouvelle version du Framework requise (2.1.0)
- Nouvelle version du chat requise (3.0.1)

Fonctionalités :

- Implémentation de la méthode GS_styleAdd
- Implémentation d'un sélecteur de design, concevez et publiez vos propre design pour l'AnoChat

## 2.2.2

Correctifs :

- Implémentation du Drag & drop de jQuery-UI

## 2.2.1

Correctifs :

- Suppression des console.log

## 2.2.0

Correctifs :

- Prise en charge du menu dans les conversations par le mode mono (@Takka)
- Prise en charge de l'autocomplétion, le pseudo sélectionné est souligné (@Takka)
- Prise en charge des menus conversation et chat

Fonctionalités :

- Prise en charge du drag & drop pour les onglets de conversation

## 2.1.1

Correctifs :

- Correction du CSS pour le mode mono (@Takka, @OuiOuiDidou)

## 2.0.3 (mauvais incrément de version)

Général:

  - Nouvelle version du framework requise (2.0.2)

Fonctionalités :

  - Ajout du mode mono ultime 

## 2.0.2

Correctifs :

  - Bind de la touche commande sous Mac pour la réponse rapide (@Mell)

## 2.0.1

Général :

  - Nouvelle version du framework requise (2.0.1)

Fonctionalités :

  - Ajout d'une entrée dans le log pour indiquer le bon chargement du script

## 2.0.0

Général :

  - Version initiale

Fonctionalités :

  - Ajout de la réponse rapide
