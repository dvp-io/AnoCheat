// ==UserScript==
// @name          GeckoScript - DVP I/O
// @author        Antoine 'Gecko' Pous <gecko@dvp.io>
// @licence       LGPL v3
// @description   Script ajoutant des fonctionalités à l'AnoChat, nécessite l'AnoCheat pour fonctionner
// @include       http://chat.developpez.com
// @include       http://chat.developpez.com/
// @include       http://chat.dvp.io
// @include       http://chat.dvp.io/
// @include       http://87.98.168.209
// @include       http://87.98.168.209/
// @include       http://178.32.150.5
// @include       http://178.32.150.5/
// @include       http://5.196.237.44
// @include       http://5.196.237.44/
// @include       http://5.135.21.60
// @include       http://5.135.21.60/
// @version       2.7.0
// @downloadURL   https://raw.githubusercontent.com/dvp-io/AnoCheat/master/GeckoScript.user.js
// @updateURL     https://raw.githubusercontent.com/dvp-io/AnoCheat/master/GeckoScript.user.js
// @website       http://dvp.io
// @grant         GM_info
// @run-at        document-idle
// ==/UserScript==

if(AC_version !== '2.5.1') {
  err = "GeckoScript ne supporte pas la version actuelle de l'AnoCheat, veuillez mettre le framework et le script à jour";
  alert(err);
  throw new Error(err);
}

if(version !== '3.0.3') {
  err = "GeckoScript ne supporte pas la version actuelle du chat, veuillez mettre le script à jour";
  alert(err);
  throw new Error(err);
}

GS_version = GM_info.script.version;

// Ajout de l'entrée du log pour le chargement du script
AC_logAdd('success',"GeckoScript v" + GM_info.script.version + " chargé");

// Préconfiguration des notifications, inactives par défaut
// sound = son sélectionné | sys = notification visuelle 0/1 | img = image custom pour la notif | msg = message custom pour la notif | title = titre custom pour la notif
if(!AC_configRead('GSNotificationsCenter')) {
  AC_configWrite('GSNotificationsCenter', {
    "userDice":{"sound":"","sys":0,"hide":0,"img":"","title":"","msg":""},
    "userLost":{"sound":"","sys":0,"hide":0,"img":"","title":"","msg":""},
    "userQuit":{"sound":"","sys":0,"hide":0,"img":"","title":"","msg":""},
    "userConn":{"sound":"","sys":0,"hide":0,"img":"","title":"","msg":""},
    "userReco":{"sound":"","sys":0,"hide":0,"img":"","title":"","msg":""},
    "userLeave":{"sound":"","sys":0,"hide":0,"img":"","title":"","msg":""},
    "userEnter":{"sound":"","sys":0,"hide":0,"img":"","title":"","msg":""},
    "msgPrivate":{"sound":"","sys":0,"img":"","title":"","msg":""},
    "msgHL":{"sound":"","sys":0,"img":"","title":"","msg":""},
    "msgNotice":{"sound":"","sys":0,"img":"","title":"","msg":""},
    "msgAnswer":{"sound":"","sys":0,"img":"","title":"","msg":""},
    "sysAlert":{"sound":"","sys":0,"img":"","title":"","msg":""},
    "sysWarn":{"sound":"","sys":0,"img":"","title":"","msg":""},
    "logSuccess":{"sound":"","sys":0,"img":"","title":"","msg":""},
    "logNotice":{"sound":"","sys":0,"img":"","title":"","msg":""},
    "logWarning":{"sound":"","sys":0,"img":"","title":"","msg":""},
    "logError":{"sound":"","sys":0,"img":"","title":"","msg":""}
  });
  AC_logAdd('warning', 'Chargement de la configuration par défaut du module de notification');
}

$("#barreOnglets").sortable({ revert: false, axis: 'x' });

// Nouveau color picker
$(".ColorPickerDivSample").replaceWith($("<input />").attr({type:"color",id:"geckolor",style:"height: 22px;width: 20px;border: 1px solid #CCC;background: linear-gradient(to bottom, #fcfcfc 0%,#e0e0e0 100%);border-radius: 12px;"}).val(couleurInitiale));

$('#geckolor').on('change', function(e) {
  var _color = $(this).val();
  envoyerCommande('/COLOR ' + _color);
  AC_logAdd('notice', 'Sélection de la couleur <span style="color:' + _color + ';">' + _color + '</span>');
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
  focusZoneSaisie();
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

$('body').append('<div id="GSUINC" style="height:247px;width:auto;min-height:0" class="ui-dialog-content ui-widget-content" scrolltop="0" scrollleft="0"><img src="/smileys/14405-e714.jpg" width="50" height="50" data-image="P" style="float:right"><p> Bienvenue dans le centre de notifications. <br /> Ici vous pouvez gérer de manière avancée les notifications du chat. <br /><br /><i><a href="https://github.com/dvp-io/AnoCheat/issues" title="Accéder au tracker" target="_blank">Si vous rencontrez un bug ou pour toute suggestion ouvrez un ticket sur le tracker du projet, merci !</a></i></p><form id="GSUINCForm"><p> Type de notification à configurer : <select id="GSUINCType" name="type"><option selected disabled>--- Faites un choix ---</option><optgroup label="Système"><option value="sysAlert">Alerte</option><option value="sysWarn">Avertissement reçu</option></optgroup><optgroup label="Messages"><option value="msgPrivate">MP reçu</option><option value="msgHL">HL reçu</option><option value="msgNotice">Notice reçue</option><option value="msgAnswer">Réponse reçue</option></optgroup><optgroup label="Notifications salon"><option value="userDice">Dice</option><option value="userConn">Connexion</option><option value="userQuit">Déconnexion</option><option value="userReco">Reconnexion</option><option value="userLost">Connexion perdue</option><option value="userLeave">Quitte le salon</option><option value="userEnter">Entre dans le salon</option></optgroup><optgroup label="Logs des scripts" disabled><option value="logSuccess">Success</option><option value="logNotice">Info</option><option value="logSuccess">Warning</option><option value="logError">Error</option></optgroup></select></p><fieldset><legend><input type="checkbox" name="sys"> Notification système</legend><i>Ces notifications permettent d\'être notifié même quand un autre logiciel est au premier plan.</i><p> Titre personnalisé <input type="text" name="title" disabled><br /><i><small>Le titre personnalisé vous permet de rendre la notification plus discrète.</small></i></p><p> Message personnalisé <input type="text" name="msg" disabled><br /><i><small>Le message personnalisé vous permet de rendre la notification plus discrète.</small></i></p><p> Image personnalisée (url ou base64) <input type="text" name="img" disabled><br /><i><small>L\'image personnalisée vous permet de rendre la notification plus discrète. Si vous êtes derrière un proxy, privilégiez l\'utilisation du base64 du fichier.</small></i></p></fieldset><fieldset><legend><input type="checkbox" name="hide" disabled> Masquer la notification dans le salon (<span style="color:red">Actuellement indisponible</span>)</legend><i>Cette option permet de masquer les notifications directement dans le salon, ne fonctionne que pour les notifications du groupe <b>Notifications salon.</b></i><p> Comment masquer la notification: <select disabled><option selected>Toujours masquer</option><option>N\'afficher que la dernière notification de ce type</option><option>N\'afficher que la dernière notification de l\'utilisateur</option></select></p></fieldset><fieldset><legend><input type="checkbox" name="snd"> Notification sonore</legend><i>Permet de jouer un son lors de la notification</i><p> Son émis : <select name="sound"></select><br /><i><small>Pour ajouter un son rendez-vous dans le gestionnaire de sons ;o</small></i></p></fieldset><p style="text-align:center"><button id="GSUINCTest" class="bouton" type="button">Tester</button>&nbsp;<button id="GSUINCReg" class="bouton boutonalt" type="button">Enregistrer</button></p></form></div>');
$('#GSUINC').dialog({ autoOpen: false, open: function() {
    AC_UIReset('#GSUINCForm');
    $('#GSUINCForm select[name="sound"]').find('option').remove();
    $.each(AC_soundLibrary, function(name, obj) {
        $('#GSUINCForm select[name="sound"]').append(
            $('<option />').text(name).attr({"value": name})
        );
    });
}, title: "Centre de notifications", resizable: false, width: 707, height: 740});
AC_menuAdd('Centre de notifications', 'Gérez facilement vos notifications', function() { $('#GSUINC').dialog("open"); });

$('#GSUINCType').on('change', function() {

  var type = $(this).find('option:selected').val();
  var name = $(this).find('option:selected').text();
  var cfg = AC_configRead('GSNotificationsCenter')[type];

  $('b.GSUINCType').text(name);
  $('#GSUINCForm input[name="title"]').val(cfg.title);
  $('#GSUINCForm input[name="msg"]').val(cfg.msg);
  $('#GSUINCForm input[name="img"]').val(cfg.img);

  if(typeof cfg.sys !== "undefined") {
    $('#GSUINCForm input[name="sys"]').on('change', function() {
      if($(this).is(':checked')) {
        $('#GSUINCForm input[name="title"], #GSUINCForm input[name="msg"], #GSUINCForm input[name="img"]').attr({"disabled": false});
      } else {
        $('#GSUINCForm input[name="title"], #GSUINCForm input[name="msg"], #GSUINCForm input[name="img"]').attr({"disabled": true});
      }
    });
  }
  $('#GSUINCForm input[name="sys"]').attr('checked', cfg.sys === 1).trigger("change");

  var soundSelected = cfg.sound !== "" ? cfg.sound : "Beep";
  $('#GSUINCForm select[name="sound"] option[value="' + soundSelected + '"]').attr({"selected": true});
  $('#GSUINCForm input[name="snd"]').attr({"checked": cfg.sound !== "" });
  $('#GSUINCForm input[name="snd"]').on('change', function() {
      if($(this).is(':checked')) {
        $('#GSUINCForm select[name="sound"]').attr({"disabled": false});
      } else {
        $('#GSUINCForm select[name="sound"]').attr({"disabled": true});
      }
  });
  $('#GSUINCForm input[name="snd"]').attr('checked', cfg.sound !== "").trigger("change");

  /*var $elHide = $('#GSUINCForm input[name="hide"]');
  if(typeof cfg.hide === 'undefined') {
    $elHide.attr({"checked": false, "disabled": true});
  } else {
    $elHide.attr({"checked": (cfg.hide > 0), "disabled": false });
  }*/

});

// Quand on enregistre la nouvelle configuration
$('#GSUINCReg').on('click', function() {
  var newCfg = $('#GSUINCForm').serializeJSON();
  var type = $('#GSUINCType').find('option:selected').val();
  var cfg = AC_configRead('GSNotificationsCenter');
  var name = $('#GSUINCType').find('option:selected').text();

  cfg[type].sys = newCfg.sys && newCfg.sys === "on" ? 1 : 0;
  cfg[type].img = newCfg.img;
  cfg[type].title = newCfg.title;
  cfg[type].msg = newCfg.msg;
  cfg[type].sound = newCfg.snd && newCfg.snd === "on" ? newCfg.sound : "";
  AC_configWrite('GSNotificationsCenter', cfg);
  AC_notifyBrowser({"title": "Centre de notifications", "msg": name + "\nConfiguration enregistrée", "img": null});
  focusZoneSaisie();
});

// Quand on lance un live test
$('#GSUINCTest').on('click', function() {
  var cfg = $('#GSUINCForm').serializeJSON();

  if(cfg.sys)
    AC_notifyBrowser({"title": cfg.title || 'Titre notification', "msg": cfg.msg || 'Contenu de la notification', "img": cfg.img || null});

  if(cfg.snd)
    AC_soundPlay($('#GSUINCForm select[name="sound"]').find('option:selected').val());

 focusZoneSaisie();
});

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

// on écoute les réponses AJAX
$(document).ajaxComplete(function(event, xhr, settings){

  if(settings.url == 'ajax.php') {

    var data = $.parseJSON(xhr.responseText);

    // Si on est sur un MP
    if(data.pvs.length > 0) {

      $.each(data.pvs, function(i, pm) {

        var $html = $(pm.html);
        var msg = $html.find('span.contenu').text();
        var tab = '#onglet' + pm.id;
        var cfg = {"notifs": AC_configRead('GSNotificationsCenter')};

        if(pm.id === '-1') {

          if(pm.html.match(/(\[Alerte aux modérateurs\])/gi)) {
            AC_notifyBrowser('Alerte modération', msg);
          } else if(!msg.startWith('[' + pseudo + ']') && !msg.startWith('[ ' + pseudo + ']') && !msg.startWith('[' + pseudo + ' ]')) {

            if(cfg.notifs.msgPrivate.sys === 1)
              AC_notifyBrowser({"title": cfg.notifs.msgPrivate.title || "@", "msg": cfg.notifs.msgPrivate.msg || msg, "img": cfg.notifs.msgPrivate.img || null});

            if(cfg.notifs.msgPrivate.sound !== "")
              AC_soundPlay(cfg.notifs.msgPrivate.sound);
          }

        } else {

          if(!msg.startWith('[' + pseudo + ']') && !msg.startWith('[ ' + pseudo + ']') && !msg.startWith('[' + pseudo + ' ]')) {

            if(cfg.notifs.msgPrivate.sys === 1)
              AC_notifyBrowser({"title": cfg.notifs.msgPrivate.title || "Message privé reçu", "msg": cfg.notifs.msgPrivate.msg || msg, "img": cfg.notifs.msgPrivate.img || null});

            if(cfg.notifs.msgPrivate.sound !== "")
              AC_soundPlay(cfg.notifs.msgPrivate.sound);
          }

        }

      });

    }

    if(data.salon.length > 0) {

      $.each($(data.salon), function(i, div) {

        var msg = $(div).find('span.contenu').text();
        var sys = $(div).find('span.notification').text();
        var art = $(div).find('span.alerte').text();
        var adv = $(div).find('span.avertissement').text();
        var not = $(div).find('span.notice').text();
        var ind = $(div).find('span.indicateur').text();

        var cfg = {"notifs": AC_configRead('GSNotificationsCenter')};

        if(sys.length > 0) {

          var userLost = sys.match(/([a-z0-9\s_-]+)\sa\squitté\sle\sChat\s\(Ne\ssemble\splus\sconnecté\(e\)\)./im);
          var userQuit = sys.match(/([a-z0-9\s_-]+)\sa\squitté\sle\sChat\s\(Sortie\)./im);
          var userConn = sys.match(/([a-z0-9\s_-]+)\sa\srejoint\sle\sChat./im);
          var userReco = sys.match(/([a-z0-9\s_-]+)\sa\srejoint\sle\sChat\s\(Reconnexion\sautomatique\)./im);
          var userLeave = sys.match(/([a-z0-9\s_-]+)\sest\sallé\(e\)\sdans\sun\sautre\ssalon./im);
          var userEnter = sys.match(/([a-z0-9_]+)\sa\srejoint\sle\ssalon\s\[(.*)\]./im);
          var userDice = sys.match(/([a-z0-9_]+)\sa\slancé\sun\sd([0-9]+). Résultat : ([0-9]+)./im);

          if(userLost) {

            $("#" + div.id).addClass('GSuserLost AC' + userLost[1].hash());

            if(cfg.notifs.userLost.sys === 1)
              AC_notifyBrowser({"title": cfg.notifs.userLost.title || userLost[1], "msg": cfg.notifs.userLost.msg || 'Connexion perdue', "img": cfg.notifs.userLost.img || null});

            if(cfg.notifs.userLost.sound !== "")
              AC_soundPlay(cfg.notifs.userLost.sound);
          }

          if(userQuit) {

            $("#" + div.id).addClass('GSuserQuit AC' + userQuit[1].hash());

            if(cfg.notifs.userQuit.sys === 1)
              AC_notifyBrowser({"title": cfg.notifs.userQuit.title || userQuit[1], "msg": cfg.notifs.userQuit.msg || 'Déconnecté(e)', "img": cfg.notifs.userQuit.img || null});

            if(cfg.notifs.userQuit.sound !== "")
              AC_soundPlay(cfg.notifs.userQuit.sound);
          }

          if(userReco) {

            $("#" + div.id).addClass('GSuserReco AC' + userReco[1].hash());

            if(cfg.notifs.userReco.sys === 1)
              AC_notifyBrowser({"title": cfg.notifs.userReco.title || userReco[1], "msg": cfg.notifs.userReco.msg || 'Reconnecté(e)', "img": cfg.notifs.userReco.img || null});

            if(cfg.notifs.userReco.sound !== "")
              AC_soundPlay(cfg.notifs.userReco.sound);

          } else if(userConn) {

            $("#" + div.id).addClass('GSuserConn AC' + userConn[1].hash());

            if(cfg.notifs.userConn.sys === 1)
              AC_notifyBrowser({"title": cfg.notifs.userConn.title || userConn[1], "msg": cfg.notifs.userConn.msg || 'Connecté(e)', "img": cfg.notifs.userConn.img || null});

            if(cfg.notifs.userConn.sound !== "")
              AC_soundPlay(cfg.notifs.userConn.sound);
          }

          if(userLeave) {

            $("#" + div.id).addClass('GSuserLeave AC' + userLeave[1].hash());

            if(cfg.notifs.userLeave.sys === 1)
              AC_notifyBrowser({"title": cfg.notifs.userLeave.title || userLeave[1], "msg": cfg.notifs.userLeave.msg || 'A quitté le salon', "img": cfg.notifs.userLeave.img || null});

            if(cfg.notifs.userLeave.sound !== "")
              AC_soundPlay(cfg.notifs.userLeave.sound);
          }

          if(userEnter) {

            $("#" + div.id).addClass('GSuserEnter AC' + userEnter[1].hash());

            if(cfg.notifs.userEnter.sys === 1)
              AC_notifyBrowser({"title": cfg.notifs.userEnter.title || userEnter[1], "msg": cfg.notifs.userEnter.msg || 'A rejoint le salon', "img": cfg.notifs.userEnter.img || null});

            if(cfg.notifs.userEnter.sound !== "")
              AC_soundPlay(cfg.notifs.userEnter.sound);
          }

          if(userDice) {

            $("#" + div.id).addClass('GSuserDice AC' + userDice[1].hash());

            if(cfg.notifs.userDice.sys === 1)
              AC_notifyBrowser({"title": cfg.notifs.userDice.title || userDice[1] + " a lancé un d" + userDice[2], "msg": cfg.notifs.userDice.msg || "Résultat: "+userDice[3], "img": cfg.notifs.userDice.img || null});

            if(cfg.notifs.userDice.sound !== "")
              AC_soundPlay(cfg.notifs.userDice.sound);
          }


        } else if(art.length > 0) {

          if(cfg.notifs.sysAlert.sys === 1)
            AC_notifyBrowser({"title": cfg.notifs.sysAlert.title || 'Alerte salon', "msg": cfg.notifs.sysAlert.msg || art, "img": cfg.notifs.sysAlert.img || null});

          if(cfg.notifs.sysAlert.sound !== "")
            AC_soundPlay(cfg.notifs.sysAlert.sound);

        } else if(not === "Notice reçue :") {

          if(cfg.notifs.msgNotice.sys === 1)
            AC_notifyBrowser({"title": cfg.notifs.msgNotice.title || 'Notice reçue', "msg": cfg.notifs.msgNotice.msg || msg, "img": cfg.notifs.msgNotice.img || null});

          if(cfg.notifs.msgNotice.sound !== "")
            AC_soundPlay(cfg.notifs.msgNotice.sound);

        } else if(adv.length > 0) {

          if(cfg.notifs.sysWarn.sys === 1)
            AC_notifyBrowser({"title": cfg.notifs.sysWarn.title || 'Avertissement reçu', "msg": cfg.notifs.sysWarn.msg || adv, "img": cfg.notifs.sysWarn.img || null});

          if(cfg.notifs.sysWarn.sound !== "")
            AC_soundPlay(cfg.notifs.sysWarn.sound);

        } else if(ind === "◆") {

          if(cfg.notifs.msgHL.sys === 1)
            AC_notifyBrowser({"title": cfg.notifs.msgHL.title || 'HL reçu', "msg": cfg.notifs.msgHL.msg || msg, "img": cfg.notifs.msgHL.img || null});

          if(cfg.notifs.msgHL.sound !== "")
            AC_soundPlay(cfg.notifs.msgHL.sound);

        } else if(ind === "◈") {

          if(cfg.notifs.msgAnswer.sys === 1)
            AC_notifyBrowser({"title": cfg.notifs.msgAnswer.title || 'Réponse reçue', "msg": cfg.notifs.msgAnswer.msg || msg, "img": cfg.notifs.msgAnswer.img || null});

          if(cfg.notifs.msgAnswer.sound !== "")
            AC_soundPlay(cfg.notifs.msgAnswer.sound);

        }

      });

    }

    if(data.connectes.length > 0) {

      $("#geckolor").val(couleurInitiale);

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

  if((e.ctrlKey || e.metaKey) && charCode === 40) {
    if($('#zoneSaisie').is(':visible')) {
      masquerBas();
      AC_logAdd('notice', 'Zone de saisie masquée');
    } else {
      afficherBas();
      AC_logAdd('notice', 'Zone de saisie affichée');
    }
  }

  if(e.altKey && charCode === 39) {
    if($('#connectes').is(':visible')) {
      masquerDroite();
      AC_logAdd('notice', 'Liste des membres masquée');
    } else {
      afficherDroite();
      AC_logAdd('notice', 'Liste des membres affichée');
    }
  }

  if(e.altKey && charCode === 38 && $('#zoneSaisie').is(':focus')) {
    GS_getPrevMsg($roomID);
  }

  if(e.altKey && charCode === 40 && $('#zoneSaisie').is(':focus')) {
    GS_getNextMsg($roomID);
  }

});

$("#zoneSaisie").preBind("keydown", function (e) {

  var charCode = e.which || e.keyCode;
  $zoneSaisieData = $(this).val();
  $roomID = $('.conversation:visible').attr('id');

  if(charCode === 13) {

    if($zoneSaisieData !== '') {
      // Clean le bbcode JOIN pour être compatible avec l'autocompletion
      $(this).val($zoneSaisieData.replace(/\[join\](?:\s|)(.*)(?:\s|)\[\/join\]/i, GS_bbJoin));

      // On ajoute une entrée dans l'historique personnel
      GS_setBack($roomID, $zoneSaisieData);
    }

  }
});
