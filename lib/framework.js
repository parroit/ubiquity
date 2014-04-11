var crossroads = require('crossroads'),
  hasher = require('hasher'),
  EventEmitter = require('eventEmitter');

function ViewContext(events) {
  this.events = events;
}

ViewContext.prototype.query = function(parent, cssSelector) {
  if (!cssSelector && typeof parent === 'string') {
    cssSelector = parent;
    parent = document;
  }

  return parent.querySelector(cssSelector);
};

ViewContext.prototype.parent = function(item, cssSelector) {
  var parent = item.parentElement;
  while (parent && !parent.webkitMatchesSelector(cssSelector)) {
    parent = parent.parentElement;
  }

  return parent;
};

ViewContext.prototype.on = function(cssSelector, eventName, handler) {
  var elms = document.querySelectorAll(cssSelector),
    events = this.events,
    i = 0,
    l = elms.length;


  for (; i < l; i++) {

    elms[i].addEventListener(eventName, handler);
  }
};

ViewContext.prototype.forwardEvent = function(cssSelector, eventName, forwardedEventName) {
  var events = this.events;

  function handler() {
    events.emit(forwardedEventName, this);
  }

  this.on(cssSelector, eventName, handler);

};

function Context() {
  EventEmitter.call(this);
  this.view = new ViewContext(this);
}

Context.prototype = new EventEmitter();

Context.prototype.render = function(view, data) {
  return view.call(this, data);
};

Context.prototype.renderIn = function(view, cssSelector, data) {
  var html = this.render(view, data);
  document.querySelector(cssSelector).innerHTML = html;
};

Context.prototype.renderAppend = function(view, cssSelector, data) {
  var html = this.render(view, data);
  document.querySelector(cssSelector).innerHTML += html;
};


function get(uri, action) {
  crossroads.addRoute(uri, function() {
    var context = new Context();
    context.uri = uri;
    action.apply(context, arguments);

  });
}

function run(uri) {
  crossroads.parse(uri);
}

function start() {
  hasher.initialized.add(run);
  hasher.changed.add(run);
  hasher.init();
}

module.exports = {
  start: start,
  get: get,
  run: run
};
