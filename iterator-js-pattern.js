//GoF says: Provide a way to access the elements of an aggregate object sequentially without 
//exposing its underlying representation. In other words, you have data stored in some complex 
//structure like for example a four dimensional matrix and you want to provide easy access to 
//the elements. In the iterator pattern you must provide a next() method that will return the 
//next element of your internal data. What next actually does is up to every implementation. 
//It is also common to provide hasNext() and rewind() methods. This example uses an array 
//internally, but the iterator will return values in reverse order.

var iter = (function () {
    var data = [1, 2, 3, 4, 5],
        index = data.length;

    return {
        next: function () {
            var element;
            if (!this.hasNext()) {
                return null;
            }
            element = data[index];
            index = index - 1;
            return element;
        },
        hasNext: function () {
            return index > -1;
        },
        rewind: function () {
            index = data.length;
        }
    };
}());

while (iter.hasNext()) {
    console.log(iter.next());
}