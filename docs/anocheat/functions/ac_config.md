# Méthodes AC_config
L'AnoCheat dispose d'un gestionnaire de configuration standardisé qui vous permet de stocker des informations
relatives à vos fonctionalités en toute simplicité.

Le système utilisera le meilleur endroit à sa disposition, ces lieux sont (par ordre de priorité) :
- [Le LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage)
- [Les cookies](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
- [Un objet JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)

**Important :** La configuration n'est pas persistante si le LocalStorage et les cookies ne sont pas disponibles.

## Lire la configuration
Pour lire la configuration il vous suffit d'indiquer le nom de votre module.

**Paramètres : **
- **name** ([string](#)) Nom du module

**Retours :**
- ([JSON object](#)) Données stockées
- ([null](#)) Aucune données trouvées

```Javascript
AC_configRead('notifier'); // Retourne un objet JSON {} ou null
```

## Supprimer la configuration
La suppression de la configuration est définitive et irréversible, elle consiste à effacer l'intégralité des données pour un module.

**Paramètres :**
- **name** ([string](#)) Nom du module

```Javascript
AC_configRemove('notifier'); // La configuration est désormais nulle
```

## Enregistrer/Editer la configuration
L'enregistrement d'une configuration peut être total ou partiel, de plus cette méthode peut faire référence à `AC_configRemove` si 
l'objet passé en paramètre est vide. Vous pouvez également supprimer une clé en la laissant vide.

**Paramètres :**
- **name** ([string](#)) Nom du module
- **data** ([JSON object](#)) Données à écrire/modifier/supprimer

```Javascript
// Ecriture simple
AC_configWrite('notifier', {playSound: false, soundName: 'Bleep'}); // Stocke l'objet tel quel

// Ecraser une valeur
AC_configWrite('notifier', {playSound: true}); // La configuration est désormais {playSound: true, soundName: 'Bleep'}

// Supprimer une valeur
AC_configWrite('notifier', {soundName: ''}); // La configuration est désormais {playSound: true}

// Supprimer l'ensemble des données
AC_configWrite('notifier', {}); // La configuration est désormais nulle
```