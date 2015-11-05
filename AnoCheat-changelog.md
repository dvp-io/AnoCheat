# Changelog AnoCheat

## 2.1.1

Correctifs :

- Mise à jour des url prises en charge

## 2.1.0

Général :

- Nouvelle version du chat requise (3.0.1)

Correctifs :

- La méthode AC_addStyle est renommée AC_cssAdd
- Le menu DVP I/O s'ouvre maintenant à la bonne place quelque soit la résolution
- Le menu DVP I/O se ferme automatiquement quand le curseur sort du menu
- Les logs sont désormais contenus dans des `div`

Fonctionalités :

- Implémentation de la méthode  AC_configWrite
- Implémentation de la méthode AC_configRead
- Ajout d'un menu pointant vers le tracker
- Ajout d'un menu pointant vers le projet

## 2.0.2

Correctifs :

- Ajout de la classe pour les boutons insérés dans la barre d'outils

## 2.0.1

Correctifs :

- Prise en charge de l'IP du chat
- Ajout d'une entrée log pour indiquer le bon chargement du framework
- Changement de la portée de la variable AC_version

## 2.0.0

Général: 

- Version initiale

Fonctionalités :

- Implémentation de la variable AC_version
- Ajout d'un menu à gauche du color picker
- Implémentation de la méthode AC_buttonAdd
- Implémentation de la méthode AC_menuAdd
- Implémentation de la méthode AC_UUID
- Implémentation de la méthode AC_addStyle
- Implémentation d'Event Emitter