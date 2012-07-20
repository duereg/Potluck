var derby = require('derby')
  , app = derby.createApp(module)
  , get = app.get
  , view = app.view
  , ready = app.ready;

derby.use(require('../../ui'));

// ROUTES //

// Derby routes can be rendered on the client and the server
get('/', function(page, model, params) {
 
  console.log("Entering get");

  page.render();

  model.set('potluck.data.person', { name: 'New Person'}); 
  model.set('potluck.data.message', "Get Called");

  console.log("Leaving get");
});


// CONTROLLER FUNCTIONS //

ready(function(model) { 

  console.log("Entering Ready"); 

  // Functions on the app can be bound to DOM events using the "x-bind"
  // attribute in a template.
  exports.add = function() {
    console.log("Entering add");
  
    // Any path name that starts with an underscore is private to the current
    // client. Nothing set under a private path is synced back to the server.
    var people = model.get('potluck.data.people');
    var person = model.get('potluck.data.person'); 

    console.log(people);
    console.log(person.name);

     person.id = model.id();

     var length = model.push('potluck.data.people', person);
     model.set('potluck.data.message', "New Person Added");
     model.set('potluck.data.person', { name: 'New Person'}); 

    console.log("people length: " + length);
    console.log("Leaving add");
  };
  
  console.log("Leaving Ready");
  
});
