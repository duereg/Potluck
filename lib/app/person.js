var field = function(value, label, type) {
	this.label = label;
	this.value = value;
	this.message = "";	
	this.cssClass = "";
	this.type = type || "text";
};

var person = function() { 
	this.firstName = new field("New", "First Name");
	this.lastName = new field("Person", "Last Name");
	this.email = new field("", "E-mail", "email");
	this.ranking = new field(0, "Ranking", "number");
};

module.exports = person;