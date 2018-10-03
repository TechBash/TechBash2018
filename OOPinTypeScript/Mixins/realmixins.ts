type Constructor<T = {}> = new (...args: any[]) => T;

function RunsFast<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    runFast() {
      console.log('Runs fast');
    }
  };
}

function ThrowsFar<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    throwFar() {
      console.log('Throws far');
    }
  };
}

function JumpsHigh<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    jumpHigh() {
      console.log('Jumps High');
    }
  };
}

class Athlete {
  constructor(private name: string) {}
}

const MixinDecathlete = ThrowsFar(RunsFast(JumpsHigh(Athlete)));

const mixinDecathlete = new MixinDecathlete('Rafer Johnson');
mixinDecathlete.runFast();
mixinDecathlete.throwFar();
mixinDecathlete.jumpHigh();
