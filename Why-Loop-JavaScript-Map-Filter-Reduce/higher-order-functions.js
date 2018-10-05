let numbers = [10,2,3,4,5,6];

Array.prototype.mySpecialFilter = function(orig) {
    console.log("" + orig);
    console.log(this);
    let filtered = [];

    for (let i=0; i < this.length; i++) {
        if (orig(this[i])) {
            filtered.push(this[i]);
        }
    }
    return filtered;
}

let bigNums = numbers.mySpecialFilter(function(element) {
    return element > 5;
});

console.log("bigNums: "+ bigNums);