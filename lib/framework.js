var crossroads = require('crossroads');
var hasher = require('hasher');
var uQuery = require('cjs!uQuery');
var Context = require('cjs!Context');
var u = {
    start: start,
    get: get,
    run: run
};

function get(uri, action) {
    crossroads.addRoute(uri, function() {
        var context = new Context(u);
        context.$ = uQuery(context);
        context.uri = uri;
        action.apply(context, arguments);

    });
}

function run(uri,args) {
    crossroads.parse(uri,args);
}

function start() {
    hasher.init();
    hasher.changed.add(run);
    
}

module.exports =u;
