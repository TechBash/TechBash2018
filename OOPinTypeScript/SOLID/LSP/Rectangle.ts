class Rectangle {
  protected _width!: number;
  protected _height!: number;

  GetArea(): number {
    return this._height * this._width;
  }

  public get Height(): number {
    return this._height;
  }

  public set Height(aValue: number) {
    this._height = aValue;
  }

  public get Width(): number {
    return this._width;
  }

  public set Width(aValue: number) {
    this._width = aValue;
  }
}

class Square extends Rectangle {
  public set Height(aValue: number) {
    super.Height = aValue;
    this._width = aValue;
  }

  public set Width(aValue: number) {
    this._height = aValue;
    super.Width = aValue;
  }
}

var SomeRectangle: Rectangle;

SomeRectangle = new Rectangle();
SomeRectangle.Height = 7;
SomeRectangle.Width = 3;
console.log('Rectangle Area: ', SomeRectangle.GetArea());

SomeRectangle = new Square();
SomeRectangle.Height = 7;
SomeRectangle.Width = 3;
console.log('Square Area: ', SomeRectangle.GetArea());
