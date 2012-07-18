var derby = require('derby')
  , app = derby.createApp(module)
  , get = app.get
  , view = app.view
  , ready = app.ready;

derby.use(require('../../ui'));

// ROUTES //

// Derby routes can be rendered on the client and the server
get('/', function(page, model, params) {
  // Subscribes the model to any updates on this room's object. Calls back
  // with a scoped model equivalent to:
  //   room = model.at('rooms.' + roomName)
  model.subscribe('person.Add', function(err, person) {
    model.setNull('people', []);
    model.set('newPerson', { name: 'New Person'});
    model.set('_message', "");

    // Render will use the model data as well as an optional context object
    page.render();
  });

});


// CONTROLLER FUNCTIONS //

ready(function(model) { 

  // Functions on the app can be bound to DOM events using the "x-bind"
  // attribute in a template.
  this.add = function() {
    // Any path name that starts with an underscore is private to the current
    // client. Nothing set under a private path is synced back to the server.
    model.push('people', model.get('newPerson'));
    model.set('newPerson', { name: 'New Person'});
    model.set('_message', "New Person Added");
  };

});
