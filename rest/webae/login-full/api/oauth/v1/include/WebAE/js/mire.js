////////// Fonction générales //////////

// Contrôles de surface
var regexEmail = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9]{2,15}$");
var regexNNI = new RegExp("^[1-478][0-9]{5}[0-9AB][0-9]{6}$", 'i');
var regexEmailNNI = new RegExp("^([A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z0-9]{2,15}|[1-478][0-9]{5}[0-9AB][0-9]{6})$", 'i');
var regexSiret = new RegExp("^[0-9]{14}$");
var regexSiretFictif = new RegExp("^[a-zA-Z0-9]{10}$");
var regexMobile = new RegExp(/^0[67](\s?\d{2}){4}$/);
var regexCodePostal = new RegExp("^(([0-8][0-9])|(9[0-5]))[0-9]{3}$");
function inputTexteNonVide(element){
	if(typeof element != 'undefined' && typeof $(element).prop("value") != 'undefined' && $(element).prop("value").length>0)
		return true
	else
		return false
}

// Redirection
$.extend({
    redirectPost: function(location, args)
    {
    	var $form = $('<form/>', {
			"action": location,
			"method": "POST"
		})
    	$.each( args, function( key, value ) {
        	var $finput = $('<input/>', {
        		"type" : "hidden",
				"name": key,
				"value": value
			})
			$finput.appendTo($form)
	    });
    	$form.appendTo($(document.body)).submit();
    }
});

// Messages de succès / erreur
var listMessages = {
	"fr" : {
		"titre" : {
			"erreur" : "Une erreur est survenue",
			"modaleContact" : "Message envoyé avec succès",
			"modaleCreationCompte" : "Message envoyé avec succès",
			"modaleRenouvellementMDP" : "Renouvellement de mot de passe"
		},
		"texte" : {
			"erreur" :{
				"soumissionFormulaire" : "Une erreur est survenue lors de la soumission de votre demande.<br/> Veuillez nous excuser pour la gêne occasionnée.",
				"saisieFormulaire" : "Veuillez compléter ou modifier le(s) champ(s) en surbrillance",
        "verificationChamps" : "Veuillez vérifier les informations suivantes&nbsp;:",
       	"saisie" : {
          "nir" : {
            "format" : "Le champ \"N<sup>o</sup>&nbsp;de Sécurité sociale\" est composé de 13&nbsp;chiffres (sauf pour la Corse qui contient les lettres A ou B)."
          },
          "email" : {
            "format" : "Le champ \"Courriel\" doit respecter le format nom@domaine.fr."
          },
          "password" : {
            "format" : "Le champ \"Mot de passe\" doit être renseigné."
          },
          "email_nir" : {
            "format" : "Le champ \"Courriel ou N<sup>o</sup>&nbsp;de Sécurité sociale\" doit respecter le format nom@domaine.fr pour un courriel ou être composé de 13&nbsp;chiffres (sauf pour la Corse qui contient les lettres A ou B) pour un N<sup>o</sup>&nbsp;de Sécurité sociale."
          },
          "siret" : {
            "format" : "Le champ \"Siret\" est composé de 14&nbsp;caractères."
          }
        }
			},
			"ok" : "OK",
			"retour" : "Retour",
			"fermer" : "Fermer"

		}
	}
};
var messages = listMessages['fr'];

// Affichage de messages d'erreur pour le login WebAE
function afficherChampsErreursLogin(b,a){
  var c=b.attr("id");
  b.prepend('<div id="'+c+'-dialog-erreur" class="erreur mb-3 text-left d-none" role="alert"></div>');
  if(Object.keys(a).length>0){$("#"+c+"-dialog-erreur").append(messages.texte.erreur.verificationChamps+"<ul></ul>");
    $.each(a,function(e,f){var d=f.champ;b.find("[name='"+d+"']").addClass("is-invalid");
      $.each(f.messages,function(g,k){
        var j=d+"-erreur";
        if(g>0){j+="-"+(++g)}var l=$("<li/>").append($("<span/>",{id:j}).html(k));
        $("#"+c+"-dialog-erreur ul").append(l);var h="";
        if(typeof b.find("[name='"+d+"']").attr("aria-describedby")!="undefined"){h=b.find("[name='"+d+"']").attr("aria-describedby")+" "}b.find("[name='"+d+"']").attr("aria-describedby",h+j)})})}
  else{$("#"+c+"-dialog-erreur").append('<p class="m-0">'+messages.texte.erreur.soumissionFormulaire+"</p>")}
  $("#"+c+"-dialog-erreur").removeClass("d-none");
  $("html, body").animate({scrollTop:$("#"+c+"-dialog-erreur").offset().top},400);
  b.find("button[type='submit']").removeAttr("disabled")
};

// Affichage d'un message d'erreur dans la fenêtre modale de mot de passe oublié
function afficherErreurModal(b,a){
  var c=b.attr("id");
  b.find(".modal-body").prepend('<div id="'+c+'-dialog-erreur" class="erreur mb-3 text-left d-none" role="alert"></div>');
  $("#"+c+"-dialog-erreur").append('<p class="m-0">'+a+"</p>");
  $("#"+c+"-dialog-erreur").removeClass("d-none");
  $("#motDePasseOublie").animate({scrollTop:$("#"+c+"-dialog-erreur").offset().top - $("#motDePasseOublie .modal-dialog").offset().top},400);
  b.find("button[type='submit']").removeAttr("disabled")
};

// Affichage de messages d'erreur sur les champs dans la fenêtre modale de mot de passe oublié
function afficherChampsErreursModal(b,a){
  var c=b.attr("id");
  b.find(".modal-body").prepend('<div id="'+c+'-dialog-erreur" class="erreur mb-3 text-left d-none" role="alert"></div>');
  if(Object.keys(a).length>0){$("#"+c+"-dialog-erreur").append(messages.texte.erreur.verificationChamps+"<ul></ul>");
    $.each(a,function(e,f){var d=f.champ;b.find("[name='"+d+"']").addClass("is-invalid");
      $.each(f.messages,function(g,k){
        var j=d+"-erreur";
        if(g>0){j+="-"+(++g)}var l=$("<li/>").append($("<span/>",{id:j}).html(k));
        $("#"+c+"-dialog-erreur ul").append(l);var h="";
        if(typeof b.find("[name='"+d+"']").attr("aria-describedby")!="undefined"){h=b.find("[name='"+d+"']").attr("aria-describedby")+" "}b.find("[name='"+d+"']").attr("aria-describedby",h+j)})})}
  else{$("#"+c+"-dialog-erreur").append('<p class="m-0">'+messages.texte.erreur.soumissionFormulaire+"</p>")}
  $("#"+c+"-dialog-erreur").removeClass("d-none");
  $("#motDePasseOublie").animate({scrollTop:$("#"+c+"-dialog-erreur").offset().top - $("#motDePasseOublie .modal-dialog").offset().top},400);
  b.find("button[type='submit']").removeAttr("disabled")
};

// Récupère la valeur d'un paramètre dans l'URL
function getUrlParam(key) {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
  var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

// Renvoi null si aucun errorCode n'est en paramètre, sinon renvoie le message d'erreur Net-Entreprises correspondant
function getErrorMsg(key) {
  var errorCode = getUrlParam('errorCode');
  if (errorCode == null) {
    return null;
  }
  if (errorCode == 'FE04') {
    return 'Une erreur est survenue sur l’authentification Net-Entreprises';
  } else if (errorCode == 'FE07') {
    return 'Echecs répétés. Votre compte Net-Entreprises est bloqué pour une courte durée';
  } else if (errorCode == 'FE08') {
    return 'Informations de connexion Net-Entreprise incorrectes';
  } else if (errorCode == 'FE09') {
    return 'Votre compte Net-Entreprises est en cours de suppression';
  } else if (errorCode == 'FE15') {
    return 'Utilisateur Net-Entreprises inconnu';
  } else if (errorCode == 'FE16') {
    return 'Votre inscription Net-entreprises est en cours, elle n’est pas encore validée';
  } else if (errorCode == 'FE17') {
    return 'L’adresse email Net-Entreprises n’a pas été validée';
  } else {
    return "Erreur inconnue";
  }
}

// Supprime les espaces en début et fin de champ texte
function supprimeEspaces(formulaire) {
  formulaire.find("input[type='text']").each(function() {
    $(this).val($(this).val().trim());
  });
}

// Pour l'accessibilité, ajoute "Erreur sur le formulaire" au début du titre de la page
function signaleErreurDansTitre() {
  $(document).attr("title", "Erreur sur le formulaire - " + $(document).attr("title"));
}


////////// Mire Net-Entreprises //////////
var widget_MAG = {};
widget_MAG['urlOK'] = widget_urlOk + "?redirect_uri=" + encodeURIComponent(getRedirectURI()) + extractNonce() + extractState();
widget_MAG['urlKO'] = widget_urlKo + "?redirect_uri=" + encodeURIComponent(getRedirectURI());
widget_MAG['nomJeton'] = 'jtd';
var urlpass = link_serveur_netentreprise+'/auth/start';

$(window).on('load', function() {
	if(typeof $('form#widget_MAG_widget') != 'undefined') {
		$('form#widget_MAG_widget').find('.row-siret input, .row-nom input, .row-prenom input, .row-password input').addClass('form-control rounded');
		$('#login_net-entreprises input[type=\'submit\']').addClass("btn").attr('value','Me connecter');
		$('<a href="'+urlpass+'">> Mot de passe oublié ?</a>').insertBefore('form#widget_MAG_widget .row-submit')
		$('form#widget_MAG_widget .row-submit').addClass('text-center').prepend("<button type=\"reset\" class=\"btn\" data-toggle=\"collapse\" data-target=\"#login_net-entreprises\" aria-controls=\"login_net-entreprises\" aria-expanded=\"false\" aria-label=\"Fermer le formulaire de connexion Net-Entreprises\">Annuler</button>");
	}

	// INTEGR_ARCHIMED : Gestion du cas netEntForm null (pb chargement MAG_widget)
	// Gestion du mode connecté
	var netEntForm = document.getElementById("widget_MAG_widget");
	if (netEntForm) {
		var nameElemName = netEntForm .elements[3].name;
		// si l'élément 4 est le bouton submit, l'internaute est connecté à Net-Entreprises
		if ( nameElemName =='valider') {
			// On redirige vers le tableau de bord
			// INTEGR_ARCHIMED : Redirection si deja connecte
			document.location.replace(widget_autoredirect);
		}
	} else {
		if (document.getElementById("widget_MAG_container")) {
			document.getElementById("widget_MAG_container").innerHTML = "Erreur lors du chargement pour Net-Entreprises";
			document.getElementById("widget_MAG_container").className = "erreur";
		}
	}
	
  // Gestion des erreurs
  var msgErreur = getErrorMsg();
  if ((getUrlParam('header') != 1) && (msgErreur != null)) {
    signaleErreurDansTitre();
    $('.bloc_net-entreprises .erreur').text(msgErreur).removeClass('d-none');
    $('#login_net-entreprises').one('shown.bs.collapse', function () {
      $("html, body").animate({scrollTop : $('.bloc_net-entreprises .erreur').offset().top}, 200);
    });
    $('#login_net-entreprises').collapse('show');
  }  
});

// INTEGR_ARCHIMED : Ajout Fonction extract RequestOrigin
// Extract requestOrigin
function getRequestOrigin() {
	console.log(" > requestOrigin ");
	if (window.location.href.indexOf('requestOrigin=') == -1) {
		if (window.location.search.substring(1) != '') {
			return escape(window.location.search.substring(1)).replace(new RegExp('\\+', 'g'), '%2B');
		}
		return "";
	}
	return window.location.href.substring(window.location.href.indexOf('requestOrigin=') + 'requestOrigin='.length);
}
// Patch requestOrigin pour RedirectURI avec Param
function getRequestOriginPatched() {
	var requestOrigin = getRequestOrigin();
	if (requestOrigin.indexOf("%26END%3DTRUE") != -1) {
		var redirectURI = requestOrigin.substring(
				requestOrigin.indexOf("%26redirect_uri%3D")+"%26redirect_uri%3D".length,
				requestOrigin.indexOf("%26END%3DTRUE")+"%26END%3DTRUE".length);
		requestOrigin = requestOrigin.replace(
				redirectURI, encodeURIComponent(redirectURI).replace("%2526END%253DTRUE", ""));
	}
	return requestOrigin;
}

// Extract redirectURI
function getRedirectURI() {
	var requestOrigin = getUrlParam("requestOrigin");
	if (requestOrigin) {
		var redirect_uri = new RegExp('[\?&#]redirect_uri=([^&#]*)').exec(requestOrigin);
		if (redirect_uri != null) {
			return redirect_uri[1];
		}
	}
	return window.location.href;
}

// Extract nonce
function extractNonce() {
	var requestOrigin = getUrlParam("requestOrigin");
	if (requestOrigin) {
		var nonce = new RegExp('[\?&#]nonce=([^&#]*)').exec(requestOrigin);
		if (nonce != null) {
			return "&nonce=" + nonce[1];
		}
	}
	return "";
}

//Extract state
function extractState() {
	var requestOrigin = getUrlParam("requestOrigin");
	if (requestOrigin) {
		var state = new RegExp('[\?&#]state=([^&#]*)').exec(requestOrigin);
		if (state != null) {
			return "&state=" + state[1];
		}
	}
	return "";
}

  
////////// Identification AMME //////////
$(function() {
	$("form#identification").submit(function(b) {
  b.preventDefault();
  $(this).find("button[type='submit']").attr("disabled", "disabled");
  $(this).find(".is-invalid").removeClass("is-invalid");
	$(this).find(".erreur").remove();
  $(this).find("input[aria-describedby]").removeAttr("aria-describedby");
  supprimeEspaces($(this));
  var erreurs = [];
  if (!regexEmailNNI.test($(this).find("input[name='identifiant']").val())) {
    var g = {};
    g.champ = "identifiant";
    g.messages = [messages.texte.erreur.saisie.email_nir.format];
    erreurs.push(g)
  }
  if (!inputTexteNonVide($(this).find("input[name='password']")[0])) {
    var g = {};
    g.champ = "password";
    g.messages = [messages.texte.erreur.saisie.password.format];
    erreurs.push(g)
  }
  if (erreurs.length == 0) {
	// INTEGR_ARCHIMED : Branchement Form Login
	$.ajax({
		type: 'POST',
		url: $(this).attr("action"),
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify({
			"username": $("#compte_id").val(),
			"password": $("#compte_mdp").val(),
			"requestOrigin": getRequestOriginPatched()
		}),
		complete: function (dataResult, status, response) {
			// Redirection
			var status = dataResult.responseJSON.status;
			if (status == "302") {
				console.log(" > status " + status);
				var redirect = dataResult.responseJSON.redirect;
				// Patch WEBAE en cas d'erreur
				var regexError = new RegExp("[?&]error=([^&]+)(&|$)");
				if (regexError.test(redirect)) {
					redirect = getRedirectURI() + "#" + redirect.substring(getRedirectURI().length+1);
				}
				console.log("redirect: " + redirect);
				// Redirection
				window.location.href = redirect;
				// Dans les autres cas, on reste sur la page courante
			} else {
				console.log(" > status " + status);
				var contentHtml = "Une erreur s'est produite.";
				if (dataResult && dataResult.responseJSON && dataResult.responseJSON.error) {
					contentHtml = dataResult.responseJSON.error;
				}
				console.log("erreur: " + contentHtml);
				// Affichage message erreur
				$.modalMaker({
					id: "identification-modal",
					modalClass: "modal-error",
					title: messages.titre.erreur,
					content: contentHtml,
					buttons: [{
						text: messages.texte.fermer,
						className: "btn-default",
						dismiss: true
					}]
				});
				$("form#identification").find("button[type='submit']").removeAttr("disabled");
			}
		}
	})
  } else {
    afficherChampsErreursLogin($(this), erreurs);
  }
  return false
	});
});
  
////////// Mot de passe oublié AMME //////////
$(function() {
	
	$("form#fcompte_nir_motDePassOublie").on('click','input[name=chckbmotDePassOublie]',function(){
		  if($(this).is(':checked'))
		  {
			document.getElementById('compte_nir_motDePassOublie').value = '';
		    document.getElementById('compte_nir_motDePassOublie').disabled = true;
		    var myForm = document.getElementById('motDePasseOublie'); 
		  //  clearValidation(myForm); 
		  }else{
			document.getElementById('compte_nir_motDePassOublie').disabled = false;
		  }
		});
	$("form.motDePasseOublie").submit(function(event){
		event.preventDefault();
		$(this).find("button[type='submit']").attr("disabled","disabled");
		$(this).find(".is-invalid").removeClass("is-invalid");
		$(this).find(".erreur").remove();
    $(this).find("input[aria-describedby]").removeAttr("aria-describedby");
    supprimeEspaces($(this));
    var erreurs = [];
      
    if (inputTexteNonVide($(this).find("input[name='Identifiant']"))){
    	var nni = $(this).find("input[name='Identifiant']").val();
    	if(!regexNNI.test(nni)){
    			erreur=true;
    			$(this).find("input[name='Identifiant']").addClass("is-invalid");
    			var g = {};
    		    g.champ = "Identifiant";
    		    g.messages = [messages.texte.erreur.saisie.nir.format];
    		    erreurs.push(g);
    	} else { }
    	
    }
   else{
	  if  (!( $('input[name=chckbmotDePassOublie]').is(':checked'))){
    		erreur=true;
    		$(this).find("input[name='Identifiant']").addClass("is-invalid");
    		 var g = {};
		     g.champ = "Identifiant";
		     g.messages = [messages.texte.erreur.saisie.nir.format];
		     erreurs.push(g);
     	} else { }
     	      
      
    }
    var email = $(this).find("input[name='Email']").val();
    if(!regexEmail.test(email)){
      $(this).find("input[name='Email']").addClass("is-invalid")
      var g = {};
      g.champ = "Email";
      g.messages = [messages.texte.erreur.saisie.email.format];
      erreurs.push(g)
    }
    if (erreurs.length == 0) {
      $.ajax({
        type: "POST",
            url: $(this).attr("action"),
            data: $(this).serialize(), // serializes the form's elements.
            dataType: "JSON",
            success: function(data){
                if(typeof data.status != 'undefined' && data.status==200){
                  $("form.motDePasseOublie .modal-body").prepend("<div class=\"alert alert-success\" role=\"alert\">"+data.message+"</div>")
                }else if(typeof data.status != 'undefined'){
                  afficherErreurModal($("form.motDePasseOublie"), data.message);
                }else{
                  afficherErreurModal($("form.motDePasseOublie"), messages.texte.erreur.soumissionFormulaire);
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
              afficherErreurModal($("form.motDePasseOublie"), messages.texte.erreur.soumissionFormulaire);
            }
      });
    }else{
      afficherChampsErreursModal($(this), erreurs);
    }
    return false;
	});
  
  // On réinitialise le formulaire à la fermture du popin
  $('#motDePasseOublie').on('hide.bs.modal', function (e) {
	$("form.motDePasseOublie button[type='submit']").removeAttr("disabled");
	$("form.motDePasseOublie input.is-invalid").removeClass("is-invalid");
    $("form.motDePasseOublie input[aria-describedby]").removeAttr("aria-describedby");
	$("form.motDePasseOublie .erreur").remove();
	$("form.motDePasseOublie .alert").remove();
    $("form.motDePasseOublie")[0].reset();      
  });
});

//////////CREATION COMPTE //////////
$(function() {
	$("form#creation").on('click','input[name=istherennimir]',function(){
		  if($(this).is(':checked'))
		  {
			document.getElementById("compte_nir").value = '';
		    document.getElementById('compte_nir').disabled = true;
		    document.getElementById("nniclefprev").value = '';
		    document.getElementById('nniclefprev').disabled = true;
		    var myForm = document.getElementById('creationCompte'); 
		  //  clearValidation(myForm); 
		  }else{
			document.getElementById('compte_nir').disabled = false;
		    document.getElementById('nniclefprev').disabled = false;
		  }
		});
	
	$("form#creation").on('click','input[name=istheresiretmir]',function(){
		  if($(this).is(':checked'))
		  {
			document.getElementById("compte_siret").value = '';
		    document.getElementById('compte_siret').disabled = true;
		    var myForm = document.getElementById('creationCompte'); 
		  //  clearValidation(myForm); 
		  }else{
			document.getElementById('compte_siret').disabled = false;
		  }
		});
	$("form#creation").submit(function(b) {
//		b.preventDefault();
		$(this).find("button[type='submit']").attr("disabled", "disabled");
		$(this).find(".is-invalid").removeClass("is-invalid");
		$(this).find(".erreur").remove();
		$(this).find("input[aria-describedby]").removeAttr("aria-describedby");
		supprimeEspaces($(this));
		var erreurs = [];
		
		if (inputTexteNonVide($(this).find("input[name='siret']"))){
		    	var siret = $(this).find("input[name='siret']").val();
		    	if(!regexSiret.test(siret)){
		    		var g = {};
					g.champ = "siret";
					g.messages = [messages.texte.erreur.saisie.siret.format];
					erreurs.push(g)
		    	} else {}
		    }
		   else{
			  if  (!( $('input[name=istheresiretmir]').is(':checked'))){
				  var g = {};
					g.champ = "siret";
					g.messages = ["Si vous avez un numéro Siret, merci de le renseigner"];
					erreurs.push(g);
		     	}
		    }
		
		 if (inputTexteNonVide($(this).find("input[name='nni']")) && inputTexteNonVide($(this).find("input[name='nniclefprev']"))){
		    	var nni = $(this).find("input[name='nni']").val();
		    	var nniclefprev = $(this).find("input[name='nniclefprev']").val();
		    	if(!regexNNI.test(nni)){
		    		var g = {};
					g.champ = "nni";
					g.messages = [messages.texte.erreur.saisie.nir.format];
					erreurs.push(g);
		    	} else if (! checkss(nni.concat(nniclefprev)) ){
	    			$(this).find("input[name='nniclefprev']").addClass("is-invalid");
	    			var g = {};
	    			g.champ = "nniclefprev";
					g.messages = ["Valeur de clef incorrecte "];
					erreurs.push(g);
		    	}
		    } else {
			  if  (!( $('input[name=istherennimir]').is(':checked'))){
					var g = {};
					g.champ = "nni";
					g.messages = ["Si vous avez un NNI, merci de le renseigner"];
					erreurs.push(g)
					$(this).find("input[name='nniclefprev']").addClass("is-invalid");
		     	} else {//cas siret existe (case a coche non coche) nni obligatoire
		     		  if  (!( $('input[name=istheresiretmir]').is(':checked'))){
		     			document.getElementById('compte_nir').disabled = false;
		     			document.getElementById('nniclefprev').disabled = false;
		     			document.getElementById('istherennimir').checked = false;
		     			var g = {};
						g.champ = "nni";
						g.messages = ["Vous avez saisi un numéro Siret, merci de saisir un NNI"];
						erreurs.push(g);
						$(this).find("input[name='nniclefprev']").addClass("is-invalid");
		     		  }
		     	}
		    }
		    
		if (erreurs.length == 0) {
//			window.location.href = $(this).attr("action");
			return true;
		} else {
			afficherChampsErreursLogin($(this), erreurs);
			return false;
		}
	});
});

/* contrôle num secu
*/ 
function checkss(enumss) 
{ 
var s7=enumss.substring(6,7) 
if ((s7 == "A") ||(s7 == "B")) 
    enumss=enumss.substring(0,6)+ "0" + enumss.substring(7,15); 
    var filter=/^\d{15}$/; 
if (!filter.test(enumss))  
return false ;
else 
{ 
    if ((enumss.substring(0,1) != "1") && (enumss.substring(0,1) != "2") ) return false;    
    var deb13=parseInt(enumss.substring(0,13)); 
    if (s7 == "A") deb13-=1000000; 
    if (s7 == "B") deb13-=2000000; 
// La Clé SS est égale au reste de la division par 97      
    var div97=97 - (deb13%97); 
    var sdiv97=String(div97); 
  
    if (enumss.substring(13,15) != sdiv97)  
    { 
        console.log("Clé Sécurité Sociale incorrecte devrait etre " + sdiv97); 
        return false; 
    }     
} 
return true;}

////////// Gestion de l'autocompétion pour la recherche //////////
function rechercheResultats (searchString, listbox) {

	var results = [];

	if(searchString.length>=3){

	  var waitingResult = false;

	  $.ajax({
			url: "https://www.autoentrepreneur.urssaf.fr/portail/accueil.autocompleteAction.do",
			dataType: "json",
			async: true,
			data :{
				q: searchString,
				removeDuplicatePropValues: true,
				propertyMatchRegexp: searchString
			},
			success: function(data) {
				waitingResult=false;

				var RESULTATS = data;
				for (var i = 0; i < RESULTATS.length; i++) {
		    	    var resultat = RESULTATS[i].toLowerCase();
		    	    var posChaine = resultat.indexOf(searchString.toLowerCase());
		    	    if (posChaine >= 0) {
		    	      results.push('<span>'+RESULTATS[i].substr(0, posChaine) + "<span class=\"chaine_recherchee\">" + RESULTATS[i].substr(posChaine, searchString.length) + "</span>" + RESULTATS[i].substr(posChaine + searchString.length, RESULTATS[i].length - searchString.length - posChaine)+'</span>');
		    	    }
		    	  }
				if(listbox.input.value==searchString)
					listbox.updateResultsWithoutSearch(results)
			},
			beforeSend : function(){
				waitingResult= true;
			},
			complete : function() {
				waitingResult= false;
			}
		});
	}
	;
}

$(document).ready(function(){
	  var ex1Combobox = new aria.ListboxCombobox(
		document.getElementById('recherche-combobox'),
	    document.getElementById('search'),
	    document.getElementById('liste_suggestions_recherche'),
	    rechercheResultats,
	    false
	  );
});

////////// Gestion de la bannière des cookies //////////
var _gaq = _gaq || [];

var tagAnalyticsCNIL = {}

tagAnalyticsCNIL.CookieConsent = function() {
    // Remplacez la valeur UA-XXXXXX-Y par l'identifiant analytics de votre site.
    var gaProperty = 'UA-6990139-1'
    // Désactive le tracking si le cookie d'Opt-out existe déjà .
    var disableStr = 'ga-disable-' + gaProperty;
    var firstCall = false;

    //Cette fonction retourne la date d'expiration du cookie de consentement

    function hasParentWithId(element, idValue) {
      if (typeof element.id != 'undefined' && element.id==idValue){
        return true;
      }
      if(typeof element.parentNode != 'undefined' && typeof element.parentNode.tagName != 'undefined' && element.parentNode.tagName.toUpperCase() != 'BODY'){
        return element.parentNode && hasParentWithId(element.parentNode, idValue);
      }else{
        return false;
      }

  }

    function getCookieExpireDate() {
      // Le nombre de millisecondes que font 13 mois
      var cookieTimeout = 33696000000;
      var date = new Date();
      date.setTime(date.getTime()+cookieTimeout);
      var expires = "; expires="+date.toGMTString();
      return expires;
    }


  //Cette fonction vérifie si on  a déjà  obtenu le consentement de la personne qui visite le site.
  function checkFirstVisit() {
    var consentCookie =  getCookie('hasConsent');
    if ( !consentCookie ) return true;
  }

  //Affiche une  bannière d'information en haut de la page
  function showBanner(){
    var bodytag = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.setAttribute('id','alert-cnil');
    div.className = "fixed-bottom align-self-center"
    // Le code HTML de la demande de consentement
    // Ajoute la bannière juste au début de la page
    div.innerHTML = '<div class="container">\
          <div class="row justify-content-center">\
            <div class="col-md-7">\
              <a class="alert-cnil_close"  onclick="tagAnalyticsCNIL.CookieConsent.hideInform();return false;" href="#alert-cnil">&times;</a>\
              <p>Ce site utilise Google Analytics. En continuant à naviguer, vous nous autorisez à déposer des cookies à des fins de mesure d\'audience. Pour désactiver les cookies <a href="#"  onclick="tagAnalyticsCNIL.CookieConsent.gaOptout();tagAnalyticsCNIL.CookieConsent.hideInform();">cliquer ici</a>, pour lire les infos légales <a href="https://www.autoentrepreneur.urssaf.fr/portail/accueil/mentions-legales.html">cliquer ici</a>.</p>\
            </div>\
          </div>\
        </div>';
    bodytag.insertBefore(div,bodytag.firstChild);
  }


  // Fonction utile pour récupérer un cookie à partir de son nom
  function getCookie(NameOfCookie)  {
    if (document.cookie.length > 0) {
      begin = document.cookie.indexOf(NameOfCookie+"=");
      if (begin != -1)  {
        begin += NameOfCookie.length+1;
        end = document.cookie.indexOf(";", begin);
        if (end == -1) end = document.cookie.length;
        return unescape(document.cookie.substring(begin, end));
      }
    }
    return null;
  }

  //Récupère la version d'Internet Explorer, si c'est un autre navigateur la fonction renvoie -1
  function getInternetExplorerVersion() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer')  {
      var ua = navigator.userAgent;
      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
    }  else if (navigator.appName == 'Netscape')  {
      var ua = navigator.userAgent;
      var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
    }
    return rv;
  }

  //Effectue une demande de confirmation de DNT pour les utilisateurs d'IE
  function askDNTConfirmation() {
    var r = confirm("Le signal DoNotTrack de votre navigateur est activé, confirmez vous activer \
    la fonction DoNotTrack?")
    return r;
  }

  //Vérifie la valeur de navigator.DoNotTrack pour savoir si le signal est activé et est à  1
  function notToTrack() {
    if ( (navigator.doNotTrack && (navigator.doNotTrack=='yes' || navigator.doNotTrack=='1'))
      || ( navigator.msDoNotTrack && navigator.msDoNotTrack == '1') ) {
      var isIE = (getInternetExplorerVersion()!=-1)
      if (!isIE){
        return true;
      }
      return false;
    }
  }

  //Si le signal est à  0 on considère que le consentement a déjà  été obtenu
  function isToTrack() {
    if ( navigator.doNotTrack && (navigator.doNotTrack=='no' || navigator.doNotTrack==0 )) {
      return true;
    }
  }

  // Fonction d'effacement des cookies
  function delCookie(name )   {
    var path = ";path=" + "/";
    var hostname = document.location.hostname;
    if (hostname.indexOf("www.") === 0)
      hostname = hostname.substring(4);
    var domain = ";domain=" + "."+hostname;
    var expiration = "Thu, 01-Jan-1970 00:00:01 GMT";
    document.cookie = name + "=" + path + domain + ";expires=" + expiration;
  }

  // Efface tous les types de cookies utilisés par Google Analytics
  function deleteAnalyticsCookies() {
    var cookieNames = ["__utma","__utmb","__utmc","__utmt","__utmv","__utmz","_ga","_gat"]
    for (var i=0; i<cookieNames.length; i++)
      delCookie(cookieNames[i])
  }

  function isClickOnOptOut( evt) {
    // On exclue le bouton de fermeture
    if(evt.target != null && typeof evt.target.className != 'undefined' && evt.target.className.split(' ').indexOf('alert-cnil_close')>-1)
      return false;
    else
      return hasParentWithId(evt.target, 'alert-cnil')
  }

  function consent(evt) {
    // On vérifie qu'il ne s'agit pas d'un clic sur la bannière
    if (!isClickOnOptOut(evt) ) {
      if ( !clickprocessed) {
        if(!evt.target.hasAttribute("data-toggle")){
          evt.preventDefault();
        }
        document.cookie = 'hasConsent=true; '+ getCookieExpireDate() +' ; path=/';
        callGoogleAnalytics();
        clickprocessed = true;
        if(!evt.target.hasAttribute("data-toggle")){
          window.setTimeout(function() {evt.target.click();}, 1000)
        }
      }
    }
  }


  // Tag Google Analytics, cette version est avec le tag Universal Analytics
  function callGoogleAnalytics() {
    if (firstCall) return;
    else firstCall = true;

    // Tag Google Analytics

      _gaq.push(['_setAccount', gaProperty]);
      _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      /*ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') +
      '.google-analytics.com/ga.js';*/
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') +
      '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

      var filetypes =  /\.(zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav).*$/i;
      var baseHref = '';

      $('a').bind('click', function(event) {
        var el = $(this);
        var track = true;
        var href = (typeof(el.attr('href')) != 'undefined' ) ? el.attr('href') :"";
        var isThisDomain = href.match(document.domain.split('.').reverse()[1] + '.' + document.domain.split('.').reverse()[0]);
        if (!href.match(/^javascript:/i)) {
          var elEv = []; elEv.value=0, elEv.non_i=false;
          elEv.type="_trackEvent";
          if (href.match(/^mailto\:/i)) {
            elEv.category = "email";
            elEv.action = "click";
            elEv.label = href.replace(/^mailto\:/i, '');
            elEv.loc = href;
          }
          else if (href.match(filetypes)) {
            var extension = filetypes.exec(href);
            elEv.category = "download";
            elEv.action = extension[1];
            elEv.label = /(.*?)(?:\?.*)?$/.exec(href.replace(/ /g,"-"))[1];
            elEv.loc = baseHref + href;
          }else if (href.match(/^tel\:/i)) {
            elEv.category = "telephone";
            elEv.action = "click";
            elEv.label = href.replace(/^tel\:/i, '');
            elEv.loc = href;
          }else if(el.parents('.partage').length>0){
            // Ajout dans la partie social de GA
            elEv.type = "_trackSocial"
            elEv.action = "share";
            if(el.hasClass("partage_facebook")){
              elEv.category = "facebook";
            }else if(el.hasClass("partage_twitter")){
              elEv.category = "twitter";
            }else if(el.hasClass("partage_linkedin")){
              elEv.category = "linkedin";
            }else{
              track = false;
            }
            // Suppression du nom de domaine
            elEv.label = /(\/+.*)/.exec(document.location.pathname)[1];
          }else if (href.match(/^https?\:/i) && !isThisDomain) {
            elEv.category = "external";
            elEv.action = "click";
            elEv.label = href.replace(/^https?\:\/\//i, '');
            elEv.non_i = true;
            elEv.loc = href;
          }
          else track = false;

          if (track) {
            _gaq.push([elEv.type, elEv.category.toLowerCase(), elEv.action.toLowerCase(), elEv.label.toLowerCase(), elEv.value, elEv.non_i]);


            if ((!el.hasClass("popin") && !el.hasClass("iframe") && el.parents('.partage').length==0) && (el.attr('target') == undefined || el.attr('target').toLowerCase() != '_blank')) {
              setTimeout(function() { location.href = elEv.loc; }, 400);
              return false;
            }
          }

          if(elEv.type=="_trackSocial" && (el.attr('target') == undefined || el.attr('target').toLowerCase() != '_blank')){
            event.preventDefault();
          }
        }
      });

    })();
  }

  return {

    // La fonction d'opt-out
    gaOptout: function() {
      document.cookie = disableStr + '=true;'+ getCookieExpireDate() +' ; path=/';
      document.cookie = 'hasConsent=false;'+ getCookieExpireDate() +' ; path=/';
      //var div = document.getElementById('cookie-banner');
      // Ci dessous le code de la bannià¨re affichà&copy;e une fois que l'utilisateur s'est opposà&copy; au dà&copy;pot
      // Vous pouvez modifier le contenu et le style
      //if ( div!= null ) div.innerHTML = '<div class="alert alert-cnil text-center">Vous vous êtes opposé au dépôt de cookies de mesures d\'audience\
      //dans votre navigateur </div>'
      window[disableStr] = true;
      clickprocessed = true;
      deleteAnalyticsCookies();
    },


    showInform: function() {
      var div = document.getElementById("inform-and-ask");
      div.style.display = "";
    },


    hideInform: function() {
      var div = document.getElementById("alert-cnil");
      div.style.display = "none";
    },


    start: function() {
      //Ce bout de code và&copy;rifie que le consentement n'a pas dà&copy;jà  à&copy;tà&copy; obtenu avant d'afficher
      // la bannià¨re
      var consentCookie =  getCookie('hasConsent');
      clickprocessed = false;
      if (!consentCookie) {
        //L'utilisateur n'a pas encore de cookie, on affiche la bannià&copy;re.
        //Si il clique sur un autre à&copy;là&copy;ment que la bannià&copy;re on enregistre le consentement
        if ( notToTrack() ) {
          //L'utilisateur a activà&copy; DoNotTrack. Do not ask for consent and just opt him out
          tagAnalyticsCNIL.CookieConsent.gaOptout()
          alert("Vous avez activé DoNotTrack, nous respectons votre choix.")
        } else {
          if (isToTrack() ) {
            consent();
          } else {
            if (window.addEventListener) {
              window.addEventListener("load", showBanner, false);

              document.getElementsByTagName("body")[0].addEventListener("click", consent, false);
            } else {
              window.attachEvent("onload", showBanner);
              document.attachEvent("onclick", consent);
            }
          }
        }
      } else {
        if (document.cookie.indexOf('hasConsent=false') > -1)
          window[disableStr] = true;
        else
          callGoogleAnalytics();
      }
    }
  }

}();

tagAnalyticsCNIL.CookieConsent.start();

