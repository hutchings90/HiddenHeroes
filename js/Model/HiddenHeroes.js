function HiddenHeroes() {
	// console.log('HiddenHeroes');
	this.players = [];
}

HiddenHeroes.prototype.addGamepad = function(gi) {
	for (var i in this.players) {
		var player = this.players[i];
		if (player.gi < 0) {
			player.gi = gi;
			return player.i;
		}
	}
	var player = new Player('Player ' + (this.players.length + 1), this.players.length, gi);
	this.players.push(player);
	return player.i;
};