// ==UserScript==
// @name          GeckoScript - DVP I/O
// @author        Antoine 'Gecko' Pous <gecko@dvp.io>
// @licence       LGPL v3
// @description   Script ajoutant des fonctionalités à l'AnoChat, nécessite l'AnoCheat pour fonctionner
// @include       http://chat.developpez.com
// @include       http://chat.developpez.com/
// @include       http://46.105.99.98
// @include       http://46.105.99.98/
// @version       2.0.0
// @downloadURL   https://raw.githubusercontent.com/dvp-io/AnoCheat/master/GeckoScript.user.js
// @updateURL     https://raw.githubusercontent.com/dvp-io/AnoCheat/master/GeckoScript.user.js
// @website       http://dvp.io
// @run-at        document-idle
// ==/UserScript==

if(AC_version !== '2.0.0') {
  alert("Ce script ne supporte pas la version actuelle de l'AnoCheat, veuillez mettre le framework et le script à jour");
  throw new Error("Ce script ne supporte pas la version actuelle de l'AnoCheat, veuillez mettre le framework et le script à jour");
}

if(version !== '3.0.0') {
  alert("Ce script ne supporte pas la version actuelle du chat, veuillez mettre le script à jour");
  throw new Error("Ce script ne supporte pas la version actuelle du chat, veuillez mettre le script à jour");
}

/* Réponse optimisée
 * Permet de répondre à un message en double cliquant dessus
 */
document.querySelector('#conversations').addEventListener('dblclick', function(e) {
  
  // Si on est sur un id `msg(\d+)`
  if(e.target.parentElement.id !== "" && /^msg(\d+)/.test(e.target.parentElement.id)) {
    
    var zs = document.getElementById('zoneSaisie'),
      tid = e.target.parentElement.id, 
      msg = e.target.parentElement.innerText != undefined ? e.target.parentElement.innerText : e.target.parentElement.textContent;
    
    // Si ctrl est pressé on cite le message
    if(e.ctrlKey) {
      zs.value = zs.value + "[QUOTE]" + msg;
      focusZoneSaisie();
      return;
    }
    
    // Si shhift est préssé on envoie une alerte aux modérateurs
    if(e.shiftKey) {
      zs.value = "/ALERT [@" + tid + "] " + msg;
      focusZoneSaisie();
      return;
    }

    // Si alt est pressé on supprime le message
    if(e.altKey) {
      supprimer(tid);
      return;
    }

    // Sinon c'est une réponse au message
    zs.value = "[@" + tid + "] " + zs.value;
    focusZoneSaisie();
    return;
  }
});
