/*
	JUL Calculator v1.01
	Copyright (c) 2018 The Zonebuilder <zone.builder@gmx.com>
	Licenses: GNU GPLv2 or later; GNU LGPLv3 or later (http://sourceforge.net/p/jul-javascript/wiki/License/)
 */
/* jshint browser: true, curly: true, eqeqeq: true, expr: true, funcscope: true, immed: true, latedef: true, 
	onevar: true, newcap: true, noarg: true, node: true, strict: true, trailing: true, undef: true, unused: vars, wsh: true */
/* globals JUL, Vue */
(function() {
'use strict';

/* Calc UI related */
var oProject = JUL.ns('Calc');
JUL.apply(oProject, {
	ui: null,
	parser: null,
	buttons: {},
	addButtons: function() {
		var aButtons = [];
		for (var i = 0; i < this.config.keys.length; i++) {
			var sKey = this.config.keys.substr(i, 1);
			aButtons[i] = {
				c: 'button',
				'class': 'key' + (this.config.special.indexOf(sKey) > -1 ?
					' k' + sKey.charCodeAt(0) : ''),
					attrs: {value: sKey},
					html: this.config.labelMap[sKey] || sKey
			};
		}
		this.buttons.children = aButtons;
	},
	props: {
		display: '0'
	},
	render: function(createElement) {
		this.parser._createElement = createElement;
		return this.parser.create(this.ui);
	},
	init: function(oConfig) {
		this.ui = oConfig.ui;
		this.parser = new JUL.UI.Parser(oConfig.parserConfig);
		this.addButtons();
		new Vue({
			el: '#app',
			data: this.props,
			render: JUL.makeCaller(this, 'render')
		});
	},
	display: function() {
		var sText = this.get('text');
		var c = sText.substr(0, 1) === '-' ? sText.substr(1, 1) : sText.substr(0, 1);
		this.props.display = c >= '0' && c <= '9' ? sText.toUpperCase() : 'Error';
	}
});

})();
