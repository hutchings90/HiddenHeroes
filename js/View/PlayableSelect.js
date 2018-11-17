function PlayableSelectView() {}

PlayableSelectView.prototype = Object.create(View.prototype);
PlayableSelectView.constructor = PlayableSelectView.constructor;

PlayableSelectView.prototype.playableSelect = function(menu, pi) {
	// console.log('PlayableSelect');
	var options = menu.options;
	var e = this.makeElement('div', 'player-' + pi + '-playable-select-menu', 'playable-select-menu');
	for (var i = 0, len = options.length; i < len; i++) e.appendChild(PlayableView.prototype.selectIcon(options[i]));
	e.appendChild(this.makeElement('p', null, 'hide', 'Ready!'));
	this.addClassName(e.firstChild, 'active');
	return e;
};

PlayableSelectView.prototype.moveSelection = function(pi, d) {
	// console.log('moveSelection');
	var c = 'active';
	var e = this.getElement('#player-' + pi + '-playable-select-menu .playable-icon.' + c);
	this.removeClassName(e, c);
	switch (d) {
	case -1:
		if (e.previousSibling) e = e.previousSibling;
		else e = e.parentElement.lastChild.previousSibling;
		break;
	case 1:
		if (e.nextSibling == e.parentElement.lastChild) e = e.parentElement.firstChild;
		else e = e.nextSibling;
		break;
	}
	this.addClassName(e, c);
};

PlayableSelectView.prototype.toggleSelection = function(pi) {
	// console.log('toggleSelection');
	this.toggleClassName(this.getElement('#player-' + pi + '-playable-select-menu').lastChild, 'hide');
};