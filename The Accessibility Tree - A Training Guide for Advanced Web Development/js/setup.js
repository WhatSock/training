(function(){
	$A.bind(window, 'load', function(){

		$A.bind('div.topLink > a', 'click', function(ev){
			$A.setFocus($A.query('h1')[0]);
			ev.preventDefault();
		});

		$A.bind('#mlto',
						{
						click: function(ev){
							this.href = 'mailto:bryan.garaventa@whatsock.com';
						},
						blur: function(ev){
							this.href = '#';
						}
						});

		createHeaderNav();

		$A.setFootnotes('.accFootnote', document,
						{

						// Set the tooltip text for the footnote (this will also be the accessible name for screen reader users)
						fnText: 'Footnote',

						// Set the footnote character or text that will comprise the visual link text for returning footnotes
						fnChar: '&#8224;',

// Set the tooltip text for the footnote back links (this will also be the accessible name for screen reader users)
						backText: 'Back to Footnote'
						});

		// Generate permalinks
		$A.query('h2, h3, h4, h5, h6', function(i, o){
			var d = o.parentNode, a = $A.createEl('a',
							{
							href: 'http://whatsock.com/training/#' + d.id,
							title: 'Permalink: http://whatsock.com/training/#' + d.id,
							'aria-label': 'Permalink: http://whatsock.com/training/#' + d.id
							}, null, 'permalink');

			a.innerHTML = '<span aria-hidden="true">#</span>';
			d.appendChild(a);
			$A.css(a, 'left', -(a.offsetWidth));
		});

		if (window.navigator.onLine)
			// Check for updates
			$A.getScript('http://api.whatsock.com/accdc-updates.js');
	});

	if (top != window)
		top.location.href = 'http://whatsock.com/training';

	var hds = {}, createHeaderNav = function(){
		var ph = $A.getEl('ph'), hs = $A.query('div.hd > h2');
		hds = {};

		for (var i = 0; i < hs.length; i++){
			var h = hs[i];

			if (ph && h.className !== 'skip'){
				h.id = 'H' + $A.genId();
				var a = $A.createEl('a',
								{
								href: '#'
								}, null, h.id, document.createTextNode($A.getText(h)));

				ph.appendChild(a);
				$A.setAttr(h, 'tabindex', -1);
				hds[h.id] = h;
				$A.bind(a, 'click', function(ev){
					hds[this.className].focus();
					ev.preventDefault();
				});

				if (i < (hs.length - 1))
					ph.appendChild($A.createEl('span', null, null, null, document.createTextNode(' | ')));
			}
		}
	};
})();