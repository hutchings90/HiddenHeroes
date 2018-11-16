function Menu(options) {
	// console.log('Menu');
	this.options = options;
	this.activeI = 0;
}

Menu.prototype.moveSelection = function(i) {
	// console.log('moveSelection');
	if (this.options.length == 0) return;
	if (i < 0) this.moveSelection(this.options.length - 1);
	if (i > this.options.length - 1) this.moveSelection(0);
	this.activeI = i;
	return i;
};