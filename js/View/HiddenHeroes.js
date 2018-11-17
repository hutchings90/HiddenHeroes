function HiddenHeroesView() {}

HiddenHeroesView.prototype = Object.create(View.prototype);
HiddenHeroesView.constructor = HiddenHeroesView.constructor;

HiddenHeroesView.prototype.playableSelect = function(pi) {
	// console.log('PlayableSelect');
	this.getElement('body').appendChild(PlayableSelectView.prototype.playableSelect(new PlayableSelect(), pi));
};