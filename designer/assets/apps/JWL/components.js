(function(global, module) {
'use strict';
if (module && module.exports && typeof require === 'function') { require('jul'); }

/* if in Node, export the instance factory, else apply it to the global namespace  */
var fInstance = function(oNSRoot) {
/* create a JUL instance bound to oNSRoot and make it available to the inner code */
var jul = new JUL.Instance({nsRoot: oNSRoot || global});

/* generated by JUL Designer version 2.1.1 */
/* 'JWL Components' namespace */
var oApp = jul.ns('JWL.components');

jul.apply(oApp,
/* begin 'JWL Components' */
{
	ns: 'JWL.components',
	preferredFramework: 'html',
	title: 'JWL Components',
	version: '1.1501925648143',
	init: function () {
		for (var sItem in this.modules) {
			if (this.modules.hasOwnProperty(sItem)) {
				var sNS = this.modules[sItem].ns;
				if (sNS.substr(0, 1) === '.') { sNS = this.ns + sNS; }
				var oModule = jul.get(sNS);
				if (!oModule) { continue; }
				var oParser = new jul.ui.Parser(oModule.parserConfig);
				oParser.create(oModule.ui, oModule.logic);
			}
		}
	},
	modules: {
		playerbar: {
			ns: '.playerbar', description: 'General purpose player bar'
		},
		jsonoptions: {
			ns: '.jsonoptions', description: 'Options object stored as JSON'
		},
		frameplayer: {
			ns: '.frameplayer', description: 'A player that displays a sequence of pictures'
		},
		svglogo: {
			ns: 'JWL.resources.svglogo', description: 'SVG Logo'
		},
		customTest: {
			ns: 'JWL.tests.custom', description: 'Custom element test'
		},
		wrapperTest: {
			ns: 'JWL.tests.wrapper', description: 'Wrapper test'
		}
	}
}
/* end 'JWL Components' */
);

oApp.defaultParser =
/* begin 'JWL Components' default parser */
{
	customFactory: 'JUL.UI.createDom',
	defaultClass: 'html',
	topDown: true,
	useTags: true
}
/* end 'JWL Components' default parser */
;


};

if (module && module.exports) {
	module.exports = fInstance;
}
else if (global) {
	fInstance(global);
}
return fInstance;

})(typeof global !== 'undefined' ? global : window, typeof module !== 'undefined' ? module : null);
