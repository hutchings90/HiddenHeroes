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
	this.startPlayableSelect();
}

HiddenHeroesController.prototype.loadGamepads = function() {
	// console.log('loadGamepads');
	var gps = navigator.getGamepads();
	var len = Math.max(gps.length, this.hiddenHeroes.players.length);
	for (var i = 0; i < len; i++)
		if (i < gps.length && gps[i]) this.addGamepad(i);
};

HiddenHeroesController.prototype.startPlayableSelect = function() {
	// console.log('startPlayableSelect');
	for (var i = 0; i < this.hiddenHeroes.players.length; i++) {
		var player = this.hiddenHeroes.players[i];
		HiddenHeroesView.prototype.playableSelect(player.i);
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
		me.removeGamepad(e.gamepad.index);
	});
};

HiddenHeroesController.prototype.addGamepad = function(gi) {
	// console.log('addGamepad');
	var prevLen = this.hiddenHeroes.players.length;
	var pi = this.hiddenHeroes.addGamepad(gi);
	if (prevLen != this.hiddenHeroes.players.length) this.gpInputs.push({ axis: 0, button: 0 });
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
				var pi = player.i;
				this.processButtons(i, pi, gp);
				if (View.prototype.getElement('#player-' + player.i + '-playable-select-menu .hide')) this.processAxes(i, pi, gp);
			}
		}
	}
};

HiddenHeroesController.prototype.processAxes = function(i, pi, gp) {
	// console.log('processAxes');
	var d = 0;
	switch (gp.axes[0]) {
	case -1: d = -1; break;
	case 1: d = 1; break;
	}
	if (!d) this.gpInputs[pi].axis = 0;
	else {
		if (this.gpInputs[pi].axis == 16) {
			PlayableSelectView.prototype.moveSelection(i, d);
			this.gpInputs[pi].axis = 8;
		}
		else {
			if (this.gpInputs[pi].axis == 0) PlayableSelectView.prototype.moveSelection(i, d);
			this.gpInputs[pi].axis++;
		}
	}
};

HiddenHeroesController.prototype.processButtons = function(i, pi, gp) {
	// console.log('processButtons');
	for (var j in gp.buttons) {
		j = Number(j);
		switch (j) {
		case 0:
		case 1:
		case 2:
		case 3:
			if (gp.buttons[j].pressed) {
				if (this.gpInputs[pi].button == 16) {
					PlayableSelectView.prototype.toggleSelection(pi);
					this.gpInputs[pi].button = 8;
				}
				else {
					if (this.gpInputs[pi].button == 0) PlayableSelectView.prototype.toggleSelection(pi);
					this.gpInputs[pi].button++;
				}
				return;
			}
		}
	}
	this.gpInputs[pi].button = 0;
};