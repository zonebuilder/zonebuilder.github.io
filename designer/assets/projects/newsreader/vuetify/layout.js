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
/* 'JUL News Reader - Vuetify - Layout' namespace */
var oProject = jul.ns('newsreader.vuetify.layout');

jul.apply(oProject,
/* begin 'JUL News Reader - Vuetify - Layout' */
{
	keepBindings: false,
	listenersProperty: 'listeners',
	noLogic: true,
	ns: 'newsreader.vuetify.layout',
	suggestedFramework: 'html.vuetify.template',
	title: 'JUL News Reader - Vuetify - Layout',
	version: '1.1572506909724',
	init: function () {
		var oParser = new JUL.UI.Parser(this.parserConfig);
		oParser.create(this.ui, this.logic, document.getElementById('app'));
	}
}
/* end 'JUL News Reader - Vuetify - Layout' */
);

oProject.parserConfig =
/* begin 'JUL News Reader - Vuetify - Layout' parser config */
{
	booleanAttrs: true,
	defaultClass: 'html',
	topDown: true,
	useTags: true,
	customFactory: function (oConfig) {
		if (this._keepInstance && !oConfig.ref) {
			JUL._vueCounter = JUL._vueCounter || 0;
			oConfig.ref = 'r' + (++JUL._vueCounter);
		}
		return this.createDom(oConfig);
	}
}
/* end 'JUL News Reader - Vuetify - Layout' parser config */
;

oProject.ui =
/* begin 'JUL News Reader - Vuetify - Layout' UI */
{
	tag: 'v-app',
	children: [
		{tag: 'v-navigation-drawer', app: true, fixed: true, 'v-bind:clipped': 'clipped', 'v-bind:mini-variant': 'miniVariant',
		 'v-model': 'drawer', children: [
			{tag: 'v-list', children: [
				{tag: 'v-list-item', exact: true, router: true, 'v-bind:key': 'i', 'v-bind:to': 'item.to', 'v-for': '(item, i) in items', children: [
					{tag: 'v-list-item-action', children: [
						{tag: 'v-icon', html: '{{ item.icon }}'}
					]},
					{tag: 'v-list-item-content', children: [
						{tag: 'v-list-item-title', 'v-text': 'item.title'}
					]}
				]}
			]}
		]},
		{tag: 'v-app-bar', app: true, fixed: true, 'v-bind:clipped-left': 'clipped', children: [
			{tag: 'v-app-bar-nav-icon', 'v-on:click': 'drawer = !drawer'},
			{tag: 'v-toolbar-title', style: 'width:100%;text-align:center', 'v-text': 'title'},
			{tag: 'v-btn', css: 'ma-2', html: 'Next', outlined: true, 'v-on:click': 'onNavigate(\'next\')', children: [
				{tag: 'v-icon', html: 'mdi-arrow-right', right: true}
			]},
			{tag: 'v-btn', css: 'ma-2', html: 'Prev', outlined: true, 'v-on:click': 'onNavigate(\'prev\')', children: [
				{tag: 'v-icon', html: 'mdi-arrow-left', right: true}
			]},
			{tag: 'v-btn', css: 'ma-2', html: 'Home', outlined: true, 'v-on:click': 'onNavigate(\'home\')', children: [
				{tag: 'v-icon', html: 'mdi-home', right: true}
			]}
		]},
		{tag: 'v-content', children: [
			{tag: 'nuxt'}
		]}
	]
}
/* end 'JUL News Reader - Vuetify - Layout' UI */
;

oProject.logic =
/* begin 'JUL News Reader - Vuetify - Layout' logic */
null
/* end 'JUL News Reader - Vuetify - Layout' logic */
;


return oProject;
};

if (module && module.exports) {
	module.exports = fInstance;
}
else if (global) {
	fInstance(global);
}
return fInstance;

})(typeof global !== 'undefined' ? global : window, (typeof window === 'undefined' || !window.module) && typeof module !== 'undefined' ? module : null);