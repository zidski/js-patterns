//Define a one-to-many dependency between objects where a state change in one 
//object results with all its dependents being notified and updated automatically. 
//In other words it is the pattern of publisher and subscriber (or dispatcher/listeners), 
//where both are kept as loosely couples as possible. In the following example a publisher 
//registers functions. An alternative would be to register objects with a given function, 
//ie obj.onMessage(arg);

var waveMeter = {
    subscribers: [],
    addListener: function (fn) {
        this.subscribers.push(fn);
    },
    removeListener: function (fn) {
        for (var i = 0; i < this.subscribers.length; i += 1) {
            if (this.subscribers[i] === fn) {
                this.subscribers.splice(i, 1);
                break;
            }
        }
    },
    sendMessage: function (message) {
        for (var i = 0; i < this.subscribers.length; i += 1) {
            this.subscribers[i](message);
        }
    }
};

var robbyNaish = {
    recieveWaveData: function(msg){
        console.log('Robby got wave data: '+msg);
    }
}
var kellySlater = {
    onWaveUpdate: function(msg){
        console.log('Kelly got wave updates: '+msg);
    }
}

waveMeter.addListener(robbyNaish.recieveWaveData);
waveMeter.addListener(kellySlater.onWaveUpdate);
waveMeter.sendMessage('Jaws on north shore!');