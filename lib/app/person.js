var field = require("./field.js") 

var person = function() { 
	this.display = true;
	this.firstName = new field("New", "First Name");
	this.lastName = new field("Person", "Last Name");
	this.email = new field("", "E-mail", "email");
	this.ranking = new field(0, "Ranking", "number");
};

module.exports = person;