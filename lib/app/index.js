var derby = require('derby')
  , person = require("./person.js") 
  , event = require("./event.js")
  , app = derby.createApp(module)
  , get = app.get
  , view = app.view
  , ready = app.ready;

derby.use(require('derby-ui-boot'))
derby.use(require('../../ui'))

var pages = [
  {url: '/', title: 'Start'},
  {url: "/events", title: "Events"},
  {url: "/home", title: "Participants"} 
]

function render(name, page) {
  console.log("Entering get: " + name);
  var ctx = {
    pages: pages
  , activeUrl: page.params.url
  };
  page.render(name, ctx);
  console.log("Leaving get: " + name);
}

get("/", function(page, model, params) {
  render("start", page);
});

get("/add", function(page, model, params) { 
  model.subscribe("potluck.event.new", function() {
    var newEvent = new event();
    model.set('potluck.event.new', newEvent); 
    render("eventAdd", page); 
  });
});
 
get("/events", function(page, model, params) {
  render("events", page);
});
 
get('/home', function(page, model, params) { 
  model.subscribe("potluck.event.people", function() {
    console.log(person); 
    model.set('potluck.person', new person()); 
    model.set('potluck.message', "Get Called");
    render('home', page);
  }); 
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
    var people = model.get('potluck.event.people');
    var personToAdd = model.get('potluck.person'); 

    console.log("People:        " + people);
    console.log("Person to Add: " + personToAdd);

    personToAdd.id = personToAdd.id || model.id();

    var length = model.push('potluck.event.people', personToAdd);
    model.set('potluck.message', "New Person Added");

    var newPerson = new person();
    model.set('potluck.person', newPerson); 

    console.log("New Person:    " + newPerson);
    console.log("people length: " + length);
    console.log("Leaving add");
  };

  exports.addEvent = function() {
    alert("Add event!");
  }

  exports.edit = function(e, element){
    model.at(element).set(false);
  };

  exports.display = function(e, element){
    model.at(element).set(true);
  };
  
  console.log("Leaving Ready");
});
