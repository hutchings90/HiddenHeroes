function HiddenHeroesController(hiddenHeroes) {
	this.hiddenHeroes = hiddenHeroes
	this.start();
}

HiddenHeroesController.prototype.start = function() {
	// console.log('start');
	HiddenHeroesView.prototype.playerSelect(this.hiddenHeroes);
};