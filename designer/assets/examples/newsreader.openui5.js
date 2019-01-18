(function($) {
JUL.apply(newsreader.openui5, {
/* begin business logic */
go: function() {
	var sUrl = JUL.trim(sap.ui.getCore().byId('textfield-address').getValue());
	if (!(/^https?:\/\//).test(sUrl)) {
		alert('Address not valid!');
		return;
	}
	feednami.loadPolyfills(function() {
		feednami.setPublicApiKey('b8888e776e52505e015cb54fdea3d51d39bb4844fb9b0d5368a460568286bfac');
		feednami.load(sUrl).then(newsreader.openui5.load);
	});
},
load: function(oResult) {
	  if (oResult.error) {
	  	alert(oResult.error.message);
	  	return;
	  }
	  oResult = {feed: JUL.apply(oResult, oResult.meta)};
	  if (oResult.feed && oResult.feed.entries) {
	  		oResult.feed.entries.sort(function(a, b) {
			  	return (new Date(b.pubDate)) - (new Date(a.pubDate));
			});
	  }
	  newsreader.openui5.feed = oResult.feed;
	  	var sTitle = 'JUL News Reader';
	  if (oResult.feed && oResult.feed.title) {
	  	sTitle = oResult.feed.title.substr(0, 70);
	}
	sap.ui.getCore().byId('dialog-main').setTitle(sTitle);
	  newsreader.openui5.fillArticles();
},
fillArticles: function() {
	var oList = sap.ui.getCore().byId('listbox-entries');
	oList.setItems([], true);
	sap.ui.getCore().byId('layoutarea-entries').setVisible(true);
	sap.ui.getCore().byId('menuitem-show-list').setEnabled(false);
	sap.ui.getCore().byId('menuitem-hide-list').setEnabled(true);
	delete this.current;
	this.onSelectArticle();
	if (!this.feed || !this.feed.entries) { return; }
	var aItems = [];
	for (var i = 0; i < this.feed.entries.length; i++) {
		var oEntry = this.feed.entries[i];
		oEntry.title = oEntry.title[0] === '<' ? oEntry.title.split('>')[1].split('<')[0] : oEntry.title;
		aItems.push({
			xclass: 'ListItem',
			key: 'entry-' + (i + 1),
			text: oEntry.title,
			tooltip: oEntry.title
		});
	}
	oList.setItems(this.parser.create(aItems), true);
},
onSelectArticle: function() {
	$('#article-title').html('');
	$('#article-date').html('');
	$('#article-image').hide();
	$('#img-article').attr('src', '');
	$('#article-content').html('');
	if (!this.current) { return; }
	var oEntry = this.feed.entries[this.current - 1];
	$('#article-title').html(this.template('<a target="_blank" href="{link}">{title}</a>', {
		link: oEntry.link,
		title: oEntry.title
	}));
	$('#article-date').html((new Date(oEntry.pubDate)).toLocaleString());
	var oImage = this.findImage(oEntry.thumbnail || oEntry.group || oEntry.image);
	if (oImage) {
		$('#img-article').attr({
			alt: oEntry.title,
			src: oImage.url
		});
		$('#article-image').show();
	}
	var sContent = [].concat(oEntry.description)[0] || '';
	$('#article-content').html(sContent.replace(/<a/gm, '<a target="_blank"'));
},
template: function(sTemplate, oData) {
	return sTemplate.replace(/\{(\w+)\}/g, function(sMatch, sItem) {
		if (typeof oData[sItem] !== 'undefined') { return oData[sItem]; }
		else { return sMatch; }
	});
},
findImage: function(oMedia) {
	var oImage = false;
	if (!oMedia) { return oImage; }
	if (JUL.typeOf(oMedia) === 'Array') {
		for (var i = oMedia.length - 1; i >= 0; i--) {
			oImage = this.findImage(oMedia[i]);
			if (oImage) { return oImage; }
		}
	}
	else if (typeof oMedia === 'object') {
		if (typeof oMedia.url === 'string' && (/^https?:\/\//).test(oMedia.url)) {
			return oMedia;
		}
		for (var sItem in oMedia) {
			if (oMedia.hasOwnProperty(sItem)) {
				oImage = this.findImage(oMedia[sItem]);
				if (oImage) { return oImage; }
			}
		}
	}
	return oImage;
}
/* end business logic */
});
})(jQuery);
