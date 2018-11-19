function HiddenHeroesView() {}

HiddenHeroesView.prototype = Object.create(View.prototype);
HiddenHeroesView.constructor = HiddenHeroesView.constructor;

HiddenHeroesView.prototype.startPlayableSelect = function(players) {
	// console.log('startPlayableSelect');
	var b = this.getGameContainer('#game');
	var e = this.makeElement('div', null, 'playable-select-container');
	for (var i = 0; i < players.length; i++) e.appendChild(PlayableSelectView.prototype.playableSelect(new PlayableSelect(), players[i].i));
	this.clearDocument();
	b.appendChild(this.makeElement('div', 'player-select-done-message', 'hide', 'Press START'));
	b.appendChild(e);
};

HiddenHeroesView.prototype.addPlayableSelect = function(pi) {
	// console.log('PlayableSelect');
	this.getElement('.playable-select-container').appendChild(PlayableSelectView.prototype.playableSelect(new PlayableSelect(), pi));
};

HiddenHeroesView.prototype.endPlayableSelect = function() {
	// console.log('endPlayableSelect');
	this.clearDocument();
};

HiddenHeroesView.prototype.isPlayableSelectStandby = function(players) {
	// console.log('isPlayableSelectStandby');
	if (players.length < 1) return false;
	for (var i in players)
		if (!PlayableSelectView.prototype.isReady(players[i].i)) return false;
	return true;
};

HiddenHeroesView.prototype.showBeginMessage = function() {
	// console.log('showBeginMessage');
	this.removeClassName(this.getElement('#player-select-done-message'), 'hide');
};

HiddenHeroesView.prototype.hideBeginMessage = function() {
	// console.log('hideBeginMessage');
	this.addClassName(this.getElement('#player-select-done-message'), 'hide');
};

HiddenHeroesView.prototype.isPlayableSelectFinished = function() {
	// console.log('isPlayableSelectFinished');
	return this.getElement('#player-select-done-message:not(.hide)');
};