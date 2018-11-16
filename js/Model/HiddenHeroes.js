function HiddenHeroes() {
	// console.log('HiddenHeroes');
	this.players = [];
}

HiddenHeroes.prototype.addGamepad = function(gamepad) {
	var player = new Player('Player ' + (this.players.length + 1), gamepad);
	this.players.push(player);
	return player;
};