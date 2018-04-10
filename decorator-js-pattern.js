//In the Decorator Pattern one can attach additional responsibilities to an object 
//dynamically keeping the same interface. Decorators originally provided a flexible 
//alternative to subclassing for extending functionality, but since JavaScript is 
//class-less and objects are are mutable, this is not a problem. Decorating is actually 
//a form of Composition, but I usually think of them as wrappers. In this example I 
//have a modern coffee shop that offers a large variety of beverages. All beverages 
//start with a basic object and are then decorated with various objects. The basic 
//objects has a getPrice() method that the Decorators override by calling getPrice() 
//on its parent object in the prototype chain and then modifying that. For example a 
//Dark Roast with Caramel and whip is created like this:

//1 Take a Dark Roast object
//2 Decorate it with a Caramel object
//3 Decorate it with a Whip object

//Constructor
function Coffee(price){
    this.price = price;
};

Coffee.prototype.getPrice = function(){
    return this.price;
};

//The Caramel Decorator
CaramelDecorator = {
    getPrice: function(){
        var price = this.parent.getPrice();
        price += 1.50;
        return price;
    }
};

//The Whip Decorator
WhipDecorator = {
    getPrice: function(){
        var price = this.parent.getPrice();
        price += 0.75;
        return price;
    }
};

//The almighty Coffee Decorator function
Coffee.prototype.decorate = function(decorator){
    var DecoratedCoffeeConstructor = function(){},
        i,
        decoratedCoffee;
    DecoratedCoffeeConstructor.prototype = this;
    decoratedCoffee = new DecoratedCoffeeConstructor();
    decoratedCoffee.parent = DecoratedCoffeeConstructor.prototype;
    //Copy all the properties of the decorator to the new object
    for(i in decorator){
        if(decorator.hasOwnProperty(i)){
            decoratedCoffee[i] = decorator[i];
        }
    }
    return decoratedCoffee;
};

//Test
var darkRoast = new Coffee(5);
var darkRoastCaramel = darkRoast.decorate(CaramelDecorator);
var darkRoastCaramelWhip = darkRoastCaramel.decorate(WhipDecorator);
console.log('Dark Roast: '+darkRoast.getPrice());
console.log('Dark Roast Caramel: '+darkRoastCaramel.getPrice());
console.log('Dark Roast Caramel Whip: '+darkRoastCaramelWhip.getPrice());