//In the Singleton pattern you only want one instance of a specific class. 
//There are no classes in Javascript so this pattern is in a strict technical sense 
//not possible, but since Javascript do has the new syntax for object creation with 
//constructors, we can make new return pointers to the same object.

// One way of implementing this pattern is to store the instance in a closure:

function PreciousRing(){

    var instance = this;

    this.message = 'I am the one and only';
    this.birthPlace = 'Mount doom';

    //Overwrite the constructor once the instance first is created
    PreciousRing = function(){
        return instance;
    }
}


//Testing:
var ring1 = new PreciousRing();
var ring2 = new PreciousRing();
ring1 === ring2; // true