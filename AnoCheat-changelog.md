# Changelog AnoCheat

## 2.4.0

Fonctionalités :

- Ajout de la méthode `str.hash` si elle n'existe pas
- Support des notifications système via la méthode `AC_notifyBrowser`

## 2.3.1 (version spéciale FireFox uniquement)

Général :

- Fin du support de Scriptish, les méta renvoient maintenant vers la version classique

## 2.3.0

Fonctionalités :

- Ajout de la méthode `str.trim()` si elle n'existe pas [Source MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/trim)
- Ajout de la méthode `$.preBind` pour permettre de bind des events avant celles du chat

## 2.2.2

Correctifs :

- L'image du menu est maintenant correctement affichée
- Correction du lien renvoyant vers l'ancre Bugs & Suggestion

## 2.2.1

Général :

- Nouvelle version du chat requise (3.0.3)

## 2.2.0

Général :

- Nouvelle version du chat requise (3.0.2)
- Chargement de jQuery-ui 1.8.18 (édition complète)

Fonctionalités :

- Implémentation de la méthode `AC_notify`
- Implémentation de la méthode `AC_callAPI`
- Implémentation de la méthode `AC_configRemove`
- Implémentation de la méthode `AC_bangAdd` **Beta**
- Implémentation de l'objet `AC_bangList`

Correctifs :

- Les méthodes `AC_config*` stockent les données dans le `localStorage`, les `cookies` ou `AC_config` selon la disponibilité
- LStorage retourne maintenant l'état d'accessibilité du localStorage
- CStorage retourne maintenant l'état d'accessibilité des cookies

## 2.1.2

Général :

- Le Framework est désormais disponible pour Firefox

Fonctionalités :

- `AC_buttonAdd` prend maintenant un troisième paramètre optionnel sous forme d'objet `{after|before:'inputID'}`

## 2.1.1

Correctifs :

- Mise à jour des url prises en charge

## 2.1.0

Général :

- Nouvelle version du chat requise (3.0.1)

Correctifs :

- La méthode `AC_addStyle` est renommée `AC_cssAdd`
- Le menu DVP I/O s'ouvre maintenant à la bonne place quelque soit la résolution
- Le menu DVP I/O se ferme automatiquement quand le curseur sort du menu
- Les logs sont désormais contenus dans des `div`

Fonctionalités :

- Implémentation de la méthode `AC_configWrite`
- Implémentation de la méthode `AC_configRead`
- Ajout d'un menu pointant vers le tracker
- Ajout d'un menu pointant vers le projet

## 2.0.2

Correctifs :

- Ajout de la classe pour les boutons insérés dans la barre d'outils

## 2.0.1

Correctifs :

- Prise en charge de l'IP du chat
- Ajout d'une entrée log pour indiquer le bon chargement du framework
- Changement de la portée de la variable `AC_version`

## 2.0.0

Général: 

- Version initiale

Fonctionalités :

- Implémentation de la variable `AC_version`
- Ajout d'un menu à gauche du color picker
- Implémentation de la méthode `AC_buttonAdd`
- Implémentation de la méthode `AC_menuAdd`
- Implémentation de la méthode `AC_UUID`
- Implémentation de la méthode `AC_addStyle`
- Implémentation d'Event Emitter
