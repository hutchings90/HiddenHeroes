function HiddenHeroesController(hiddenHeroes) {
	this.gamepadReadInterval = null;
	this.hiddenHeroes = hiddenHeroes
	this.gpInputs = [];
	this.start();
}

HiddenHeroesController.prototype.start = function() {
	// console.log('start');
	this.loadGamepads();
	this.activateGamepadSearch();
	this.startPlayerSelect();
}

HiddenHeroesController.prototype.loadGamepads = function() {
	// console.log('loadGamepads');
	var gps = navigator.getGamepads();
	var len = Math.max(gps.length, this.hiddenHeroes.players.length);
	for (var i = 0; i < len; i++)
		if (i < gps.length && gps[i]) this.addGamepad(i);
};

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
		me.addGamepad(e.gamepad.index);
	});
	window.addEventListener('gamepaddisconnected', function(e) {
		console.log('disconnected');
		me.removeGamepad(e.gamepad.index);
	});
};

HiddenHeroesController.prototype.addGamepad = function(gi) {
	// console.log('addGamepad');
	HiddenHeroesView.prototype.playerSelect(this.hiddenHeroes.addGamepad(gi));
	this.gpInputs.push(0);
};

HiddenHeroesController.prototype.removeGamepad = function(gi) {
	// console.log('removeGamepad');
	for (var i in this.hiddenHeroes.players) {
		var player = this.hiddenHeroes.players[i];
		if (player.gi == gi) player.gi = -1;
	}
};

HiddenHeroesController.prototype.activateGamepadRead = function() {
	// console.log('activateGamepadRead');
	var me = this;
	clearInterval(me.gamepadReadInterval);
	me.gamepadReadInterval = setInterval(function() {
		me.readGamepads();
	}, 20);
};

HiddenHeroesController.prototype.readGamepads = function() {
	// console.log('readGamepads');
	var gps = navigator.getGamepads();
	for (var i in this.hiddenHeroes.players) {
		var player = this.hiddenHeroes.players[i];
		if (player.gi >= 0) {
			var gp = gps[player.gi];
			if (gp) {
				var d = 0;
				switch (gp.axes[0]) {
				case -1: d = -1; break;
				case 1: d = 1; break;
				}
				if (d != 0) {
					if (this.gpInputs[i] == 16) {
						PlayerSelectView.prototype.moveSelection(i, d);
						this.gpInputs[i] = 8;
					}
					else {
						if (this.gpInputs[i] == 0) PlayerSelectView.prototype.moveSelection(i, d);
						this.gpInputs[i]++;
					}
				}
				else this.gpInputs[i] = 0;
			}
		}
	}
};