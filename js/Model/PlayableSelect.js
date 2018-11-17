function PlayableSelect() {
	// console.log('PlayableSelect');
	Menu.call(this, [ new Blitz(), new Flint(), new Lynn(), new Venus() ]);
}

PlayableSelect.prototype = Object.create(Menu.prototype);
PlayableSelect.constructor = PlayableSelect.constructor;