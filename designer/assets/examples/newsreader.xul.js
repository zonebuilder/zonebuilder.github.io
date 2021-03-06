JUL.apply(newsreader.xul, {
/* begin business logic */
go: function() {
	var sUrl = JUL.trim(ample.getElementById('textbox-url').getAttribute('value'));
	if (!(/^https?:\/\//).test(sUrl)) {
		alert('Address not valid!');
		return;
	}
	feednami.loadPolyfills(function() {
		feednami.setPublicApiKey('b8888e776e52505e015cb54fdea3d51d39bb4844fb9b0d5368a460568286bfac');
		feednami.load(sUrl).then(newsreader.xul.load);
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
	  newsreader.xul.feed = oResult.feed;
	  	var sTitle = 'JUL News Reader';
	  if (oResult.feed && oResult.feed.title) {
	  	sTitle = ample.$encodeXMLCharacters(oResult.feed.title.substr(0, 70)) + ' - ' + sTitle;
	}
	ample.getElementById('window-main').setAttribute('title', sTitle);
	newsreader.xul.fillArticles();
},
fillArticles: function() {
	var oBody = ample.getElementById('listbox-articles').querySelector('xul|listbody');
	ample.query(oBody).empty();
	ample.getElementById('vbox-articles').setAttribute('hidden', false);
	ample.getElementById('menuitem-show-articles').setAttribute('checked', true);
	if (!this.feed || !this.feed.entries) { return; }
	for (var i = 0; i < this.feed.entries.length; i++) {
		var oEntry = this.feed.entries[i];
		oEntry.title = oEntry.title[0] === '<' ? oEntry.title.split('>')[1].split('<')[0] : oEntry.title;
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
	ample.getElementById('description-date').setAttribute('value', (new Date(oEntry.pubDate)).toLocaleString());
	var oImage = this.findImage(oEntry.thumbnail || oEntry.group || oEntry.image);
	if (oImage) {
		ample.getElementById('image-article').setAttribute('src', ample.$encodeXMLCharacters(oImage.url));
		ample.getElementById('hbox-image').setAttribute('hidden', false);
	}
	var sContent = [].concat(oEntry.description)[0] || '';
	ample.getElementById('description-content').$getContainer().innerHTML = '<div class="content">' + sContent.replace(/<a/gm, '<a target="_blank"') + '</div>';
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
