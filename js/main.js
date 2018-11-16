var controller;
window.onload = function() {
	// console.log('onload');
	controller = new HiddenHeroesController(new HiddenHeroes(navigator.getGamepads()));
};