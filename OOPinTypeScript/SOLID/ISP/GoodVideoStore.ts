import { MovieRating, TShirtSize } from './VideoStoreTypes';

interface IBaseProduct {
  price: number;
}

interface ITShirt extends IBaseProduct {
  size: TShirtSize;
}

interface IMovie extends IBaseProduct {
  price: number;
  name: string;
  rating: MovieRating;
  runningTime: number;
}

class ISPTShirt implements ITShirt {
  price: number;
  size: TShirtSize;

  constructor(aPrice: number, aSize: TShirtSize) {
    this.price = aPrice;
    this.size = aSize;
  }
}

class ISPMovie implements IMovie {
  price: number;
  name: string;
  rating: MovieRating;
  runningTime: number;

  constructor(
    aPrice: number,
    aName: string,
    aRating: MovieRating,
    aRunningTime: number
  ) {
    this.price = aPrice;
    this.name = aName;
    this.rating = aRating;
    this.runningTime = aRunningTime;
  }
}
