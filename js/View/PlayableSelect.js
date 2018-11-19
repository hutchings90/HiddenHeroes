function PlayableSelectView() {}

PlayableSelectView.prototype = Object.create(View.prototype);
PlayableSelectView.constructor = PlayableSelectView.constructor;

PlayableSelectView.prototype.playableSelect = function(menu, pi) {
	// console.log('PlayableSelect');
	var options = menu.options;
	var e = this.makeElement('div', 'player-' + pi + '-playable-select-menu', 'playable-select-menu');
	var innerE = this.makeElement('div');
	var icons = this.makeElement('div', null, 'playable-icons');
	for (var i = 0, len = options.length; i < len; i++) icons.appendChild(PlayableView.prototype.selectIcon(options[i]));
	this.addClassName(icons.firstChild, 'active');
	innerE.appendChild(icons);
	innerE.appendChild(this.makeElement('div'))
	innerE.lastChild.appendChild(this.makeElement('p', null, 'hide', 'Ready!'));
	innerE.lastChild.appendChild(this.makeElement('p', null, 'hide', 'Gamepad disconnected...'));
	e.appendChild(innerE);
	return e;
};

PlayableSelectView.prototype.moveSelection = function(pi, d) {
	// console.log('moveSelection');
	if (!this.getElement('#player-' + pi + '-playable-select-menu p:nth-child(1)').className.includes('hide')) return;
	var c = 'active';
	var e = this.getElement('#player-' + pi + '-playable-select-menu .playable-icon.' + c);
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

PlayableSelectView.prototype.toggleSelection = function(pi) {
	// console.log('toggleSelection');
	this.toggleClassName(this.getElement('#player-' + pi + '-playable-select-menu p:nth-child(1)'), 'hide');
};

PlayableSelectView.prototype.playerReconnected = function(pi) {
	// console.log('playerReconnected');
	this.addClassName(this.getElement('#player-' + pi + '-playable-select-menu p:nth-child(1)'), 'hide');
	this.addClassName(this.getElement('#player-' + pi + '-playable-select-menu p:nth-child(2)'), 'hide');
};

PlayableSelectView.prototype.playerDisconnected = function(pi) {
	// console.log('playerDisconnected');
	this.addClassName(this.getElement('#player-' + pi + '-playable-select-menu p:nth-child(1)'), 'hide');
	this.removeClassName(this.getElement('#player-' + pi + '-playable-select-menu p:nth-child(2)'), 'hide');
};

PlayableSelectView.prototype.isReady = function(pi) {
	// console.log('isReady');
	return !this.getElement('#player-' + pi + '-playable-select-menu p:nth-child(1)').className.includes('hide') && this.getElement('#player-' + pi + '-playable-select-menu p:nth-child(2)').className.includes('hide');
};