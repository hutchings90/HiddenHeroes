function HiddenHeroesView() {}

HiddenHeroesView.prototype.playerSelect = function(hiddenHeroes) {
	// console.log('playerSelect');
	var b = document.getElementsByTagName('body')[0];
	while (b.lastChild) b.removeChild(b.lastChild);
	b.appendChild(PlayerSelectView.prototype.playerSelect(hiddenHeroes.playerSelect));
	PlayerSelectView.prototype.moveSelection(hiddenHeroes.playerSelect.activeI);
};