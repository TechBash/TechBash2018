interface IItemPricer {
  calculatePrice(aItem: OpenItem): number;
}

class OpenItem {
  constructor(
    public SKU: string,
    public Quantity: number,
    public Price: number,
    public Discount: IItemPricer
  ) {}
}

class NormalPrice implements IItemPricer {
  calculatePrice(aItem: OpenItem): number {
    return aItem.Price;
  }
}

class TenPercentOffPrice implements IItemPricer {
  calculatePrice(aItem: OpenItem): number {
    return aItem.Price * 0.9;
  }
}

class BOGOPrice implements IItemPricer {
  calculatePrice(aItem: OpenItem): number {
    aItem.Quantity = aItem.Quantity * 2;
    return aItem.Price * 0.5;
  }
}

class TwentyPercentOffPrice implements IItemPricer {
  calculatePrice(aItem: OpenItem): number {
    return aItem.Price * 0.8;
  }
}

class OpenOrder {
  Items: OpenItem[] = [];

  addItem(item: OpenItem) {
    this.Items.push(item);
  }

  totalAmount(): number {
    var total: number = 0;
    this.Items.forEach(function(item: OpenItem) {
      total = total + (item.Discount.calculatePrice(item) * item.Quantity);
    });
    return total;
  }
}

let openOrder = new OpenOrder();
openOrder.addItem(
  new OpenItem('Adult General Admission', 2, 10.0, new NormalPrice())
);
openOrder.addItem(new OpenItem('Child General Admission', 2, 10.0, new BOGOPrice()));
openOrder.addItem(
  new OpenItem('Senior General Admission', 2, 10.0, new TenPercentOffPrice())
);
openOrder.addItem(
  new OpenItem('Guys Named Nick General Admission', 2, 10.0, new TwentyPercentOffPrice())
);

console.log("Total Amount: ", openOrder.totalAmount());
