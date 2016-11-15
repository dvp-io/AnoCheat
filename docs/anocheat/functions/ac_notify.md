# Méthodes AC_notify
Les méthodes `AC_notify*` vous permettent d'interagir avec l'utilisateur sans que ce soit vu des autres clients. Tout se passe en local,
ce qui veut dire que vous pouvez facilement utiliser ces méthodes pour donner des résultats exclusivement au client.

## AC_notify
Vous pouvez notifier l'utilisateur directement dans la conversation active du chat.

**Paramètres :**
- type ([string](#)) notice|success|warning|error
- msg ([string](#)) Message HTML à afficher

```Javascript
AC_notify('success', 'Ma première notification! \o/');
```

## AC_notifyBrowser
Vous pouvez envoyer une notification au navigateur, si ce dernier est configuré pour l'accepter alors il enverra une notification système.

**Paramètres :**
- title ([string](#)) Titre de la notification
- msg ([string](#)) Message à afficher

```Javascript
AC_notifyBrowser('success', 'Ma première notification! \o/');
```
