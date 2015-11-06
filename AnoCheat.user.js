// ==UserScript==
// @name          AnoCheat - DVP I/O
// @author        Antoine 'Gecko' Pous <gecko@dvp.io>
// @licence       LGPL v3
// @description   Framework permettant les interactions avec le client natif
// @include       http://chat.developpez.com
// @include       http://chat.developpez.com/
// @include       http://chat.dvp.io
// @include       http://chat.dvp.io/
// @include       http://87.98.168.209
// @include       http://87.98.168.209/
// @include       http://149.202.80.151
// @include       http://149.202.80.151/
// @version       2.1.2
// @downloadURL   https://raw.githubusercontent.com/dvp-io/AnoCheat/master/AnoCheat.user.js
// @updateURL     https://raw.githubusercontent.com/dvp-io/AnoCheat/master/AnoCheat.user.js
// @website       http://dvp.io
// @grant         GM_notification
// @grant         GM_info
// @grant         GM_getRessources
// @run-at        document-idle
// ==/UserScript==

// Test de la version du chat
if(version !== '3.0.1') {
   alert("Ce script ne supporte pas la version actuelle du chat, veuillez mettre le script à jour");
	throw new Error("Ce script ne supporte pas la version actuelle du chat, veuillez mettre le script à jour");
}

AC_version = GM_info.script.version;

// Si le bouton est déjà présent on est certainement face au bug qui duplique les instances des scripts et on coupe l'execution
if(document.getElementById('dvpio_button') !== null) {
  throw new Error("Le script est déjà chargé, execution de cette instance stoppée");
}

// Générateur d'UUID
function AC_UUID(){var x=(new Date).getTime(),e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var r=(x+16*Math.random())%16|0;return x=Math.floor(x/16),("x"==e?r:3&r|8).toString(16)});return e}

/* Ajoute un CSS
 * @param css string Source CSS
 */
AC_cssAdd = function(css) {
  try {
    style = document.getElementById('anocheat_css');
    style.innerHTML += css;
  } catch (e) {
    style = document.createElement("style");
    style.id = 'anocheat_css';
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    document.head.appendChild(style);
  }
};

// On ajoute le CSS pour le menu
AC_cssAdd('#dvpio_button,#dvpio_menu li img{vertical-align:middle}#dvpio_menu{position:absolute;bottom:25px;border:1px solid #05679a;margin:0 0 7px;text-align:left;z-index:1000;border-radius:3px;padding:5px;width:auto;background-color:#fff}#dvpio_menu li{list-style-type:none;background-color:#fff;width:100%;color:#05679a;cursor:pointer}#dvpio_menu li img{width:16px;height:16px;margin-right:3px}#dvpio_menu li:hover{color:#E42420}/*#dvpio_menu li:hover:after{content:attr(data-tooltip);color:#000;position:absolute;left:210px;white-space:nowrap;cursor:pointer;font-size:10pt;border:1px solid #475E8C;border-radius:3px;padding:3px;background-color:#E1E1E2;line-height:23px}*/');

// On déclare les variables
var require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"events":[function(require,module,exports){function EventEmitter(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function isFunction(e){return"function"==typeof e}function isNumber(e){return"number"==typeof e}function isObject(e){return"object"==typeof e&&null!==e}function isUndefined(e){return void 0===e}module.exports=EventEmitter,EventEmitter.EventEmitter=EventEmitter,EventEmitter.prototype._events=void 0,EventEmitter.prototype._maxListeners=void 0,EventEmitter.defaultMaxListeners=10,EventEmitter.prototype.setMaxListeners=function(e){if(!isNumber(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},EventEmitter.prototype.emit=function(e){var t,n,s,i,r,o;if(this._events||(this._events={}),"error"===e&&(!this._events.error||isObject(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;throw TypeError('Uncaught, unspecified "error" event.')}if(n=this._events[e],isUndefined(n))return!1;if(isFunction(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:for(s=arguments.length,i=new Array(s-1),r=1;s>r;r++)i[r-1]=arguments[r];n.apply(this,i)}else if(isObject(n)){for(s=arguments.length,i=new Array(s-1),r=1;s>r;r++)i[r-1]=arguments[r];for(o=n.slice(),s=o.length,r=0;s>r;r++)o[r].apply(this,i)}return!0},EventEmitter.prototype.addListener=function(e,t){var n;if(!isFunction(t))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,isFunction(t.listener)?t.listener:t),this._events[e]?isObject(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,isObject(this._events[e])&&!this._events[e].warned){var n;n=isUndefined(this._maxListeners)?EventEmitter.defaultMaxListeners:this._maxListeners,n&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())}return this},EventEmitter.prototype.on=EventEmitter.prototype.addListener,EventEmitter.prototype.once=function(e,t){function n(){this.removeListener(e,n),s||(s=!0,t.apply(this,arguments))}if(!isFunction(t))throw TypeError("listener must be a function");var s=!1;return n.listener=t,this.on(e,n),this},EventEmitter.prototype.removeListener=function(e,t){var n,s,i,r;if(!isFunction(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],i=n.length,s=-1,n===t||isFunction(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(isObject(n)){for(r=i;r-->0;)if(n[r]===t||n[r].listener&&n[r].listener===t){s=r;break}if(0>s)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(s,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},EventEmitter.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],isFunction(n))this.removeListener(e,n);else for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},EventEmitter.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?isFunction(this._events[e])?[this._events[e]]:this._events[e].slice():[]},EventEmitter.listenerCount=function(e,t){var n;return n=e._events&&e._events[t]?isFunction(e._events[t])?1:e._events[t].length:0};},{}]},{},[]);

var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter,
    toolBar = document.getElementById('barreOutils'),
    colorPicker = document.getElementById('selecteurCouleur'),
    menu_logo = 'http://media.dvp.io/anocheat/19x20_logo_dvpio.png',
    AC_debug = 1,
    LStorage,
    WSocket = supportsWebSockets = 'WebSocket' in window || 'MozWebSocket' in window,
    WSOnline = false,
    getPosition = function getPosition(e){var t=0,n=0;if(!e)var e=window.event;return e.pageX||e.pageY?(t=e.pageX,n=e.pageY):(e.clientX||e.clientY)&&(t=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,n=e.clientY+document.body.scrollTop+document.documentElement.scrollTop),{x:t,y:n}},
    ws;

// Ecoute un événement
AC_on = function(name, callback) {
  event.on('AC_' + name, callback);
};

// Emet un événement
AC_emit = function(name, data) {
  var eventID;
  event.emit('AC_' + name, data);
  return eventID;
};

// Création du menu vide
dvpioMenu = document.createElement('ul');
dvpioMenu.id = 'dvpio_menu';
dvpioMenu.style.display = 'none';
dvpioMenu.addEventListener('mouseleave', function() {
  dvpioMenu.style.display = 'none';
});

/* Ajoute un menu
 * @param name string Nom du menu
 * @param tooltip string Description du menu
 * @param callback function Callback appelé au clic sur le menu
 */
AC_menuAdd = function(name, tooltip, callback) {
  var li = document.createElement('li');
  li.innerHTML = name;
  li.setAttribute('title', tooltip);
  li.addEventListener('click', callback);
  dvpioMenu.insertBefore(li, dvpioMenu.firstChild);
};

// Ajout de div#dvpio_log
dlog = document.createElement('div');
dlog.id = 'dvpio_log';
dlog.style.display = 'none';
document.body.appendChild(dlog);

// Ajout du CSS pour div#dvpio_log et div#dvpio_log p
AC_cssAdd('#dvpio_log,#dvpio_log div:not(:last-child){border-bottom:1px solid #ACBFCB}#dvpio_log{position:absolute;left:0;top:37px;width:75%;overflow:scroll;overflow-x:hidden;align:left;padding:2px 0;border-right:1px solid #ACBFCB;background-color:snow;height:98px}#dvpio_log div{margin:0;line-height:16px}#dvpio_log div span{padding-left:20px}#dvpio_log div.error span{color:red;background:url(https://raw.githubusercontent.com/dvp-io/AnoCheat/master/styles/img/error.png) no-repeat}#dvpio_log div.warning span{color:orange;background:url(https://raw.githubusercontent.com/dvp-io/AnoCheat/master/styles/img/warn.png) no-repeat}#dvpio_log div.notice span{background:url(https://raw.githubusercontent.com/dvp-io/AnoCheat/master/styles/img/info.png) no-repeat;color:#0074cd}#dvpio_log div.success span{background:url(https://raw.githubusercontent.com/dvp-io/AnoCheat/master/styles/img/success.png) no-repeat;color:green}');

/* Ajoute une ligne dans les logs de l'utilisateur
 * @param type string Type du log (notice|warning|error)
 * @param msg string Message
 */
AC_logAdd = function(type, message) {
  if(['error','warning','notice','success'].indexOf(type) === -1) {
    throw new Error("Le type de log est invalide, les choix possibles sont error|warning|notice|success");
  }
  var logDate = new Date();
      logTime = (logDate.getHours()<10?'0':'') + logDate.getHours() + ':' + (logDate.getMinutes()<10?'0':'') + logDate.getMinutes();
  slog = document.createElement('span');
  slog.innerHTML = message;
  plog = document.createElement('div');
  plog.id = logDate.getTime();
  plog.className = type;
  plog.innerHTML = logTime + ' ';
  plog.appendChild(slog);
  dlog.insertBefore(plog, dlog.firstChild);
};

// Détermine si le local storage est disponible
try {
  localStorage.setItem('AC', 'AC');
  localStorage.removeItem('AC');
  LStorage = true;
} catch(e) {
  LStorage = false;
  AC_logAdd('warning', 'Le LocalStorage semble indisponible, les configurations par défaut des modules seront utilisées');
}

if(LStorage) {
  AC_configRead = function(name) {
    return JSON.parse(localStorage.getItem(name));
  };
  AC_configWrite = function(name, json) {
    return localStorage.setItem(name, JSON.stringify(json));
  };
} else {
  // Si le localStorage est indisponible on retourne undefined
  AC_configRead = function(name) { return undefined; };
  AC_configWrite = function(name, json) { return undefined; };
}

/* Ajoute un bouton
 * @param name string Nom du menu
 * @param callback function Callback appelé au clic sur le bouton
 * @param after string Id du bouton précédant le nouveau bouton
 */
AC_buttonAdd = function(name, callback, opt) {
  button = document.createElement('input');
  button.type = 'button';
  button.value = name;
  button.className = 'bouton';
  button.addEventListener('click', callback);
  if(typeof opt === "object") {
    if(typeof opt.after === "string") {
      var el = document.getElementById(opt.after);
      el.parentNode.insertBefore(button, el.nextSibling);
      el.parentNode.insertBefore(document.createTextNode("\n"), el.nextSibling);
    } else {
      var el = document.getElementById(opt.before);
      el.parentNode.insertBefore(button, el);
      el.parentNode.insertBefore(document.createTextNode("\n"), el);
    }
  } else {
    toolBar.appendChild(button);
  }
};

// Création du bouton (image)
dvpioBtn = document.createElement('img');
dvpioBtn.id = 'dvpio_button';
dvpioBtn.setAttribute('src', menu_logo);
dvpioBtn.setAttribute('alt', 'I/O');
dvpioBtn.addEventListener('click', function(e) {
  if(dvpioMenu.style.display === "none") {
    var pos = getPosition(e);
    dvpioMenu.style.display = 'block';
    dvpioMenu.style.left = pos.x + "px";
    //dvpioMenu.style.top = pos.y + "px";
    return;
  }
  dvpioMenu.style.display = 'none';
});

// Menu pour afficher/masquer les logs
AC_menuAdd('Afficher les logs', "Permet de visualiser les logs relatifs à l'AnoCheat et aux modules", function() {
  if(dvpio_log.style.display === "none") {
    this.innerHTML = 'Masquer les logs';
    dvpio_log.style.display = 'block';
    return;
  }
  this.innerHTML = 'Afficher les logs';
  dvpio_log.style.display = 'none';
});

// Lien vers le projet
AC_menuAdd('Sources du projet', "N'hésitez pas à participer!", function() {
  window.open('https://github.com/dvp-io/AnoCheat/blob/master/README.md', '_blank');
});

// Lien vers le tracker
AC_menuAdd('Signaler un bug, faire une suggestion', "N'hésitez pas à signaler les bug ou proposer vos idées d'amélioration ;)", function() {
  window.open('https://github.com/dvp-io/AnoCheat#bug-et-suggestions', '_blank');
});

// Injection du menu
colorPicker.parentNode.insertBefore(dvpioMenu, colorPicker);
colorPicker.parentNode.insertBefore(dvpioBtn, colorPicker);

// Ajout de l'entrée du log pour le chargement du framework
AC_logAdd('success',"Framework AnoCheat v" + AC_version + " chargé");
