function PlayerSelectView() {}

PlayerSelectView.prototype = Object.create(View.prototype);
PlayerSelectView.constructor = PlayerSelectView.constructor;

PlayerSelectView.prototype.playerSelect = function(menu) {
	// console.log('playerSelect');
	var options = menu.options;
	var e = this.makeElement('div', 'player-select-menu');
	for (var i = 0, len = options.length; i < len; i++) e.appendChild(PlayerView.prototype.selectIcon(options[i]));
	this.addClassName(e.firstChild, 'active');
	return e;
};

PlayerSelectView.prototype.moveSelection = function(pi, d) {
	// console.log('moveSelection');
	var c = 'active';
	var e = this.getElements('.player-icon.' + c)[pi];
	this.removeClassName(e, c);
	switch (d) {
	case -1:
		if (e.previousSibling) e = e.previousSibling;
		else e = e.parentElement.lastChild;
		break;
	case 1:
		if (e.nextSibling) e = e.nextSibling;
		else e = e.parentElement.firstChild;
		break;
	}
	this.addClassName(e, c);
};