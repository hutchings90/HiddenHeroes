function HiddenHeroesController(hiddenHeroes) {
	this.gamepadReadInterval = null;
	this.hiddenHeroes = hiddenHeroes
	this.start();
}

HiddenHeroesController.prototype.start = function() {
	// console.log('start');
	this.activateGamepadSearch();
	this.startPlayerSelect();
}

HiddenHeroesController.prototype.startPlayerSelect = function() {
	// console.log('startPlayerSelect');
	for (var i = 0; i < this.hiddenHeroes.players.length; i++) {
		var player = this.hiddenHeroes.players[i];
		HiddenHeroesView.prototype.playerSelect(this.hiddenHeroes);
	}
	this.activateGamepadRead();
};

HiddenHeroesController.prototype.activateGamepadSearch = function() {
	// console.log('activateGamepadSearch');
	var me = this;
	View.prototype.clearDocument();
	window.addEventListener('gamepadconnected', function(e) {
		me.addGamepad(navigator.getGamepads()[e.gamepad.index]);
	});
	window.addEventListener('gamepaddisconnected', function(e) {
		console.log('disconnected');
	});
};

HiddenHeroesController.prototype.addGamepad = function(gp) {
	// console.log('addGamepad');
	HiddenHeroesView.prototype.playerSelect(this.hiddenHeroes.addGamepad(gp));
};

HiddenHeroesController.prototype.activateGamepadRead = function() {
	// console.log('activateGamepadRead');
	var me = this;
	clearInterval(me.gamepadReadInterval);
	me.gamepadReadInterval = setInterval(function() {
		me.readGamepads();
	}, 50);
};

HiddenHeroesController.prototype.readGamepads = function() {
	// console.log('readGamepads');
	for (var i in this.hiddenHeroes.players) {
		// console.log(this.hiddenHeroes.players[i]);
	}
};