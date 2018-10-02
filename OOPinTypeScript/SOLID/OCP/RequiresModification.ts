enum DiscountType {
  None,
  TenPercentOff,
  BOGO,
  TwentyPercentOff
}

class Item {
  constructor(
    public SKU: string,
    public Quantity: number,
    public Price: number,
    public Discount: DiscountType
  ) {}
}

class Order {
  Items: Item[] = [];
  addItem(item: Item) {
    this.Items.push(item);
  }

  totalAmount(): number {
    var total: number = 0;
    this.Items.forEach(function(item: Item) {
      switch (item.Discount) {
        case DiscountType.None: {
          total = total + item.Quantity * item.Price;
          break;
        }

        case DiscountType.TenPercentOff: {
          total = total + item.Quantity * 0.9 * item.Price;
          break;
        }

        case DiscountType.BOGO: {
          total = total + item.Quantity * item.Price;
          item.Quantity = item.Quantity * 2;
          break;
        }

        case DiscountType.TwentyPercentOff: {
          total = total + item.Quantity * 0.8 * item.Price;
          break;
        }

        // More to come!!!
      }
    });
    return total;
  }
}

let myOrder = new Order();
myOrder.addItem(
  new Item('Adult General Admission', 2, 10.0, DiscountType.None)
);
myOrder.addItem(
  new Item('Child General Admission', 2, 10.0, DiscountType.BOGO)
);
myOrder.addItem(
  new Item('Senior General Admission', 2, 10.0, DiscountType.TenPercentOff)
);
myOrder.addItem(
  new Item(
    'Guys Named Nick General Admission',
    2,
    10.0,
    DiscountType.TwentyPercentOff
  )
);

console.log('Total Amount: ', myOrder.totalAmount());
