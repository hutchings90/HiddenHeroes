function PlayerSelect() {
	// console.log('PlayerSelect');
	Menu.call(this, [ new Blitz(), new Flint(), new Lynn(), new Venus() ]);
}

PlayerSelect.prototype = Object.create(Menu.prototype);
PlayerSelect.constructor = PlayerSelect.constructor;