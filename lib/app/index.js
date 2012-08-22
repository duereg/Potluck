var derby = require('derby')
  , person = require("./person.js") 
  , app = derby.createApp(module)
  , get = app.get
  , view = app.view
  , ready = app.ready;

derby.use(require('derby-ui-boot'))
derby.use(require('../../ui'))

var pages = [
  {url: '/', title: 'Home'}
]

function render(name, page) {
  var ctx = {
    pages: pages
  , activeUrl: page.params.url
  }
  page.render(name, ctx)
}

// Derby routes can be rendered on the client and the server
get('/', function(page, model, params) {
 
  console.log("Entering get");

  model.subscribe("potluck.people", function() {
    console.log(person);
    var newPerson = new person();
    console.log(newPerson);
    model.set('potluck.person', newPerson); 
    model.set('potluck.message', "Get Called");
    render('home', page);
  });

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
    var people = model.get('potluck.people');
    var person = model.get('potluck.person'); 

    console.log(people);
    console.log(person.name);

    person.id = model.id();

    var length = model.push('potluck.people', person);
    model.set('potluck.message', "New Person Added");

    var newPerson = new person();
    console.log(newPerson);
    model.set('potluck.person', newPerson); 

    console.log("people length: " + length);
    console.log("Leaving add");
  };
  
  console.log("Leaving Ready");
  
});
