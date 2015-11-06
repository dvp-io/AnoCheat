# AnoCheat v2.x
Le projet AnoCheat permet d'agrémenter l'AnoChat de nouvelles fonctionalités en se basant sur un Framework dédié.

## Prérequis
Avant toute chose vous devez installer un gestionnaire d'userscript.

- [TamperMonkey pour Chromium/Chrome v29+](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
- [TamperMonkey pour Opera Next v15+](https://addons.opera.com/en/extensions/details/tampermonkey-beta/?display=en)
- [Scriptish pour Firefox](https://addons.mozilla.org/en-US/firefox/addon/scriptish/)
- [TamperMonkey pour Safari v5+](https://safari.tampermonkey.net/tampermonkey.safariextz)
- [TamperMonkey pour Dolphin (Android v4.0.3+)](https://play.google.com/store/apps/details?id=net.tampermonkey.dolphin)
- [TamperMonkey pour UC Browser (Android v4.0.3+)](https://play.google.com/store/apps/details?id=net.tampermonkey.uc)

## Compatibilité
- [x] Chrome / Chromium
- [x] Opera Next
- [x] Firefox

**Non testé, retours bienvenus**
- [ ] Safari
- [ ] Dolphin
- [ ] UC Browser

## Installation
**NOTE: Vous devez installer le framework (AnoCheat) AVANT le script (GeckoScript) et vous assurer de l'ordre d'execution.**

Chrome :

1. [Installer le framework](https://github.com/dvp-io/AnoCheat/raw/master/AnoCheat.user.js)
2. [Installer le script](https://github.com/dvp-io/AnoCheat/raw/master/GeckoScript.user.js)

Firefox :

1. [Installer le framework](https://github.com/dvp-io/AnoCheat/raw/master/AnoCheat-FF.user.js)
2. [Installer le script](https://github.com/dvp-io/AnoCheat/raw/master/GeckoScript-FF.user.js)

## Bug et suggestions
Vous pouvez soumettre les bugs trouvés et vos suggestions sur le [tracker du projet](https://github.com/dvp-io/AnoCheat/issues).
En cas de bug vous devez préciser:
- La version du script
- Le navigateur utilisé et sa version
- Le système d'exploitation et sa version
- Le moyen de reproduire le bug

**Dans tous les cas vérifiez que vous disposez bien de la dernière version AVANT de signaler un bug**

- [Accéder au tracker](https://github.com/dvp-io/AnoCheat/issues)

## Changelog
Vous pouvez voir les évolutions sur les changelogs. Les nouveautés du framework sont séparées du script.
- [Changelog du script](./GeckoScript-changelog.md)
- [Changelog du Framework](./AnoCheat-changelog.md)

## Accessibilité
Certains d'entre vous rencontrent des problèmes pour se connecter depuis leur poste de travail. Afin de palier à ce problème une liste d'IP et noms de domaine est disponible pour accéder au chat :
- [http://chat.developpez.com](http://chat.developpez.com)
- [http://chat.dvp.io](http://chat.dvp.io)
- [http://87.98.168.209](http://87.98.168.209)
- [http://149.202.80.151](http://149.202.80.151)

## Fonctionalités

Raccourcis clavier :

Touches | Action 
--------|-------
Double-clic + CTRL | Citer le message
Double-clic + Shift | Alerter la modération (cite le message)
Double-clic + ALT | Supprimer/Modérer le message
ALT + Flèche droite | Afficher/Masquer la liste des membres
ALT + Flèche du bas | Afficher/masquer la zone de saisie

Ergonomie :
- Les onglets de conversation peuvent êtres réorganisés (Drag & Drop)
- Un sélecteur de thème vous permet changer le rendu visuel du chat

## Fonctionalités retirées

- Double-clic (réponse à un message) : Implémenté directement sur le chat (3.0.1)