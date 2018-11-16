function View() {}

View.prototype.makeElement = function(id, className) {
	// console.log('makeElement');
	var e = document.createElement('div');
	e.id = id;
	e.className = className;
	return e;
};

View.prototype.getElements = function(query) {
	// console.log('getElements');
	return document.querySelectorAll(query);
};

View.prototype.getElement = function(query) {
	// console.log('getElement');
	return document.querySelector(query);
};

View.prototype.removeClassName = function(e, className) {
	// console.log('removeClassName');
	e.className = e.className.replace(new RegExp(className, 'g')).replace(/\s+/g, '').trim();
};

View.prototype.addClassName = function(e, className) {
	// console.log('addClassName');
	if (!e.className.includes(className)) e.className += ' ' + className;
};