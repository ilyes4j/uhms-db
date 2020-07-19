/*
 *  jQuery Bootstrap Modal Maker - v1.0.0
 *  Create's a bootstrap modal, allowing you to specify the title, content, buttons and callbacks.
 *  https://github.com/styphon/jquery-bootstrap-modal
 *
 *  Made by Styphon
 *  Under MIT License
 */
;( function( $, window, document, undefined ) {

	"use strict";

	var pluginName = "modalMaker",
		defaults = {
			id: "",
			title: "Congrats!",
			content: "",
			/*buttons: [
				{"text": "Retour", "class": "btn-default", 'dismiss': true}
			]*/
		};

	// The actual plugin constructor
	function Plugin ( element, options ) {
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.modalDomElement = null;
		this.init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend( Plugin.prototype, {
		init: function() {
			if ( ! this.settings.id ) {
				this.setId();
			}
			this.generateHtml();
		},
		setId: function() {
			var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			for ( var i = 0; i < 8; i++ ) {
				var pos = Math.floor(Math.random() * (chars.length));
				this.settings.id += chars.substring(pos, pos + 1);
			}
		},
		generateHtml: function () {
			var $modal = $('<div/>', {
				"class": "modal fade",
				"tabindex": "-1",
				"role": "dialog",
				"data-backdrop": "static",
				"id": this.settings.id,
        "aria-labelledby" : "modal-erreurLabel"
			})
				.appendTo($('body'));
			var $dialogue = $('<div/>', {"class": "modal-dialog modal-dialog-centered", "role" : "document"})
				.appendTo($modal);
			if(this.settings.modalClass){
				$dialogue.addClass(this.settings.modalClass)
			}
			var $content = $('<div/>', {"class": "modal-content"}).append(
					$('<button/>', {
						"class": "close",
						"data-dismiss": "modal",
						"aria-label": "Fermer le message d’erreur"
					}).append(
						$('<img/>', {
							// "src": "img/icones/bouton_fermer_onglet_connection.svg",
							"src": "include/WebAE/img/icones/bouton_fermer_onglet_connection.svg",
							"alt": ""
						})
					)).appendTo($dialogue);

			$('<div/>', {"class": "modal-header"}).append(
				$('<h4/>', {"class": "modal-title", "id" : "modal-erreurLabel"})
					.html(this.settings.title)
			).appendTo($content);

			$('<div/>', {"class": "modal-body text-center"})
				.html(this.settings.content)
				.appendTo($content);

			if (typeof this.settings.buttons!="undefined" && this.settings.buttons.length > 0 ) {
				var $footer = $('<div/>', {"class": "barre_boutons"})
					.appendTo($content);

				$.each ( this.settings.buttons, function (i, btn) {
					if(typeof btn.type != 'undefined' && btn.type=='link'){
						var $btn = $('<a/>', {
							"href": btn.href,
							"class": "btn " + btn.className
						})
							.html(btn.text)
							.appendTo($footer);

					}else{
						var $btn = $('<button/>', {
							"type": "button",
							"class": "btn " + btn.className
						})
							.html(btn.text)
							.appendTo($footer);
					}

					if ( btn.dismiss ) {
						$btn.attr("data-dismiss", "modal");
					}
					if ( $.isFunction(btn.callback) ) {
						$btn.click(btn.callback);
					}
				});

				if(this.settings.buttons.length==1){
					$footer.addClass("d-inline text-center")
				}

			}else if(typeof this.settings.forms!="undefined" && this.settings.forms.length > 0){
				$.each ( this.settings.forms, function (i, form) {

					var $footer = $('<div/>', {"class": "modal-footer barre_boutons"})
					.appendTo($content);

					var $form = $('<form/>', {
						"action": form.action,
						"method": typeof form.method != "undefined" ? form.method : "POST"
					})

			        $.each( form.params, function( key, value ) {
			        	var $finput = $('<input/>', {
			        		"type" : "hidden",
							"name": key,
							"value": value
						})
						$finput.appendTo($form)
			        });

					$.each( form.buttons, function (i, btn) {
						var $btn = $('<button/>', {
							"type": btn.type,
							"class": "btn " + btn.className
						})
						.html(btn.text)
						.appendTo($form);
					});

					if(form.buttons.length==1){
						$footer.addClass("d-inline text-center")
					}

			        $form.appendTo($footer);
				});
			}



			this.modalDomElement = $modal.on('show.bs.modal', function () {
				$(this).focus();
			}).modal();

			// Callback Ã  la fermeture de la fenetre modale
			if ( $.isFunction(this.settings.callback) ) {
				$modal.on('hidden.bs.modal', this.settings.callback);
			}
		}
	} );

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.modalMaker = function( options ) {
		if ( !$.data( this, "plugin_" + pluginName ) ) {
			$.data( this, "plugin_" +
				pluginName, new Plugin( this, options ) );
		}else if(typeof options.id != "undefined"){
			$('#'+options.id).remove();
			$.data( this, "plugin_" +
					pluginName, new Plugin( this, options ) );
		}
	};

} )( jQuery, window, document );