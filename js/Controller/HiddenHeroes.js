function HiddenHeroesController(hiddenHeroes) {
	var me = this;
	me.gamepadReadInterval = null;
	me.hiddenHeroes = hiddenHeroes
	me.gpInputs = [];
	me.state = '';
	me.addGamepadFunc = function(e) { me.addGamepad(e.gamepad.index); };
	me.removeGamepadFunc = function(e) { me.removeGamepad(e.gamepad.index); };
	me.start();
}

HiddenHeroesController.prototype.start = function() {
	// console.log('start');
	this.loadGamepads();
	this.activateGamepadSearch();
	this.startPlayableSelect();
};

HiddenHeroesController.prototype.loadGamepads = function() {
	// console.log('loadGamepads');
	var gps = navigator.getGamepads();
	var len = Math.max(gps.length, this.hiddenHeroes.players.length);
	for (var i = 0; i < len; i++)
		if (i < gps.length && gps[i]) this.addGamepad(i);
};

HiddenHeroesController.prototype.startPlayableSelect = function() {
	// console.log('startPlayableSelect');
	this.state = 'playableSelect';
	HiddenHeroesView.prototype.startPlayableSelect(this.hiddenHeroes.players);
	this.activateGamepadRead();
};

HiddenHeroesController.prototype.endPlayableSelect = function() {
	// console.log('endPlayableSelect');
	this.state = '';
	this.deactivateGamepadRead();
	HiddenHeroesView.prototype.endPlayableSelect();
};

HiddenHeroesController.prototype.activateGamepadSearch = function() {
	// console.log('activateGamepadSearch');
	window.addEventListener('gamepadconnected', this.addGamepadFunc);
	window.addEventListener('gamepaddisconnected', this.removeGamepadFunc);
};

HiddenHeroesController.prototype.deactivateGamepadSearch = function() {
	// console.log('deactivateGamepadSearch');
	window.removeEventListener('gamepadconnected', this.addGamepadFunc);
	window.removeEventListener('gamepaddisconnected', this.removeGamepadFunc);
};

HiddenHeroesController.prototype.addGamepad = function(gi) {
	// console.log('addGamepad');
	var prevLen = this.hiddenHeroes.players.length;
	var pi = this.hiddenHeroes.addGamepad(gi);
	if (prevLen == this.hiddenHeroes.players.length) PlayableSelectView.prototype.playerReconnected(pi);
	else {
		this.gpInputs.push({ axis: 0, button: 0 });
		switch (this.state) {
		case 'playableSelect': HiddenHeroesView.prototype.addPlayableSelect(pi); break;
		}
	}
};

HiddenHeroesController.prototype.removeGamepad = function(gi) {
	// console.log('removeGamepad');
	var players = this.hiddenHeroes.players;
	for (var i in players) {
		var player = players[i];
		if (player.gi == gi) {
			player.gi = -1;
			PlayableSelectView.prototype.playerDisconnected(player.i);
			if (HiddenHeroesView.prototype.isPlayableSelectFinished()) HiddenHeroesView.prototype.hideBeginMessage();
		}
	}
};

HiddenHeroesController.prototype.activateGamepadRead = function() {
	// console.log('activateGamepadRead');
	var me = this;
	this.deactivateGamepadRead();
	me.gamepadReadInterval = setInterval(function() {
		me.readGamepads();
	}, 20);
};

HiddenHeroesController.prototype.deactivateGamepadRead = function() {
	// console.log('deactivateGamepadRead');
	clearInterval(this.gamepadReadInterval);
	this.gamepadReadInterval = null;
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
		if (gp.buttons[j].pressed) {
			if (j == 9) {
				if (HiddenHeroesView.prototype.isPlayableSelectFinished()) {
					this.endPlayableSelect();
					return;
				}
			}
			else {
				switch (j) {
				case 0:
				case 1:
				case 2:
				case 3:
					if (this.gpInputs[pi].button == 16) {
						PlayableSelectView.prototype.toggleSelection(pi);
						this.gpInputs[pi].button = 8;
					}
					else {
						if (this.gpInputs[pi].button == 0) PlayableSelectView.prototype.toggleSelection(pi);
						this.gpInputs[pi].button++;
					}
					if (HiddenHeroesView.prototype.isPlayableSelectStandby(this.hiddenHeroes.players)) HiddenHeroesView.prototype.showBeginMessage();
					else HiddenHeroesView.prototype.hideBeginMessage();
					return;
				}
			}
		}
	}
	this.gpInputs[pi].button = 0;
};