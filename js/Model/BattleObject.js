function BattleObject(x, y, o) {
	// console.log('BattleObject');
	this.object = o;
}

function MovingBattleObject(x, y, o) {
	// console.log('MovingBattleObject');
	BattleObject.call(this, x, y, o);
}

MovingBattleObject.prototype = Object.create(BattleObject.prototype);
MovingBattleObject.constructor = MovingBattleObject;