//Convert the interface of a class into another interface clients expect. 
//An adapter lets classes work together that could not otherwise because of 
//incompatible interfaces. A software adapter works just like the real world 
//power adapter you use when on a holiday abroad. I have adapted an example 
//from the great book Head First Design Patterns.

function Duck(){
    this.quack = function(){
        console.log("Quack quack!");
    }
    this.fly = function(){
        console.log("Flying!");
    }
}

function Turkey(){
    this.gobble = function(){
        console.log("Gobble gobble!");
    }
    this.fly = function(){
        console.log("Flying short distance");
    }
}

function TurkeyAdapter(turkey){
    this.turkey = turkey;

    this.quack = function(){
        this.turkey.gobble();
    }

    this.fly = function(){
        for(var i=0; i<5; i++){
            this.turkey.fly();
        }
    }
}
//Testing:
var mallardDuck = new Duck();
var wildTurkey = new Turkey();
console.log("Duck says:");
mallardDuck.quack();
console.log("Turkey says:");
wildTurkey.gobble();
var turkeyAdapter = new TurkeyAdapter(wildTurkey);
console.log("Turkey adapter says:");
turkeyAdapter.quack();
turkeyAdapter.fly();