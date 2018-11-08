function HiddenHeroes() {
	// console.log('HiddenHeroes');
	this.playables = [ new Blitz(), new Flint(), new Lynn(), new Venus() ];
	this.start();
}

HiddenHeroes.prototype.start = function() {
	// console.log('start');
	var playables = this.playables;

	var b = document.getElementsByTagName('body')[0];
	while (b.lastChild) b.removeChild(b.lastChild);

	var startMenu = document.createElement('div');
	startMenu.id = 'start-menu';

	for (var i = 0, len = this.playables.length; i < len; i++) {
		var playable = playables[i];
		var e = document.createElement('div');
		e.className = 'player-icon';
		e.style.backgroundImage = 'url(assets/playerIcons/' + playable.name + '.png)';
		startMenu.appendChild(e);
	}
	b.appendChild(startMenu);
};