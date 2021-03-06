(function(global, module) {
'use strict';
if (module && module.exports && typeof require === 'function') { require('jul'); }

/* if in Node, export the instance factory, else apply it to the global namespace  */
var fInstance = function(oNSRoot) {
/* create a JUL instance bound to oNSRoot and make it available to the inner code */
var jul = new JUL.Instance({nsRoot: oNSRoot || global});

/* generated by JUL Designer version 2.1.1 */
/* 'JWL Components - Custom element test' namespace */
var oProject = jul.ns('JWL.tests.custom');

jul.apply(oProject,
/* begin 'JWL Components - Custom element test' */
{
	keepBindings: false,
	listenersProperty: 'listeners',
	noLogic: false,
	ns: 'JWL.tests.custom',
	suggestedFramework: 'html',
	title: 'JWL Components - Custom element test',
	version: '1.1501925648143',
	init: function () {
		var oParser = new JWL.Parser(this.parserConfig);
		oParser.create(this.ui, this.logic, document.body);
	}
}
/* end 'JWL Components - Custom element test' */
);

oProject.parserConfig =
/* begin 'JWL Components - Custom element test' parser config */
{
	customFactory: 'JWL.custom',
	defaultClass: 'html',
	topDown: true,
	useTags: true
}
/* end 'JWL Components - Custom element test' parser config */
;

oProject.ui =
/* begin 'JWL Components - Custom element test' UI */
{
	tag: 'div',
	children: [
		{tag: 'frameplayer', id: 'custom-frameplayer', css: 'abc'}
	]
}
/* end 'JWL Components - Custom element test' UI */
;

oProject.logic =
/* begin 'JWL Components - Custom element test' logic */
{
	'custom-frameplayer': {
		'data-image-alt': 'welcome', 'data-image-height': '144', 'data-image-src': 'media/frames/frame05.jpg',
		 'data-image-width': '256',
		 'data-options': '{"template":"media/frames/frame{n}.jpg","range":[1,30],"zeropad":true,"interval":400}'
	}
}
/* end 'JWL Components - Custom element test' logic */
;


};

if (module && module.exports) {
	module.exports = fInstance;
}
else if (global) {
	fInstance(global);
}
return fInstance;

})(typeof global !== 'undefined' ? global : window, (typeof window === 'undefined' || !window.module) && typeof module !== 'undefined' ? module : null);
