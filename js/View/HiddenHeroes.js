function HiddenHeroesView() {}

HiddenHeroesView.prototype = Object.create(View.prototype);
HiddenHeroesView.constructor = HiddenHeroesView.constructor;

HiddenHeroesView.prototype.playerSelect = function(player) {
	// console.log('playerSelect');
	this.getElement('body').appendChild(PlayerSelectView.prototype.playerSelect(new PlayerSelect()));
	PlayerSelectView.prototype.moveSelection(0);
};