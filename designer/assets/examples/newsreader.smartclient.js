JUL.apply(newsreader.smartclient, {
/* begin business logic */
go: function() {
	var sUrl = JUL.trim(formAddress.getValue('address') || '');
	if (!(/^https?:\/\//).test(sUrl)) {
		alert('Address not valid!');
		return;
	}
	var oFeed = new google.feeds.Feed(sUrl);
	oFeed.setNumEntries(50);
	oFeed.load(function(oResult) {
	  	if (oResult.error) {
		  	alert(oResult.error.message);
		  	return;
		  }
		  if (oResult.feed && oResult.feed.entries) {
		  		oResult.feed.entries.sort(function(a, b) {
				  	return (new Date(b.publishedDate)) - (new Date(a.publishedDate));
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
	  });
	},
fillArticles: function() {
	if (!this.feed || !this.feed.entries) { return; }
	for (var i = 0; i < this.feed.entries.length; i++) {
		this.feed.entries[i].id = i;
	}
	datasourceArticles.setTestData(this.feed.entries);
	listgridArticles.invalidateCache();
	listgridArticles.fetchData();
},
onSelectArticle: function(sId) {
	var oEntry = this.feed.entries[sId];
	labelTitle.setContents('<a target="_blank" href="' + oEntry.link + '">' + oEntry.title + '</a>');
	labelDate.setContents((new Date(oEntry.publishedDate)).toLocaleString());
	var oImage = this.findImage(oEntry.mediaGroups);
	if (oImage) {
		imgArticle.setSrc(oImage.url);
		hlayoutImage.show();
	}
	else {
		hlayoutImage.hide();
	}
	htmlflowContent.setContents(oEntry.content.replace(/<a/gm, '<a target="_blank"'));
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
