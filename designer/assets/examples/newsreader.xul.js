JUL.apply(newsreader.xul, {
/* begin business logic */
go: function() {
	var sUrl = JUL.trim(ample.getElementById('textbox-url').getAttribute('value'));
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
		  newsreader.xul.feed = oResult.feed;
		  	var sTitle = 'JUL News Reader';
		  if (oResult.feed && oResult.feed.title) {
		  	sTitle = ample.$encodeXMLCharacters(oResult.feed.title.substr(0, 70)) + ' - ' + sTitle;
		}
			ample.getElementById('window-main').setAttribute('title', sTitle);
		  newsreader.xul.fillArticles();
	  });
	},
fillArticles: function() {
	var oBody = ample.getElementById('listbox-articles').querySelector('xul|listbody');
	ample.query(oBody).empty();
	ample.getElementById('vbox-articles').setAttribute('hidden', false);
	ample.getElementById('menuitem-show-articles').setAttribute('checked', true);
	if (!this.feed || !this.feed.entries) { return; }
	for (var i = 0; i < this.feed.entries.length; i++) {
		var oEntry = this.feed.entries[i];
		this.parser.create({tag: 'listitem', id: 'entry-' + i, children: [
				{tag: 'listcell', label: oEntry.title, tooltiptext: oEntry.title}
			]}, null, oBody);
	}
},
onSelectArticle: function(sId) {
	ample.query('#description-title').empty();
	ample.getElementById('description-date').setAttribute('value', '');
	ample.getElementById('hbox-image').setAttribute('hidden', true);
	ample.getElementById('image-article').setAttribute('src', '');
	ample.getElementById('description-content').$getContainer().innerHTML = '';
	if (!sId) { return; }
	var oEntry = this.feed.entries[sId.substr(6)];
	ample.query('#description-title').html('<div class="title"><a target="_blank" href="' + ample.$encodeXMLCharacters(oEntry.link) + '">' + oEntry.title + '</a></div>');
	ample.getElementById('description-date').setAttribute('value', (new Date(oEntry.publishedDate)).toLocaleString());
	var oImage = this.findImage(oEntry.mediaGroups);
	if (oImage) {
		ample.getElementById('image-article').setAttribute('src', ample.$encodeXMLCharacters(oImage.url));
		ample.getElementById('hbox-image').setAttribute('hidden', false);
	}
	ample.getElementById('description-content').$getContainer().innerHTML = '<div class="content">' + oEntry.content.replace(/<a/gm, '<a target="_blank"') + '</div>';
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
