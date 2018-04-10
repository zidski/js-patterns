//The purpose of the facade pattern is to simplify an interface. In this example 
//we have a home automation system that creates a facade for a few morning tasks.

var coffeeMachine =  {
    on: function() {
        console.log("Brewing coffee...");
    },
    off: function(){
        console.log("Coffee machine off");
    }
},
tv = {
    on: function() {
        console.log("TV turned on");
    },
    setChannel: function(channelNo) {
        console.log("Setting channel to "+channelNo);
    },
    setVolume: function(level){
        console.log("Setting volume to "+level);
    },
    off: function(){
        console.log("TV turned off");
    }
},
carHeater = {
    on: function(){
        console.log("Car heater turned on");
    },
    off: function(){
        console.log("Car heater turned off");
    }
},
morningFacade = {
    wakeUp: function(){
        coffeeMachine.on();
        tv.on();
        tv.setChannel('5');
        tv.setVolume(17);
        carHeater.on()
    },
    leaveHouse: function(){
        coffeeMachine.off();
        tv.off();
        carHeater.off()
    }
}

morningFacade.wakeUp();
setTimeout(morningFacade.leaveHouse,3000);