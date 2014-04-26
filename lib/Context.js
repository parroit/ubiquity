

function Context(u) {
  this.u = u;
  
  
}

Context.prototype.runCommand = function(commandName) {
  var args = [].slice.call(arguments,1);
  this.u.run(commandName,args);
  //this._commands.emit.apply(this._commands,arguments);
};


Context.prototype.render = function(view, data) {
  return view.call(this, data);
};
/*
Context.prototype.renderIn = function(view, cssSelector, data) {
  var html = this.render(view, data);
  document.querySelector(cssSelector).innerHTML = html;
};

Context.prototype.renderAppend = function(view, cssSelector, data) {
  var html = this.render(view, data);
  document.querySelector(cssSelector).innerHTML += html;
};
*/
module.exports = Context;