function HiddenHeroes() {
	// console.log('HiddenHeroes');
	this.players = [];
}

HiddenHeroes.prototype.addPlayableSelectGamepad = function(gi) {
	// console.log('addPlayableSelectGamepad');
	if (this.gamepadAlreadyInUse(gi)) return;
	var pi = this.reconnectPlayer(gi);
	if (pi >= 0) return pi;
	var player = new Player('Player ' + (this.players.length + 1), this.players.length, gi);
	this.players.push(player);
	return player.i;
};

HiddenHeroes.prototype.addBattleGamepad = function(gi) {
	// console.log('addBattleGamepad');
	if (this.gamepadAlreadyInUse(gi)) return;
	return this.reconnectPlayer(gi);
};

HiddenHeroes.prototype.gamepadAlreadyInUse = function(gi) {
	// console.log('gamepadAlreadyInUse');
	for (var i in this.players)
		if (this.players[i].gi == gi) return true;
	return false;
};

HiddenHeroes.prototype.reconnectPlayer = function(gi) {
	// console.log('reconnectPlayer');
	for (var i in this.players) {
		var player = this.players[i];
		if (player.gi < 0) {
			player.gi = gi;
			return player.i;
		}
	}
	return -1;
};