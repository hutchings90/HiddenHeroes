function PlayerView() {}

PlayerView.prototype = Object.create(View.prototype);
PlayerView.constructor = PlayerView.constructor;

PlayerView.prototype.selectIcon = function(player) {
	// console.log('mainMenu');
	var e = this.makeElement('div', 'player-icon');
	e.style.backgroundImage = 'url(assets/playerIcons/' + player.name + '.png)';
	return e;
};