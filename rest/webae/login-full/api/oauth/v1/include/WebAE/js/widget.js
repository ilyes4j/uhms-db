// constantes
var url_script=link_serveur_netentreprise+'/auth/MAG/widget';
var action=link_serveur_netentreprise+'/auth/MAG/widget/validation';
var verification=link_serveur_netentreprise+'/auth/MAG/widget/verification';
var acces_oubli_mdp=link_serveur_netentreprise+'/auth/start';

var nomJeton='jtd';

// libelles
var label_siret='Siret';
var label_nom='Nom';
var label_prenom='Prénom';
var label_mdp='Mot de passe';
var label_connexion='CONNEXION';
var label_mdp_help='Cliquez ici.';

// fonctions.js
	
function getTargetUrl(idWidget, url_script, path){
	var js_element = document.getElementById(idWidget);
	var widget_url = js_element.src.substring(0,js_element.src.indexOf(url_script));
	var widget_action = widget_url+path;
	return widget_action;
}

function createForm(id, path, params, method, clazz) {
   	var method = method || "post"; // Set method to post by default if not specified.
    var form = document.createElement("form");
    form.setAttribute("id", id);
    form.setAttribute("action", path);
    form.setAttribute("method", method);
    if (clazz) form.setAttribute("class", clazz);
    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
         }
    }
    return form;
}

function addInput(form, name, type, value, placeholder, clazz){
	var input = document.createElement("input");
    input.setAttribute("name", name);
    input.setAttribute("type", type);
    if (value) input.setAttribute("value", value);
    if (clazz) input.setAttribute("class", clazz);
    if (placeholder){
	    var onfocus = function(){if(this.value==placeholder){this.value='';}};
		var onblur = function(){if(this.value==''){this.value=placeholder;}};
    	input.onfocus = onfocus;
    	input.onblur = onblur;
    }
    form.appendChild(input);
    return input;
}

function addLabel(form, name, value, clazz){
    var label = document.createElement("label");
    label.setAttribute("for", name);
    if (clazz) label.setAttribute("class", clazz);
    label.innerHTML = value;
    form.appendChild(label);
    return label;
}

function parseQuery(query) {
	var ret = {};
	var params = query.split('&');
	for (var i = 0; i < params.length; i++) {
		var param = params[i].split('=');
		ret[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || '');
	}
	return ret;
}// acteur-non-connecte.js

function loadWidget(idWidget){
	document.addEventListener('DOMContentLoaded', function loadWidget(event){
		var form = createForm(idWidget + '_widget', getTargetUrl(idWidget, url_script,
				action), window[idWidget]);
		
		var div = document.createElement('div');
		div.setAttribute("class", 'row-siret');
		addLabel(div, 'siret', label_siret, null);
		addInput(div, 'siret', 'text', null, null);
		form.appendChild(div);
		
		div = document.createElement('div');
		div.setAttribute("class", 'row-nom');
		addLabel(div, 'nom', label_nom, null);
		addInput(div, 'nom', 'text', null, null);
		form.appendChild(div);
		
		div = document.createElement('div');
		div.setAttribute("class", 'row-prenom');
		addLabel(div, 'prenom', label_prenom, null);
		addInput(div, 'prenom', 'text', null, null);
		form.appendChild(div);
		
		div = document.createElement('div');
		div.setAttribute("class", 'row-password');
		addLabel(div, 'password', label_mdp, null);
		addInput(div, 'password', 'password', null, null);
		form.appendChild(div);
		
		div = document.createElement('div');
		div.setAttribute("class", 'row-submit');
		addInput(div, 'valider', 'submit', label_connexion, null);
		form.appendChild(div);
		
		document.getElementById(idWidget+'_container').appendChild(form);
	}, false);
}
loadWidget('widget_MAG');