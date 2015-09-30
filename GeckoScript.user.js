// ==UserScript==
// @name          GeckoScript - DVP I/O
// @author        Antoine 'Gecko' Pous <gecko@dvp.io>
// @licence       LGPL v3
// @description   Script ajoutant des fonctionalités à l'AnoChat, nécessite l'AnoCheat pour fonctionner
// @include       http://chat.developpez.com
// @include       http://chat.developpez.com/
// @include       http://46.105.99.98
// @include       http://46.105.99.98/
// @version       2.0.3
// @downloadURL   https://raw.githubusercontent.com/dvp-io/AnoCheat/master/GeckoScript.user.js
// @updateURL     https://raw.githubusercontent.com/dvp-io/AnoCheat/master/GeckoScript.user.js
// @website       http://dvp.io
// @grant         GM_info
// @run-at        document-idle
// ==/UserScript==

if(AC_version !== '2.0.2') {
  alert("Ce script ne supporte pas la version actuelle de l'AnoCheat, veuillez mettre le framework et le script à jour");
  throw new Error("Ce script ne supporte pas la version actuelle de l'AnoCheat, veuillez mettre le framework et le script à jour");
}

if(version !== '3.0.0') {
  alert("Ce script ne supporte pas la version actuelle du chat, veuillez mettre le script à jour");
  throw new Error("Ce script ne supporte pas la version actuelle du chat, veuillez mettre le script à jour");
}

// Ajout de l'entrée du log pour le chargement du script
AC_logAdd('success',"GeckoScript v" + GM_info.script.version + " chargé");

/* Mode mono ultime
 * Permet d'avoir un vrai mode mono sur le chat
 */

AC_addStyle('.mono,.mono :not(.ui-dialog-titlebar-close):not(.fermeture):not(#quitterChat):not(.icone):not(#reduireListe){color:#000!important;background:#fff!important;text-shadow:none!important;box-shadow:0 0!important;border-color:#000!important}.mono * .ongletActivite{border-style:dotted!important}.mono * .ongletActivite table:first-child{font-style:italic!important}.mono * .ongletMessage{border-style:dashed!important}.mono * .ongletMessage table:first-child{text-decoration:underline!important}.mono * #quitterChat,.mono * #reduireListe,.mono * .fermeture,.mono * .icone,.mono * .ui-dialog-titlebar-close,.mono * img,.mono img{-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);filter:gray;-webkit-filter:grayscale(100%)}.mono * .ColorPickerDivSample{display:none!important}');
AC_buttonAdd('Mono', function() {

  // Si le mode mono est actif  
  if(document.body.classList.contains('mono')) {
    this.style.textDecoration = 'none';     // On retire la rature
    document.body.classList.remove('mono'); // On désactive le mono
    focusZoneSaisie();
    return;  
  }

  // Si le mode mono n'est pas actif
  this.style.textDecoration = 'line-through'; // On ajoute la rature
  document.body.classList.add('mono');        // On désactive le mono
  focusZoneSaisie();
  return;
});

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
    if(e.ctrlKey || e.metaKey) {
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
