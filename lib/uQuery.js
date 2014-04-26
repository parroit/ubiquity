var $ = require('sizzle');

function UVResults(context) {
    this.context = context;
    ['id', 'href', 'class', 'style'].forEach(
        defineAttribute.bind(this)
    );


}

function defineAttribute(name) {
    Object.defineProperty(this, name, {
        get: function() {
            if (this.length) {
                return this[0].getAttribute(name);
            }
            return null;
        },
        set: function(value) {
            if (this.length) {
                return this[0].setAttribute(name, value);
            }
            return null;
        }
    });
}



UVResults.prototype = [];

UVResults.prototype.on = function(eventName, handler) {
    var i = 0;
    var l = this.length;

    for (; i < l; i++) {

        this[i].addEventListener(eventName, handler);
    }
}

function defineEvent(name) {
    var proto = this;
    proto[name] = function(handler) {
        this.on(name, handler);
    }
}

['click', 'dblclick', 'change', 'submit', 'keyup', 'keydown', 'keypress', 'blur', 'gotfocus'].forEach(
    defineEvent.bind(UVResults.prototype)
);


UVResults.prototype.childs = function(cssSelector) {
    if (this.length) {
        return uQuery(this.context)(this[0],cssSelector);
    }
    
    return null;
    
}


function uQuery(context) {
    return function(parent, cssSelector) {
        var results = new UVResults(context);

        if (!cssSelector) {
            cssSelector = parent;
            parent = document;
        }
        results.cssSelector = cssSelector;
        

        if (typeof cssSelector === 'string') {
            $(cssSelector, parent, results);
        } else if (typeof cssSelector === 'object') {
            results.push(cssSelector);
        }

        return results;
    };

}


UVResults.prototype.render = function(view, data) {
    if (this.length) {
        var elm = this[0];
        var html = view.call(this.context, data);
        elm.innerHTML = html;
    }
    
};

UVResults.prototype.renderAppend = function(view,  data) {
   if (this.length) {
        var elm = this[0];
        var html = view.call(this.context, data);
        elm.innerHTML += html;
    }
     
};

UVResults.prototype.parent = function(cssSelector) {
    if (this.length) {
        var parent = this[0].parentElement;
        while (parent && !$.matchesSelector(parent, cssSelector)) {
            parent = parent.parentElement;
        }
        if (!parent) {
            return null;
        }
        var results = new UVResults(this.context)
        results.push(parent);
        return results;
    }
    return null;


};

module.exports = uQuery;
