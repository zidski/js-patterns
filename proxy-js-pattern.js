//The Proxy pattern provide a surrogate or placeholder for another object to 
//control access to it. At first this seems like unnecessary code slowing the 
//application down, but it is actually often used to increase performance. In this 
//example a stock ticker receives prices from a market connection and forwards it 
//to a number of clients. The sending of prices is an expensive operation since it 
//results in an http request. To solve this we introduce a proxy that collects 
//prices for 500ms and then sends a single http request with an array containing 
//all the prices.

var priceSender = (function(){
    var busy = false;
    var sendPrice = function(prices){
                    if(busy){
                        setTimeout(function(){
                            sendPrice(prices);
                        },30);
                    } else {
                        busy = true;
                        console.log("sending prices "+prices+' '+new Date());
                         setTimeout(function(){
                            busy = false;
                        },1000);
                    }
    }

    return {
        sendPrice : sendPrice
    }
})();

var proxyPriceSender = (function(){
var collecting = false;
    var priceArray = [];
    var sendPrice = function(prices){
        if(collecting){
            priceArray.push(prices);
        } else {
            collecting = true;
            priceArray.push(prices);
            setTimeout(function(){
                priceSender.sendPrice(priceArray);
                collecting = false;
                priceArray = [];
            },500);
        }
    }

    return {
        sendPrice : sendPrice
    }
})();

var marketFeed = function(priceSenderFunc){
    for(var i=0; i<10; i++){
        setTimeout(priceSenderFunc.sendPrice,i*100,i*10);
    }
}

marketFeed(priceSender);
//marketFeed(proxyPriceSender);