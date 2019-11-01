/* eslint-disable */
/* globals JUL */

(function(global, module) {
'use strict';
if (typeof JUL === 'undefined' && module && module.exports && typeof require === 'function') { require('jul'); }

/* if in Node, export the instance factory, else apply it to the global namespace  */
var fInstance = function(oNSRoot) {
/* create a JUL instance bound to oNSRoot and make it available to the inner code */
var jul = new JUL.Instance({nsRoot: oNSRoot === null ? {} : oNSRoot || global});

/* generated by JUL Designer version 2.6.8 */
/* 'JUL News Reader - Vuetify' namespace */
var oApp = jul.ns('newsreader.vuetify');

jul.apply(oApp,
/* begin 'JUL News Reader - Vuetify' */
{
	ns: 'newsreader.vuetify',
	preferredFramework: 'html.vuetify.template',
	title: 'JUL News Reader - Vuetify',
	version: '1.1572507510248',
	init: function () {
		for (var sItem in this.modules) {
			if (this.modules.hasOwnProperty(sItem)) {
				var sNS = this.modules[sItem].ns;
				if (sNS.substr(0, 1) === '.') { sNS = this.ns + sNS; }
				var oModule = JUL.get(sNS);
				if (!oModule) { continue; }
				var oParser = new JUL.UI.Parser(oModule.parserConfig);
				oParser.create(oModule.ui, oModule.logic);
			}
		}
	},
	modules: {
		articles: {
			ns: '.articles', description: 'JUL News Reader - Vuetify - Articles'
		},
		entry: {
			ns: '.entry', description: 'JUL News Reader - Vuetify - Entry'
		},
		layout: {
			ns: '.layout', description: 'JUL News Reader - Vuetify - Layout'
		}
	}
}
/* end 'JUL News Reader - Vuetify' */
);

oApp.defaultParser =
/* begin 'JUL News Reader - Vuetify' default parser */
{
	defaultClass: 'html',
	topDown: true,
	useTags: true,
	_otherProperties: {
		booleanAttrs: true
	},
	customFactory: function (oConfig) {
		if (this._keepInstance && !oConfig.ref) {
			JUL._vueCounter = JUL._vueCounter || 0;
			oConfig.ref = 'r' + (++JUL._vueCounter);
		}
		return this.createDom(oConfig);
	}
}
/* end 'JUL News Reader - Vuetify' default parser */
;


return oApp;
};

if (module && module.exports) {
	module.exports = fInstance;
}
else if (global) {
	fInstance(global);
}
return fInstance;

})(typeof global !== 'undefined' ? global : window, (typeof window === 'undefined' || !window.module) && typeof module !== 'undefined' ? module : null);
