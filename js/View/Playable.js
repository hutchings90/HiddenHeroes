function PlayableView() {}

PlayableView.prototype = Object.create(View.prototype);
PlayableView.constructor = PlayableView.constructor;

PlayableView.prototype.selectIcon = function(playable) {
	// console.log('mainMenu');
	var e = this.makeElement('div', null, 'playable-icon');
	e.style.backgroundImage = 'url(assets/playableIcons/' + playable.name + '.png)';
	return e;
};