(function(global) {
  'use strict';


  var appModule = setup();

  function setup() {
    var document = global.document,
      head = document.head,

      script = document.createElement('script'),
      loadElement;

    script.type = 'text/javascript';
    script.src = '../bower_components/requirejs/require.js';
    script.onload = start;
    head.appendChild(script);
    loadElement = head.querySelector('[u-main]');
    return loadElement.getAttribute('u-main');
  }

  function start() {
    var require = global.require;
    require.config({
      baseUrl: '../..',
      paths: {
        'framework': '../bower_components/ubiquity/lib/framework',
        'cjs': '../bower_components/cjs/cjs',
        'amd-loader': '../bower_components/amd-loader/amd-loader',
        'crossroads': '../bower_components/crossroads/dist/crossroads',
        'expect': '../bower_components/expect',
        'mocha': '../bower_components/mocha/mocha',
        'hbs': '../bower_components/require-handlebars-plugin/hbs',
        'signals': '../bower_components/js-signals/dist/signals',
        'mvc': '../bower_components/mvc/lib/mvc',
        'hasher': '../bower_components/hasher/dist/js/hasher',
        'eventEmitter': '../bower_components/eventEmitter/EventEmitter'
      },

      noGlobal: true,
      hbs: {
        templateExtension: 'html'
      }

    });

    require(['cjs!' + appModule,'cjs!framework'], function(app, u) {
      app.start(u);
    });
  }


})(window);
