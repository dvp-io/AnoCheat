# Méthodes AC_log
Un petit gestionnaire de logs est disponible afin d'indiquer les erreurs au client. Vous pouvez choisir
entre différents états afin de typer le message à afficher.

Vous pouvez utiliser du code HTML au sein de ce message.

# AC_lodAdd
Ajouter une entrée dans le log est assez rapide, il vous suffit de déterminer quel type de message envoyer et le contenu du message.

**Paramètres :**
- type ([string](#)) error|warning|success|notice
- msg ([string](#)) Le message à afficher, HTML autorisé

```Javascript
AC_logAdd('notice', 'Coucou <b>' + pseudo + '</b>');
```

Affichera ceci : ![AC_logAdd](./img/AC_logAdd.png)