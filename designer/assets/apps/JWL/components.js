/* generated by JUL Designer version 1.8.5 */
/* 'JWL Components' namespace */
JUL.ns('JWL.components');

JUL.apply(JWL.components,
/* begin 'JWL Components' */
{
	ns: 'JWL.components',
	preferredFramework: 'html',
	title: 'JWL Components',
	version: '1.1470634933169',
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

JWL.components.defaultParser =
/* begin 'JWL Components' default parser */
{
	customFactory: 'JUL.UI.createDom',
	defaultClass: 'html',
	topDown: true,
	useTags: true
}
/* end 'JWL Components' default parser */
;

