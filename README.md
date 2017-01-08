# AnoCheat v2.x
Le projet AnoCheat permet d'agrémenter l'AnoChat de nouvelles fonctionalités en se basant sur un Framework dédié.

**Table des matières :**

- [Prérequis](https://github.com/dvp-io/AnoCheat#prérequis)
- [Compatibilité](https://github.com/dvp-io/AnoCheat#compatibilité)
- [Installation](https://github.com/dvp-io/AnoCheat#installation)
- [Bugs & Suggestions](https://github.com/dvp-io/AnoCheat#bugs-et-suggestions)
- [Changelogs](https://github.com/dvp-io/AnoCheat#changelogs)
- [Accessibilité](https://github.com/dvp-io/AnoCheat#accessibilité)
- [Fonctionalités](https://github.com/dvp-io/AnoCheat#fonctionalités)
- [Fonctionalités retirées](https://github.com/dvp-io/AnoCheat#fonctionalités-retirées)

## Prérequis
Avant toute chose vous devez installer [TamperMonkey](https://tampermonkey.net) sur votre navigateur.

- [TamperMonkey pour Chromium/Chrome v29+](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
- [TamperMonkey pour Opera Next v15+](https://addons.opera.com/en/extensions/details/tampermonkey-beta/?display=en)
- [TamperMonkey pour Firefox v46+](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
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
**NOTE :** 
Vous devez installer le framework (AnoCheat) AVANT le script (GeckoScript) et vous assurer de l'ordre d'execution

**Attention !**
La version dédié à Firefox n'existe plus, TamperMonkey étant maintenant disponible vous pouvez utiliser la version classique de l'AnoCheat et du GeckoScript

1. [Installer l'AnoCheat](https://github.com/dvp-io/AnoCheat/raw/master/AnoCheat.user.js)
2. [Installer le GeckoScript](https://github.com/dvp-io/AnoCheat/raw/master/GeckoScript.user.js)

**/!\ Une fois le Framework et le script installés vous devez rafraichir la page de chat pour qu'ils soient executés /!\**

## Bugs et suggestions
Vous pouvez soumettre les bugs trouvés et vos suggestions sur le [tracker du projet](https://github.com/dvp-io/AnoCheat/issues).

## Changelogs
Vous pouvez voir les évolutions sur les changelogs. Les nouveautés du framework sont séparées du script.
- [Changelog du script](./GeckoScript-changelog.md)
- [Changelog du Framework](./AnoCheat-changelog.md)

## Accessibilité
Certains d'entre vous rencontrent des problèmes pour se connecter depuis leur poste de travail. Afin de palier à ce problème une liste d'IP et noms de domaine est disponible pour accéder au chat.

### Adresses officielles
- [http://chat.developpez.com](http://chat.developpez.com)
- [http://87.98.168.209](http://87.98.168.209) - Developpez France

### Adresses fournies par DVP I/O
- [http://chat.dvp.io](http://chat.dvp.io)
- [http://178.32.150.5](http://178.32.150.5) - DVP I/O Pologne
- [http://5.196.237.44](http://5.196.237.44) - DVP I/O France
- [http://5.135.21.60](http://5.135.21.60) - DVP I/O Finlande

### Adresses fournies par des tiers
*Pour proposer vos proxy contactez Gecko par MP*

## Fonctionalités

Raccourcis clavier :

Touches | Action 
---|---
`CTRL` + `Double-clic` | Citer le message
`SHIFT` + `Double-clic` | Alerter la modération (cite le message)
`ALT` + `Double-clic` | Supprimer/Modérer le message
**Interface utilisateur** |
`CTRL` + `→` | Afficher/Masquer la liste des membres
`CTRL` + `↓` | Afficher/masquer la zone de saisie
**Historique personnel** | _Vous devez avoir le focus dans la zone de saisie_
`ALT` + `↑` | Remonte l'historique personnel de la conversation en cours
`ALT` + `↓` | Descend l'historique personnel de la conversation en cours

Ergonomie :
- Les onglets de conversation peuvent êtres réorganisés (Drag & Drop)
- Un sélecteur de thème vous permet changer le rendu visuel du chat
- Les MP, notices, réponses et mentions sont notifiés via l'API de l'OS (fournis par TamperMonkey)

### Centre de notifications

Le centre de notifications vous permet de gérer de manière avancée et intuitive toutes les notifications
du chat. Les notifications sont à activer et configurer manuellement via l'interface graphique.

[![](https://raw.githubusercontent.com/dvp-io/AnoCheat/master/.github/screenshots/notifs-3.png)](https://raw.githubusercontent.com/dvp-io/AnoCheat/master/.github/screenshots/notifs-3.png)

Par défaut les notifications utilisent le logo de DVP I/O et les informations relatives à la notification.

[![](https://raw.githubusercontent.com/dvp-io/AnoCheat/master/.github/screenshots/notifs-1.png)](https://raw.githubusercontent.com/dvp-io/AnoCheat/master/.github/screenshots/notifs-1.png)

Pour plus de discrétion vous pouvez customiser l'image, le titre et le contenu de la notification

[![](https://raw.githubusercontent.com/dvp-io/AnoCheat/master/.github/screenshots/notifs-2.png)](https://raw.githubusercontent.com/dvp-io/AnoCheat/master/.github/screenshots/notifs-2.png)

**Afin d'éviter tout problème lors du clic, la notification ne redirige pas vers l'onglet du chat, une option sera prochainement disponible.**


## Fonctionalités retirées

- Bouton d'upload : Implémenté depuis la version 3.0.2 du chat
- Double-clic (réponse à un message) : Implémenté depuis la version 3.0.1 du chat
