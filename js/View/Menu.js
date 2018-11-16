function PlayerSelectView() {}

PlayerSelectView.prototype = Object.create(View.prototype);
PlayerSelectView.constructor = PlayerSelectView.constructor;

PlayerSelectView.prototype.playerSelect = function(menu) {
	// console.log('playerSelect');
	var options = menu.options;
	var e = this.makeElement('div', 'player-select-menu');
	for (var i = 0, len = options.length; i < len; i++) e.appendChild(PlayerView.prototype.selectIcon(options[i]));
	return e;
};

PlayerSelectView.prototype.moveSelection = function(i) {
	// console.log('moveSelection');
	var c = 'active';
	var es = this.getElements('.player-icon.' + c);
	var e = this.getElement('.player-icon:nth-child(' + (i + 1) + ')');
	for (i = es.length - 1; i >= 0; i--) this.removeClassName(es[i], c);
	this.addClassName(e, c);
};