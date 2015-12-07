# Méthodes AC_notify
Les méthodes `AC_notify*` vous permettent d'interagir avec l'utilisateur sans que ce soit vu des autres clients. Tout se passe en local,
ce qui veut dire que vous pouvez facilement utiliser ces méthodes pour donner des résultats exclusivement au client.

## AC_notifyClient
Vous pouvez notifier l'utilisateur directement dans la conversation active du chat.

**Paramètres :**
- type ([string](#)) notice|success|warning|error
- msg ([string](#)) Message HTML à afficher

```Javascript
AC_notifyClient('success', 'Ma première notification! \o/');
```

## Notifier l'utilisateur via le browser

**Non implémenté**