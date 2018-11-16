function Playable(name) {
	// console.log('Playable');
	this.name = name;
}

function Blitz() {
	// console.log('Blitz');
	Playable.call(this, 'Blitz');
}

Blitz.prototype = Object.create(Playable.prototype);
Blitz.constructor = Playable.constructor;

function Flint() {
	// console.log('Flint');
	Playable.call(this, 'Flint');
}

Flint.prototype = Object.create(Playable.prototype);
Flint.constructor = Playable.constructor;

function Lynn() {
	// console.log('Lynn');
	Playable.call(this, 'Lynn');
}

Lynn.prototype = Object.create(Playable.prototype);
Lynn.constructor = Playable.constructor;

function Venus() {
	// console.log('Venus');
	Playable.call(this, 'Venus');
}

Venus.prototype = Object.create(Playable.prototype);
Venus.constructor = Playable.constructor;