var field = require("./field.js") 

var event = function() { 
  this.name = new field("", "Event Name");
  this.date = new field("", "Date Name", "date");
  this.address = {
    line1: new field("", "Line 1"),
    line2: new field("", "Line 2"),
    city: new field("", "City"),
    state: new field("", "State")
  };
};

module.exports = event;