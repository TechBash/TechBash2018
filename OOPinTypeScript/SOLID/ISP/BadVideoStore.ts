import { MovieRating, TShirtSize } from './VideoStoreTypes';

interface IProduct {
  price: number;
  size: TShirtSize;
  name: string;
  rating: MovieRating;
  runningTime: number;
}

class TShirt implements IProduct {
  price: number;
  size: TShirtSize;
  name: string;
  rating: MovieRating;
  runningTime: number;

  constructor(aPrice: number, aSize: TShirtSize) {
    this.price = aPrice;
    this.size = aSize;
  }
}

class Movie implements IProduct {
  price: number;
  size: TShirtSize;
  name: string;
  rating: MovieRating;
  runningTime: number;

    constructor(aName: string, aRating: MovieRating, aRunningTime: number) {
    this.name = aName;
    this.rating = aRating;
    this.runningTime = aRunningTime;
  }
}
