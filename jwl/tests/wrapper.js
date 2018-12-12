(function(global, module) {
'use strict';
if (module && module.exports && typeof require === 'function') { require('jul'); }

/* if in Node, export the instance factory, else apply it to the global namespace  */
var fInstance = function(oNSRoot) {
/* create a JUL instance bound to oNSRoot and make it available to the inner code */
var jul = new JUL.Instance({nsRoot: oNSRoot || global});

/* generated by JUL Designer version 2.1.1 */
/* 'JWL Components - Wrapper test' namespace */
var oProject = jul.ns('JWL.tests.wrapper');

jul.apply(oProject,
/* begin 'JWL Components - Wrapper test' */
{
	keepBindings: false,
	listenersProperty: 'listeners',
	noLogic: false,
	ns: 'JWL.tests.wrapper',
	suggestedFramework: 'html',
	title: 'JWL Components - Wrapper test',
	version: '1.1501925214064',
	init: function () {
		var oParser = new JWL.Parser(this.parserConfig);
		oParser.create(this.ui, this.logic, document.body);
	}
}
/* end 'JWL Components - Wrapper test' */
);

oProject.parserConfig =
/* begin 'JWL Components - Wrapper test' parser config */
{
	customFactory: 'JWL.factory',
	defaultClass: 'html',
	topDown: true,
	useTags: true
}
/* end 'JWL Components - Wrapper test' parser config */
;

oProject.ui =
/* begin 'JWL Components - Wrapper test' UI */
{
	tag: 'div',
	children: [
		{tag: 'frameplayer', id: 'class-frameplayer', css: 'abc'}
	]
}
/* end 'JWL Components - Wrapper test' UI */
;

oProject.logic =
/* begin 'JWL Components - Wrapper test' logic */
{
	'class-frameplayer': {
		'data-image-alt': 'welcome', 'data-image-height': '144', 'data-image-src': 'media/frames/frame05.jpg',
		 'data-image-width': '256',
		 'data-options': '{"template":"media/frames/frame{n}.jpg","range":[1,30],"zeropad":true,"interval":400}'
	}
}
/* end 'JWL Components - Wrapper test' logic */
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
