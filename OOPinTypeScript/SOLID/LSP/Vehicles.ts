class ECannotBeImplemented extends Error {}

abstract class Vehicle {
  abstract Go(): void;
  abstract FillWithGas(): void;
}

class Car extends Vehicle {
  Go(): void {
    console.log('Vrooooooom!');
  }

  FillWithGas(): void {
    console.log('glug');
  }
}

class Bicycle extends Vehicle {
  Go(): void {
    console.log('glide down the road');
  }

  FillWithGas(): void {
    throw new ECannotBeImplemented('Cannot implement this for a bicycle');
  }
}

var vehicle: Vehicle;

vehicle = new Car();
vehicle.FillWithGas();
vehicle.Go();

vehicle = new Bicycle();
vehicle.FillWithGas();
vehicle.Go();
