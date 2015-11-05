// ==UserScript==
// @name          GeckoScript - DVP I/O
// @author        Antoine 'Gecko' Pous <gecko@dvp.io>
// @licence       LGPL v3
// @description   Script ajoutant des fonctionalités à l'AnoChat, nécessite l'AnoCheat pour fonctionner
// @include       http://chat.developpez.com
// @include       http://chat.developpez.com/
// @include       http://87.98.168.209
// @include       http://87.98.168.209/
// @include       http://149.202.80.151
// @include       http://149.202.80.151/
// @include       http://chat.dvp.io
// @include       http://chat.dvp.io/
// @version       2.3.2
// @downloadURL   https://raw.githubusercontent.com/dvp-io/AnoCheat/master/GeckoScript.user.js
// @updateURL     https://raw.githubusercontent.com/dvp-io/AnoCheat/master/GeckoScript.user.js
// @website       http://dvp.io
// @grant         GM_info
// @run-at        document-idle
// ==/UserScript==

if(AC_version !== '2.1.1') {
  alert("Ce script ne supporte pas la version actuelle de l'AnoCheat, veuillez mettre le framework et le script à jour");
  throw new Error("Ce script ne supporte pas la version actuelle de l'AnoCheat, veuillez mettre le framework et le script à jour");
}

if(version !== '3.0.1') {
  alert("Ce script ne supporte pas la version actuelle du chat, veuillez mettre le script à jour");
  throw new Error("Ce script ne supporte pas la version actuelle du chat, veuillez mettre le script à jour");
}

// Ajout de l'entrée du log pour le chargement du script
AC_logAdd('success',"GeckoScript v" + GM_info.script.version + " chargé");

// Création du sélecteur de style
AC_cssAdd('#dvpio_style{margin:0 5px;}');
$('<select />').attr('id','dvpio_style').insertBefore('#selecteurCouleur').on('change', function() {
  if(optionsChat.indexOf('M') > -1) {
    envoyerCommande('/mode -m');
  }
  var modeC = optionsChat.indexOf('C') > -1 ? ' compact ' : ' ';
  var cls = this.value === '-1' ? 'fondblanc' + modeC : modeC + this.value;
  $('body').attr('class', cls);
  AC_logAdd('notice', 'Style `' + this.options[this.selectedIndex].text + '` sélectionné');
});

// Ajout du choix par défaut
$('<option />').attr('value','-1').text('AnoChat v3').appendTo('#dvpio_style');

// Méthode de déclaration d'un nouveau style
GS_styleAdd = function(cls, name, css) {
  $('<option />').attr('value',cls).text(name).appendTo('#dvpio_style');
  AC_cssAdd(css);
};

// Ajout des styles validés
GS_styleAdd('monochrome', 'Monochrome','.monochrome,.monochrome :not(.ui-dialog-titlebar-close):not(.fermeture):not(#quitterChat):not(.icone):not(#reduireListe):not(#boutonMenuChat):not(.horodatage):not(.cocheInvisible){color:#000!important;background:#fff!important;text-shadow:none!important;box-shadow:0 0!important;border-color:#000!important}.monochrome * .ongletActivite{border-style:dotted!important}.monochrome * .ongletActivite table:first-child{font-style:italic!important}.monochrome * .ongletMessage{border-style:dashed!important}.monochrome * .ongletMessage table:first-child{text-decoration:underline!important}.monochrome * #boutonMenuChat,.monochrome * #quitterChat,.monochrome * #reduireListe,.monochrome * .fermeture,.monochrome * .horodatage,.monochrome * .icone,.monochrome * .ui-dialog-titlebar-close,.monochrome * img,.monochrome img{-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);filter:gray;-webkit-filter:grayscale(100%)}.monochrome * .ColorPickerDivSample{display:none!important}.monochrome * .elementcomplsel{text-decoration:underline}.monochrome #menuChat a:hover,.monochrome #menuConversation a:hover,.monochrome #menuUtilisateur a:hover{text-decoration:underline;border-radius:initial}.monochrome #menuChat,.monochrome #menuConversation,.monochrome #menuUtilisateur{border:1px solid #000}.monochrome #menuChat * span.cocheInvisible{color:#fff}.monochrome * .titreCadre{border-top:1px solid;border-left:1px solid;border-right:1px solid}.monochrome * #barreStatut,.monochrome * .conversation{border-top:1px solid}');
GS_styleAdd('console', 'Console', '.console,.console :not(.ui-dialog-titlebar-close):not(.fermeture):not(#quitterChat):not(.icone):not(#reduireListe):not(#boutonMenuChat):not(.horodatage):not(.cocheInvisible){color:#fff!important;background:#000!important;text-shadow:none!important;box-shadow:0 0!important;border-color:#fff!important}.console * .ongletActivite{border-style:dotted!important}.console * .ongletActivite table:first-child{font-style:italic!important}.console * .ongletMessage{border-style:dashed!important}.console * .ongletMessage table:first-child{text-decoration:underline!important}.console * #boutonMenuChat,.console * #quitterChat,.console * #reduireListe,.console * .fermeture,.console * .horodatage,.console * .icone,.console * .ui-dialog-titlebar-close,.console * img,.console img{-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);filter:gray;-webkit-filter:grayscale(100%)}.console * .ColorPickerDivSample{display:none!important}.console * .elementcomplsel{text-decoration:underline}.console #menuChat a:hover,.console #menuConversation a:hover,.console #menuUtilisateur a:hover{text-decoration:underline;border-radius:initial}.console #menuChat,.console #menuConversation,.console #menuUtilisateur{border:1px solid #fff}.console #menuChat * span.cocheInvisible{color:#000}.console * .titreCadre{border-top:1px solid;border-left:1px solid;border-right:1px solid}.console * #barreStatut,.console * .conversation{border-top:1px solid}');

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
    
    // Si shift est pressé on envoie une alerte aux modérateurs
    if(e.shiftKey) {
      zs.value = "/ALERT [@" + tid + "][QUOTE]" + msg;
      focusZoneSaisie();
      return;
    }

    // Si alt est pressé on supprime le message
    if(e.altKey) {
      supprimer(tid);
      return;
    }

  }
});

// On écoute la modification du DOM
document.addEventListener("DOMSubtreeModified", function(ev) {

  /* Drag & drop onglets
   * Permet de réorganiser les onglets de conversation dans l'ordre voulu
   */
  if(ev.srcElement.id == "barreOnglets") {
    $(".onglet:not(#onglet0)").draggable({addClasses: false, containment: "parent", axis:"x", obstacle: ".onglet"});
  }

}, false);

// Binds
document.addEventListener('keydown', function(e) {
  var charCode = e.which || e.keyCode;

  if(e.altKey) {

    if(charCode === 40) {
      if($('#zoneSaisie').is(':visible')) { masquerBas(); } else { afficherBas(); }
    }

    if(charCode === 39) {
      if($('#connectes').is(':visible')) { masquerDroite(); } else { afficherDroite(); }
    }

  }

});

