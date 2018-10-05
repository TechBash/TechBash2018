// This example for illustrating that arrow functions have no this scope was taken from the MDN docs
// here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

function Person(){
  this.age = 10;

  setInterval(() => {
    this.age++; 
    console.log('interval.this: '+ JSON.stringify(this));
  }, 1000);
}

var p = new Person();
