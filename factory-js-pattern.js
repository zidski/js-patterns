// Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory can defer instantiation to specific constructors unknown to the factory user.

// parent constructor
function AnimalFactory() {}

// a method of the parent
AnimalFactory.prototype.talk = function () {
    return "Hello, I have " + this.numberOfLegs + " legs";
};

// the static factory method
AnimalFactory.build = function (type) {
    var constr = type,
    newAnimal;

    // Throw an error if no constructor for the given animal
    if (typeof AnimalFactory[constr] !== "function") {
        throw {
            name: "Error",
            message: "You cannot create " + constr + " animals in this factory"
        };
    }

    // Here we know that the constructor exists
    // Make it inherit the parent to get the talk function
    if (typeof AnimalFactory[constr].prototype.talk !== "function") {
        AnimalFactory[constr].prototype = new AnimalFactory();
    }
    // create a new animal using the factory
    newAnimal = new AnimalFactory[constr]();
    return newAnimal;
};

// define specific animal makers
AnimalFactory.Horse = function () {
    this.numberOfLegs = 4;
};
AnimalFactory.Spider = function () {
    this.numberOfLegs = 8;
};
AnimalFactory.Monkey = function () {
    this.numberOfLegs = 2;
};
//Testing:
var tarantula = AnimalFactory.build('Spider');
var mustang = AnimalFactory.build('Horse');
var chimp = AnimalFactory.build('Monkey');
tarantula.talk(); // "Hello, I have 8 legs"
mustang.talk(); // "Hello, I have 4 legs"
chimp.talk(); // "Hello, I have 2 legs"