JUL.apply(newsreader.smartclient, {
/* begin business logic */
go: function() {
	var sUrl = JUL.trim(formAddress.getValue('address') || '');
	if (!(/^https?:\/\//).test(sUrl)) {
		alert('Address not valid!');
		return;
	}
	feednami.loadPolyfills(function() {
		feednami.load(sUrl).then(newsreader.smartclient.load);
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
	  newsreader.smartclient.feed = oResult.feed;
	  	var sTitle = 'JUL News Reader';
	  if (oResult.feed && oResult.feed.title) {
	  	sTitle = oResult.feed.title.substr(0, 70) + ' - ' + sTitle;
		}
		windowMain.setTitle(sTitle);
		labelTitle.setContents('');
		labelDate.setContents('');
		hlayoutImage.hide();
		htmlflowContent.setContents('<div></div>');
	  newsreader.smartclient.fillArticles();
},
fillArticles: function() {
	if (!this.feed || !this.feed.entries) { return; }
	for (var i = 0; i < this.feed.entries.length; i++) {
		var oEntry = this.feed.entries[i];
		oEntry.id = i;
		oEntry.title = oEntry.title[0] === '<' ? oEntry.title.split('>')[1].split('<')[0] : oEntry.title;
	}
	datasourceArticles.setTestData(this.feed.entries);
	listgridArticles.invalidateCache();
	listgridArticles.fetchData();
},
onSelectArticle: function(sId) {
	var oEntry = this.feed.entries[sId];
	labelTitle.setContents('<a target="_blank" href="' + oEntry.link + '">' + oEntry.title + '</a>');
	labelDate.setContents((new Date(oEntry.pubDate)).toLocaleString());
	var oImage = this.findImage(oEntry.thumbnail || oEntry.group || oEntry.image);
	if (oImage) {
		imgArticle.setSrc(oImage.url);
		hlayoutImage.show();
	}
	else {
		hlayoutImage.hide();
	}
	var sContent = [].concat(oEntry.description)[0] || '';
	htmlflowContent.setContents(sContent.replace(/<a/gm, '<a target="_blank"'));
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
