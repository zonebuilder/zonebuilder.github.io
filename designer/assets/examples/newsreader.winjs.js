(function($) {
JUL.apply(newsreader.winjs, {
/* begin business logic */
go: function() {
	var sUrl = JUL.trim($('#input-address').val());
	if (!(/^https?:\/\//).test(sUrl)) {
		alert('Address not valid!');
		return;
	}
	feednami.loadPolyfills(function() {
		feednami.setPublicApiKey('b8888e776e52505e015cb54fdea3d51d39bb4844fb9b0d5368a460568286bfac');
		feednami.load(sUrl).then(newsreader.winjs.load);
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
	  newsreader.winjs.feed = oResult.feed;
	  	var sTitle = 'JUL News Reader';
	  if (oResult.feed && oResult.feed.title) {
	  	sTitle = oResult.feed.title.substr(0, 70);
	}
	$('#caption').html(sTitle).attr('title', sTitle);
	  newsreader.winjs.fillArticles();
},
fillArticles: function() {
	var oList = document.getElementById('listview-articles').winControl;
	oList.itemTemplate = document.getElementById('template-entry');
	oList.itemDataSource = null;
	document.getElementById('pivot-entries').winControl.selectedIndex = 0;
	delete this.current;
	this.onSelectArticle();
	if (!this.feed || !this.feed.entries) { return; }
	var aEntries = [];
	for (var i = 0; i < this.feed.entries.length; i++) {
		var oEntry = this.feed.entries[i];
		oEntry.title = oEntry.title[0] === '<' ? oEntry.title.split('>')[1].split('<')[0] : oEntry.title;
		aEntries.push({
			id: 'entry-' + (i + 1),
			title: oEntry.title
		});
	}
	oList.itemDataSource = (new WinJS.Binding.List(aEntries)).dataSource;
},
goNext: function(bPrev) {
	if (!this.feed || !this.feed.entries) { return; }
	var n = this.feed.entries.length;
	if (this.current) { this.current = 1 + (n + (this.current - 1 + (bPrev ? -1 : 1)) % n) % n; }
	else { this.current = bPrev ? n : 1; }
	this.onSelectArticle();
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
	document.getElementById('pivot-entries').winControl.selectedIndex = 1;
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
