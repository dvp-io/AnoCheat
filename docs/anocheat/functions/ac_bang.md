# Méthodes AC_bang
Le framework intègre un gestionnaire de commandes (bangs) qui permet d'analyser et
interpréter des commandes complexes avant l'envoi au serveur.

Ainsi vous pouvez envoyer le résultat de la requête au lieu d'afficher la requête publiquement et de
laisser chaque client l'interpréter. Cela évite également de diffuser un rendu différent chez ceux qui n'ont pas
installés votre script.

# AC_bangAdd
La création d'un bang est relativement simple, il vous suffit de déclarer son nom et le callback, le bang sera alors 
ajouté à l'autocomplétion. Les données reçues par le callback proviennent de l'analyse du message soumis.

**Paramètres :**
- bang ([string](#)) Nom du bang, insensible à la casse
- callback ([function](#)) Fonction anonyme executée lors de l'appel

Data contient différentes données :
- **cmd** Commande du chat
- **targets** Membre(s) ciblé(s)
- **bang** Le nom du bang (sans les !!)
- **query** Le reste de la requête

```Javascript
AC_bangAdd('Gecko', function(data) {
  console.log(data);
});
```

Désormais quand on envoie un message contenant !!Gecko la console affichera les données extraites.