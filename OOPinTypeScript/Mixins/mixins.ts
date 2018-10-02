function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}

class runsFast {
  runsFast() {
    console.log('Runs fast');
  }
}

class jumpsHigh {
  jumpsHigh() {
    console.log('Jumps high');
  }
}

class throwsFar {
  throwsFar() {
    console.log('Throws far');
  }
}

class Decathlete implements runsFast, jumpsHigh, throwsFar {
  runsFast!: () => void;
  jumpsHigh!: () => void;
  throwsFar!: () => void;
}

applyMixins(Decathlete, [RunsFast, JumpsHigh, ThrowsFar]);

const aDecathlete = new Decathlete();
console.log('Decathlete:');
aDecathlete.runsFast();
aDecathlete.jumpsHigh();
aDecathlete.throwsFar();
