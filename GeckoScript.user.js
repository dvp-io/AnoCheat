// ==UserScript==
// @name          GeckoScript - DVP I/O
// @author        Antoine 'Gecko' Pous <gecko@dvp.io>
// @licence       LGPL v3
// @description   Script ajoutant des fonctionalités à l'AnoChat, nécessite l'AnoCheat pour fonctionner
// @include       http://chat.developpez.com
// @include       http://chat.developpez.com/
// @include       http://87.98.168.209
// @include       http://87.98.168.209/
// @include       http://chat.dvp.io
// @include       http://chat.dvp.io/
// @version       2.4.0
// @downloadURL   https://raw.githubusercontent.com/dvp-io/AnoCheat/master/GeckoScript.user.js
// @updateURL     https://raw.githubusercontent.com/dvp-io/AnoCheat/master/GeckoScript.user.js
// @website       http://dvp.io
// @grant         GM_info
// @run-at        document-idle
// ==/UserScript==

if(AC_version !== '2.3.0') {
  err = "Ce script ne supporte pas la version actuelle de l'AnoCheat, veuillez mettre le framework et le script à jour";
  alert(err);
  throw new Error(err);
}

if(version !== '3.0.3') {
  err = "Ce script ne supporte pas la version actuelle du chat, veuillez mettre le script à jour";
  alert(err);
  throw new Error(err);
}

// Ajout de l'entrée du log pour le chargement du script
AC_logAdd('success',"GeckoScript v" + GM_info.script.version + " chargé");

$("#barreOnglets").sortable({ revert: false, axis: 'x' });

// Nouveau color picker
$(".ColorPickerDivSample").replaceWith($("<input />").attr({type:"color",id:"geckolor",style:"height: 22px;width: 20px;border: 1px solid #CCC;background: linear-gradient(to bottom, #fcfcfc 0%,#e0e0e0 100%);border-radius: 12px;"}).val(couleurInitiale));

$('#geckolor').on('change', function(e) {
  envoyerCommande('/COLOR ' +$(this).val());
  focusZoneSaisie();
});

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

// rend le BBCode JOIN compatible avec l'auto complétion
GS_bbJoin = function(m, p1, offset, str) {
  return "[JOIN]" + p1.trim() + "[/JOIN]";
};

// Méthode de déclaration d'un nouveau style
GS_styleAdd = function(cls, name, css) {
  $('<option />').attr('value',cls).text(name).appendTo('#dvpio_style');
  AC_cssAdd(css);
};

var GS_back = {};
var GS_iback = {};

function GS_getNextMsg(room) {

  // Si on à aucun histo pour ce salon on ne fait rien
  if(typeof GS_back[room] === "undefined" || GS_back[room].length === 0) {
    return false;
  }

  // Si on à pas de pointeur ou qu'on est au bout du rouleau
  if(typeof GS_iback[room] === "undefined" || ++GS_iback[room] === GS_back[room].length) {
    GS_iback[room] = 0;
  }

  // Si le message existe bien
  if(typeof GS_back[room][GS_iback[room]] !== "undefined") {
    // On injecte le message dans la zone de saisie
    $("#zoneSaisie").val(GS_back[room][GS_iback[room]]);
  }
}

function GS_getPrevMsg(room) {

  // Si on à aucun histo pour ce salon on ne fait rien
  if(typeof GS_back[room] === "undefined" || GS_back[room].length === 0) {
    return false;
  }

  // Si on à pas de pointeur ou qu'on est au bout du rouleau
  if(typeof GS_iback[room] === "undefined" || --GS_iback[room] < 0) {
    GS_iback[room] = GS_back[room].length -1;
  }

  // Si le message existe bien
  if(typeof GS_back[room][GS_iback[room]] !== "undefined") {
    // On injecte le message dans la zone de saisie
    $("#zoneSaisie").val(GS_back[room][GS_iback[room]]);
  }
}

function GS_setBack(room, msg) {
  if(typeof GS_back[room] === 'undefined') {
    GS_back[room] = [];
  }
  GS_back[room].unshift(msg);
}



// Ajout des styles validés
GS_styleAdd('monochrome', 'Monochrome','.monochrome,.monochrome :not(.ui-dialog-titlebar-close):not(.fermeture):not(#quitterChat):not(.icone):not(#reduireListe):not(#boutonMenuChat):not(.horodatage):not(.cocheInvisible){color:#000!important;background:#fff!important;text-shadow:none!important;box-shadow:0 0!important;border-color:#000!important}.monochrome * .ongletActivite{border-style:dotted!important}.monochrome * .ongletActivite table:first-child{font-style:italic!important}.monochrome * .ongletMessage{border-style:dashed!important}.monochrome * .ongletMessage table:first-child{text-decoration:underline!important}.monochrome * #boutonMenuChat,.monochrome * #quitterChat,.monochrome * #reduireListe,.monochrome * .fermeture,.monochrome * .horodatage,.monochrome * .icone,.monochrome * .ui-dialog-titlebar-close,.monochrome * img,.monochrome img{-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);filter:gray;-webkit-filter:grayscale(100%)}.monochrome * .ColorPickerDivSample{display:none!important}.monochrome * .elementcomplsel{text-decoration:underline}.monochrome #menuChat a:hover,.monochrome #menuConversation a:hover,.monochrome #menuUtilisateur a:hover{text-decoration:underline;border-radius:initial}.monochrome #menuChat,.monochrome #menuConversation,.monochrome #menuUtilisateur{border:1px solid #000}.monochrome #menuChat * span.cocheInvisible{color:#fff}.monochrome * .titreCadre{border-top:1px solid;border-left:1px solid;border-right:1px solid}.monochrome * #barreStatut,.monochrome * .conversation{border-top:1px solid}');
GS_styleAdd('console', 'Console', '.console,.console :not(.ui-dialog-titlebar-close):not(.fermeture):not(#quitterChat):not(.icone):not(#reduireListe):not(#boutonMenuChat):not(.horodatage):not(.cocheInvisible){color:#fff!important;background:#000!important;text-shadow:none!important;box-shadow:0 0!important;border-color:#fff!important}.console * .ongletActivite{border-style:dotted!important}.console * .ongletActivite table:first-child{font-style:italic!important}.console * .ongletMessage{border-style:dashed!important}.console * .ongletMessage table:first-child{text-decoration:underline!important}.console * #boutonMenuChat,.console * #quitterChat,.console * #reduireListe,.console * .fermeture,.console * .horodatage,.console * .icone,.console * .ui-dialog-titlebar-close,.console * img,.console img{-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);filter:gray;-webkit-filter:grayscale(100%)}.console * .ColorPickerDivSample{display:none!important}.console * .elementcomplsel{text-decoration:underline}.console #menuChat a:hover,.console #menuConversation a:hover,.console #menuUtilisateur a:hover{text-decoration:underline;border-radius:initial}.console #menuChat,.console #menuConversation,.console #menuUtilisateur{border:1px solid #fff}.console #menuChat * span.cocheInvisible{color:#000}.console * .titreCadre{border-top:1px solid;border-left:1px solid;border-right:1px solid}.console * #barreStatut,.console * .conversation{border-top:1px solid}');
GS_styleAdd('magicGecko', 'Magic Gecko', '@-moz-keyframes magicGecko{from{background-position:top left}to{background-position:top right}}@-webkit-keyframes magicGecko{from{background-position:top left}to{background-position:top right}}@-o-keyframes magicGecko{from{background-position:top left}to{background-position:top right}}@-ms-keyframes magicGecko{from{background-position:top left}to{background-position:top right}}@-khtml-keyframes magicGecko{from{background-position:top left}to{background-position:top right}}@keyframes magicGecko{from{background-position:top left}to{background-position:top right}}.magicGecko * a.nomSalon,.magicGecko * a.nomSalon:hover,.magicGecko * input,.magicGecko * input:hover{background-image:-webkit-linear-gradient(left,red,orange,#ff0,green,#00f,indigo,violet,indigo,#00f,green,#ff0,orange,red);background-image:-moz-linear-gradient(left,red,orange,#ff0,green,#00f,indigo,violet,indigo,#00f,green,#ff0,orange,red);background-image:-o-linear-gradient(left,red,orange,#ff0,green,#00f,indigo,violet,indigo,#00f,green,#ff0,orange,red);background-image:-ms-linear-gradient(left,red,orange,#ff0,green,#00f,indigo,violet,indigo,#00f,green,#ff0,orange,red);background-image:-khtml-linear-gradient(left,red,orange,#ff0,green,#00f,indigo,violet,indigo,#00f,green,#ff0,orange,red);background-image:linear-gradient(left,red,orange,#ff0,green,#00f,indigo,violet,indigo,#00f,green,#ff0,orange,red);animation:magicGecko .5s forwards linear infinite;background-size:50% auto;-webkit-background-clip:text;-moz-background-clip:text;-o-background-clip:text;-ms-background-clip:text;-khtml-background-clip:text;background-clip:text;color:transparent!important}');

/* Réponse optimisée
 * Permet de répondre à un message en double cliquant dessus
 */
document.querySelector('#conversations').addEventListener('dblclick', function(e) {

  // Si on est sur un id `msg(\d+)`
  if(e.target.parentElement.id !== "" && /^msg(\d+)/.test(e.target.parentElement.id)) {

    var zs = document.getElementById('zoneSaisie'),
      tid = e.target.parentElement.id,
      msg = e.target.parentElement.innerText !== undefined ? e.target.parentElement.innerText : e.target.parentElement.textContent;

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
document.addEventListener("DOMSubtreeModified", function(e) {

  var target = e.target || e.srcElement;

}, false);

// Binds
document.addEventListener('keydown', function(e) {
  var charCode = e.which || e.keyCode;
  $roomID = $('.conversation:visible').attr('id');

  if(e.altKey && charCode === 40) {
    if($('#zoneSaisie').is(':visible')) { masquerBas(); } else { afficherBas(); }
  }

  if(e.altKey && charCode === 39) {
    if($('#connectes').is(':visible')) { masquerDroite(); } else { afficherDroite(); }
  }

  if(e.shiftKey && charCode === 38 && $('#zoneSaisie').is(':focus')) {
    GS_getPrevMsg($roomID);
  }

  if(e.shiftKey && charCode === 40 && $('#zoneSaisie').is(':focus')) {
    GS_getNextMsg($roomID);
  }

});

$("#zoneSaisie").preBind("keydown", function (e) {

  var charCode = e.which || e.keyCode;
  $zoneSaisieData = $(this).val();
  $roomID = $('.conversation:visible').attr('id');

  // Clean le bbcode JOIN pour être compatible avec l'autocompletion
  $(this).val($zoneSaisieData.replace(/\[join\](?:\s|)(.*)(?:\s|)\[\/join\]/i, GS_bbJoin));

  if(charCode === 13) {

    if($zoneSaisieData !== '') {
      GS_setBack($roomID, $zoneSaisieData);
    }

  }
});


